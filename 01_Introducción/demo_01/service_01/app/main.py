import logging

from time import sleep
from pymongo import MongoClient
from bson.objectid import ObjectId
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, model_validator


app = FastAPI()
mongodb_client = MongoClient("demo_01_service_01_mongodb", 27017)

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')


class Player(BaseModel):
    id: str | None = None
    name: str
    age: int
    number: int
    team_id: str | None = None
    description: str = ""

    @model_validator(mode="before")
    @classmethod
    def _id_from_mongo(cls, data):
        """Mongo entrega el identificador en `_id`; lo exponemos como `id`."""
        if isinstance(data, dict) and "_id" in data:
            data = {**data, "id": str(data["_id"])}
        return data


@app.get("/")
async def root():
    logging.info("👋 Hello world (end-point)!")
    return {"Hello": "World"}


@app.get("/players",
         response_model=list[Player])
def players_all(team_id: str | None = None):
    """Prueba"""
    logging.info(f"Getting all players (team_id: {team_id})")
    filters = {}

    # Este sleep es intencional: simula un servicio lento para hacer
    # visible el problema del n+1 al pedir /teams?expand=players.
    sleep(3)

    if team_id:
        filters["team_id"] = team_id

    return [Player(**player) for player in mongodb_client.service_01.players.find(filters)]


@app.get("/players/{player_id}")
def players_get(player_id: str):
    player = mongodb_client.service_01.players.find_one({"_id": ObjectId(player_id)})

    if player is None:
        raise HTTPException(status_code=404, detail="Player not found")

    return Player(**player)


@app.delete("/players/{player_id}")
def players_delete(player_id: str):
    mongodb_client.service_01.players.delete_one(
        {"_id": ObjectId(player_id)}
    )
    return "ok"


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

    logging.info(f"✨ New player created: {new_player}")

    return new_player
