"""Servicio dueño de mensajes; usa APIs públicas para validar referencias."""
import os
import json
from datetime import datetime, timezone
from urllib.error import HTTPError, URLError
from urllib.request import urlopen
from uuid import uuid4

import pika
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from pymongo import MongoClient

app = FastAPI(title="Chat Messages", version="1.0.0")
database = MongoClient(os.environ["MONGODB_URL"]).chat_messages
messages = database.messages
events: list[dict] = []
USERS_URL = os.environ.get("USERS_URL", "http://users:8000")
CHANNELS_URL = os.environ.get("CHANNELS_URL", "http://channels:8000")
RABBITMQ_URL = os.environ.get("RABBITMQ_URL")


class MessageCreate(BaseModel):
    author_id: str
    content: str = Field(min_length=1, max_length=4_000)


def resource_exists(base_url: str, path: str) -> bool:
    try:
        with urlopen(f"{base_url}{path}", timeout=2) as response:
            return response.status == 200
    except HTTPError as error:
        if error.code == 404:
            return False
        raise HTTPException(status_code=502, detail="Dependent service failed")
    except URLError:
        raise HTTPException(status_code=503, detail="Dependent service unavailable")


def publish(event_type: str, subject_id: str, data: dict) -> None:
    event = {"type": event_type, "subject_id": subject_id,
             "occurred_at": datetime.now(timezone.utc).isoformat(),
             "data": data}
    events.append(event)
    if RABBITMQ_URL:
        try:
            connection = pika.BlockingConnection(
                pika.URLParameters(RABBITMQ_URL))
            channel = connection.channel()
            channel.exchange_declare(exchange="chat", exchange_type="topic")
            channel.basic_publish(exchange="chat", routing_key=event_type,
                                  body=json.dumps(event))
            connection.close()
        except pika.exceptions.AMQPError:
            # La lista local conserva el evento para el ejemplo de Unidad 3.
            # En producción este fallo se tratará con outbox/reintentos.
            pass


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/v1/channels/{channel_id}/messages", status_code=status.HTTP_201_CREATED)
def create_message(channel_id: str, body: MessageCreate):
    if not resource_exists(CHANNELS_URL, f"/api/v1/channels/{channel_id}"):
        raise HTTPException(status_code=404, detail="Channel not found")
    if not resource_exists(USERS_URL, f"/api/v1/users/{body.author_id}"):
        raise HTTPException(status_code=422, detail="Author does not exist")
    message = {"id": str(uuid4()), "channel_id": channel_id,
               "created_at": datetime.now(timezone.utc).isoformat(),
               **body.model_dump()}
    messages.insert_one(message)
    publish("chat.message.created", message["id"], message)
    return message


@app.get("/api/v1/channels/{channel_id}/messages")
def list_messages(channel_id: str):
    return list(messages.find({"channel_id": channel_id}, {"_id": 0}))


@app.get("/api/v1/events")
def list_events():
    return events
