import logging

from ariadne.asgi import GraphQL
from ariadne import make_executable_schema
from ariadne import load_schema_from_path

from starlette.middleware.cors import CORSMiddleware

from .routes.courses import query as courses_queries


type_defs = load_schema_from_path("./app/schemas/")


logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s:%(levelname)s:%(name)s:%(message)s')


schema = make_executable_schema(type_defs, courses_queries)
app = CORSMiddleware(GraphQL(schema, debug=True), allow_origins=['*'], allow_methods=("GET", "POST", "OPTIONS"))
