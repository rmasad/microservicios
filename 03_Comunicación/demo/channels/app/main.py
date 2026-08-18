"""Servicio dueño de canales del chat."""
import os
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from pymongo import MongoClient

app = FastAPI(title="Chat Channels", version="1.0.0")
database = MongoClient(os.environ["MONGODB_URL"]).chat_channels
channels = database.channels
events: list[dict] = []


class ChannelCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)


def publish(event_type: str, subject_id: str, data: dict) -> None:
    events.append({"type": event_type, "subject_id": subject_id,
                   "occurred_at": datetime.now(timezone.utc).isoformat(),
                   "data": data})


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/v1/channels", status_code=status.HTTP_201_CREATED)
def create_channel(body: ChannelCreate):
    channel = {"id": str(uuid4()), **body.model_dump()}
    channels.insert_one(channel)
    publish("chat.channel.created", channel["id"], channel)
    return channel


@app.get("/api/v1/channels")
def list_channels():
    return list(channels.find({}, {"_id": 0}))


@app.get("/api/v1/channels/{channel_id}")
def get_channel(channel_id: str):
    channel = channels.find_one({"id": channel_id}, {"_id": 0})
    if channel is None:
        raise HTTPException(status_code=404, detail="Channel not found")
    return channel


@app.get("/api/v1/events")
def list_events():
    return events
