import logging
import requests

from aiodataloader import DataLoader


class TeamLoader(DataLoader):
    async def batch_load_fn(self, keys):
        response = requests.get(f"http://demo_04_service_02/teams",
                                params={"id[]": keys})
        
        result = {team['id']: team for team in response.json()}

        # Here we call a function to return a user for each key in keys in order
        return [result[key] for key in keys]
