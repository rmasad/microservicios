import logging
import requests

from ariadne import QueryType
from ariadne import MutationType
from ariadne import ObjectType
from ariadne import make_executable_schema
from ariadne import load_schema_from_path

from ariadne.asgi import GraphQL

from graphql.type import GraphQLResolveInfo

from .dataloaders import TeamLoader

type_defs = load_schema_from_path("./app/schema.graphql")

query = QueryType()
mutation = MutationType()

team = ObjectType("Team")
player = ObjectType("Player")

team_loader = TeamLoader()

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')


@query.field("getPlayer")
def resolve_get_player(obj, resolve_info: GraphQLResolveInfo, id):
    response = requests.get(f"http://demo_04_service_01/players/{id}")

    if response.status_code == 200:
        return response.json()


@team.field("players")
@query.field("listPlayers")
def resolve_list_players(obj, resolve_info: GraphQLResolveInfo, team_id=None):
    if obj and not team_id:
        team_id = obj.get('id')

    if team_id:
        response = requests.get(
            f"http://demo_04_service_01/players?team_id={team_id}")
    else:
        response = requests.get(f"http://demo_04_service_01/players")

    if response.status_code == 200:
        return response.json()


@player.field("team")
@query.field("getTeam")
async def resolve_get_team(obj, resolve_info: GraphQLResolveInfo, id=None):
    if obj and not id:
        id = obj.get('team_id')

    if not id:
        return None

    return await team_loader.load(id)

    # Without dataloader this code will make n+1 requests when index of player is called:

    # response = requests.get(f"http://demo_04_service_02/teams/{id}")
    # if response.status_code == 200:
    #     return response.json()


@mutation.field("createTeam")
def resolve_create_team(obj, resolve_info: GraphQLResolveInfo, name, country, description=None):
    payload = dict(name=name,
                   country=country)

    if description:
        payload['description'] = description

    return requests.post(f"http://demo_04_service_02/teams", json=payload).json()


schema = make_executable_schema(type_defs, query, mutation, player, team)
app = GraphQL(schema, debug=True)
