import logging

from pymongo import MongoClient
from bson.errors import InvalidId
from bson.objectid import ObjectId
from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
from pydantic import ConfigDict
from pydantic import Field
from pydantic import field_validator

from .events import Emit


app = FastAPI()
mongodb_client = MongoClient("demo_04_service_01_mongodb", 27017)

emit_events = Emit()

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')


class Player(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str | None = Field(default=None, alias="_id")
    name: str
    age: int
    number: int
    team_id: str | None = None
    avatar_url: str | None = None
    description: str = ""

    @field_validator("id", mode="before")
    @classmethod
    def objectid_to_str(cls, value):
        return str(value) if value is not None else None


class PlayerUpdate(BaseModel):
    name: str | None = None
    age: int | None = None
    number: int | None = None
    team_id: str | None = None
    avatar_url: str | None = None
    description: str | None = None


@app.get("/")
async def root():
    logging.info("👋 Hello world (end-point)!")
    return {"Hello": "World"}


@app.get("/players", response_model=list[Player])
def players_all(team_id: str | None = None):
    filters = {}

    if team_id:
        filters["team_id"] = team_id

    return [Player(**player) for player in mongodb_client.service_01.players.find(filters)]


@app.get("/players/{player_id}")
def players_get(player_id: str):
    try:
        player_id = ObjectId(player_id)
        return Player(
            **mongodb_client.service_01.players.find_one({"_id": player_id})
        )
    except (InvalidId, TypeError):
        raise HTTPException(status_code=404, detail="Player not found")


@app.put("/players/{player_id}")
def players_update(player_id: str, player: PlayerUpdate):
    changes = player.model_dump(exclude_unset=True)

    try:
        player_id = ObjectId(player_id)
        mongodb_client.service_01.players.update_one(
            {'_id': player_id}, {"$set": changes})

        emit_events.send(player_id, "update", changes)

        return Player(
            **mongodb_client.service_01.players.find_one({"_id": player_id})
        )

    except (InvalidId, TypeError):
        raise HTTPException(status_code=404, detail="Player not found")


@app.delete("/players/{player_id}")
def players_delete(player_id: str):
    try:
        player_id = ObjectId(player_id)
        player = Player(
            **mongodb_client.service_01.players.find_one({"_id": player_id})
        )
    except (InvalidId, TypeError):
        raise HTTPException(status_code=404, detail="Player not found")

    mongodb_client.service_01.players.delete_one(
        {"_id": ObjectId(player_id)}
    )

    emit_events.send(player_id, "delete", player.model_dump())

    return player


@app.post("/players")
def players_create(player: Player):
    inserted_id = mongodb_client.service_01.players.insert_one(
        player.model_dump(exclude={"id"})
    ).inserted_id

    new_player = Player(
        **mongodb_client.service_01.players.find_one(
            {"_id": ObjectId(inserted_id)}
        )
    )

    emit_events.send(inserted_id, "create", new_player.model_dump())

    logging.info(f"✨ New player created: {new_player}")

    return new_player
