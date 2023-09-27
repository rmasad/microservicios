from enum import Enum

import time
import logging
from pymongo import MongoClient
from bson.objectid import ObjectId

from fastapi import FastAPI, Query
from pydantic import BaseModel

from .events import Emit

app = FastAPI()
mongodb_client = MongoClient("demo_04_service_02_mongodb", 27017)

emit_events = Emit()

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')


class Player(BaseModel):
    id: str | None = None
    name: str
    age: int
    number: int
    team_id: str | None = None
    description: str = ""


class Country(str, Enum):
    chile = 'Chile'
    portugal = 'Portugal'
    españa = 'España'
    francia = "Francia"


class Team(BaseModel):
    id: str | None = None
    name: str
    country: Country

    description: str = ""

    def __init__(self, **kargs):
        if "_id" in kargs:
            kargs["id"] = str(kargs["_id"])
        BaseModel.__init__(self, **kargs)


@app.get("/")
async def root():
    return {"Hello": "World"}


@app.get("/teams")
def teams_all(id: list[int] = Query(None)):
    filters = dict()
    if id:
        filters['_id'] = {"$in": [ObjectId(_id) for _id in id]}

    teams = [Team(**team).dict()
             for team in mongodb_client.service_02.teams.find(filters)]

    return teams


@app.get("/teams/{team_id}")
def teams_get(team_id: str):
    team = Team(
        **mongodb_client.service_02.teams.find_one({"_id": ObjectId(team_id)})
    ).dict()

    return team


@app.delete("/teams/{team_id}")
def teams_delete(team_id: str):
    team = Team(
        **mongodb_client.service_02.teams.find_one({"_id": ObjectId(team_id)})
    ).dict()

    mongodb_client.service_02.teams.delete_one({"_id": ObjectId(team_id)})

    emit_events.send(team_id, "delete", team.dict())

    return team


@app.post("/teams")
def teams_create(team: Team):
    # Make it slow
    time.sleep(3)

    inserted_id = mongodb_client.service_02.teams.insert_one(
        team.dict()
    ).inserted_id

    new_team = Team(
        **mongodb_client.service_02.teams.find_one(
            {"_id": ObjectId(inserted_id)}
        )
    )

    logging.info(f"✨ New team created: {new_team}")
    emit_events.send(inserted_id, "create", new_team.dict())

    return new_team
