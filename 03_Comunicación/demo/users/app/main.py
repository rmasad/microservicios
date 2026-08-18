"""Servicio dueño de usuarios del chat."""
import os
from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from pymongo import MongoClient

app = FastAPI(title="Chat Users", version="1.0.0")
database = MongoClient(os.environ["MONGODB_URL"]).chat_users
users = database.users
events: list[dict] = []


class UserCreate(BaseModel):
    display_name: str = Field(min_length=1, max_length=80)


def publish(event_type: str, subject_id: str, data: dict) -> None:
    events.append({"type": event_type, "subject_id": subject_id,
                   "occurred_at": datetime.now(timezone.utc).isoformat(),
                   "data": data})


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/v1/users", status_code=status.HTTP_201_CREATED)
def create_user(body: UserCreate):
    user = {"id": str(uuid4()), **body.model_dump()}
    users.insert_one(user)
    publish("chat.user.created", user["id"], user)
    return user


@app.get("/api/v1/users/{user_id}")
def get_user(user_id: str):
    user = users.find_one({"id": user_id}, {"_id": 0})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.get("/api/v1/events")
def list_events():
    return events
