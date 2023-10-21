import requests
import random

SOCCER_TEAMS = [
    {
        "name": "Real Madrid",
        "country": "España"
    },
    {
        "name": "Barcelona",
        "country": "España"
    },
    {
        "name": "Universidad de Chile",
        "country": "Chile"
    },
    {
        "name": "Benfica",
        "country": "Portugal"
    },
    {
        "name": "Paris Saint-Germain",
        "country": "Francia"
    },
    {
        "name": "Sevilla",
        "country": "España"
    },
    {
        "name": "Atletico Madrid",
        "country": "España"
    },
    {
        "name": "Sporting CP",
        "country": "Portugal"
    },
    {
        "name": "FC Porto",
        "country": "Portugal"
    },
    {
        "name": "Olympique Lyonnais",
        "country": "Francia"
    },
    {
        "name": "AS Monaco",
        "country": "Francia"
    },
    {
        "name": "Colo-Colo",
        "country": "Chile"
    },
    {
        "name": "Universidad Católica",
        "country": "Chile"
    },
    {
        "name": "Valencia",
        "country": "España"
    },
    {
        "name": "Villarreal",
        "country": "España"
    },
    {
        "name": "Sporting Cristal",
        "country": "Chile"
    },
    {
        "name": "Alianza Lima",
        "country": "Chile"
    },
    {
        "name": "FC Barcelona B",
        "country": "España"
    },
    {
        "name": "Real Betis",
        "country": "España"
    },
    {
        "name": "FC Famalicão",
        "country": "Portugal"
    },
    {
        "name": "Rio Ave",
        "country": "Portugal"
    },
    {
        "name": "Olympique de Marseille",
        "country": "Francia"
    },
    {
        "name": "Lille OSC",
        "country": "Francia"
    },
    {
        "name": "Universidad de Concepción",
        "country": "Chile"
    },
    {
        "name": "Everton de Viña del Mar",
        "country": "Chile"
    },
    {
        "name": "Real Sociedad",
        "country": "España"
    },
    {
        "name": "Getafe",
        "country": "España"
    },
    {
        "name": "Boavista",
        "country": "Portugal"
    },
    {
        "name": "Vitória SC",
        "country": "Portugal"
    }
]

SOCCER_PLAYERS = [
    {
        "name": "Lionel Messi",
        "age": 33,
        "number": 10,
        "team_name": "Barcelona",
        "description": "El mejor jugador del mundo"
    },
    {
        "name": "Cristiano Ronaldo",
        "age": 35,
        "number": 7,
        "team_name": "Juventus",
        "description": "El segundo mejor jugador del mundo"        
    },

]

# Lista de nombres ficticios para rellenar
names = ["Juan", "Carlos", "Miguel", "Pedro", "Fernando", "Sergio", "Francisco", "Manuel", "Jorge", "Mario"]

for i in range(2, 100):  # Ya tienes 2 jugadores, así que empiezas desde el 3ro
    player = {
        "name": random.choice(names) + " " + random.choice(names),  # combina dos nombres para generar uno ficticio
        "age": random.randint(18, 35),  # generando una edad al azar entre 18 y 35
        "number": i + 1,  # número de camiseta basado en el índice
        "team_name": random.choice(SOCCER_TEAMS)["name"],  # elige un equipo al azar de tu lista
        "description": "Un jugador destacado de fútbol"
    }
    
    SOCCER_PLAYERS.append(player)


players_url = "http://localhost:5001/players"
teams_url = "http://localhost:5002/teams"

for team in SOCCER_TEAMS:
    print(team)

    response = requests.post(teams_url, json=team)

    team_id = response.json()["id"]

    for player in SOCCER_PLAYERS:
        if player["team_name"] == team["name"]:
            player["team_id"] = team_id
            requests.post(players_url, json=player)
