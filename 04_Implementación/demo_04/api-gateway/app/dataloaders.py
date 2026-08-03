import logging

import httpx

from aiodataloader import DataLoader


class TeamLoader(DataLoader):
    async def batch_load_fn(self, keys):
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get("http://demo_04_service_02/teams",
                                            params={"id": keys})
                response.raise_for_status()

        except httpx.HTTPError:
            logging.exception("No se pudo obtener los teams %s", keys)
            return [None for _ in keys]

        result = {team['id']: team for team in response.json()}

        # Se retorna un team por cada key, en el mismo orden
        return [result.get(key) for key in keys]
