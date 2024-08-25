from ariadne import QueryType
from graphql.type import GraphQLResolveInfo

query = QueryType()


@query.field("getCourse")
def resolve_get_player(obj, resolve_info: GraphQLResolveInfo):
    return {"id": "INF326", "name": "Arquitectura de Software"}
