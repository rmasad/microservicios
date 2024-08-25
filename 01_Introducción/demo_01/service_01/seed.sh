#!/bin/bash

# Crear jugadores de Palestino
curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Luis Jiménez",
  "age": 39,
  "number": 10,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Mediocampista creativo y capitán del equipo, conocido como El Mago."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Carlos Villanueva",
  "age": 37,
  "number": 14,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Experimentado mediocampista, gran ejecutor de tiros libres."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Agustín Farías",
  "age": 34,
  "number": 5,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Volante defensivo, destacado por su labor de recuperación y equilibrio en el mediocampo."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Jonathan Benítez",
  "age": 29,
  "number": 11,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Delantero veloz y habilidoso, desequilibrante por las bandas."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Bruno Barticciotto",
  "age": 22,
  "number": 7,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Joven delantero con gran proyección, hijo del ídolo Marcelo Barticciotto."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Sebastián Pérez",
  "age": 30,
  "number": 1,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Arquero confiable y seguro, clave en la defensa de Palestino."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Maximiliano Salas",
  "age": 25,
  "number": 9,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Delantero centro con buen juego aéreo y gran sentido del gol."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Fernando Cornejo",
  "age": 27,
  "number": 6,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Mediocampista de gran despliegue físico y buena visión de juego."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Cristián Suárez",
  "age": 33,
  "number": 4,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Defensa central experimentado, fuerte en el juego aéreo y en la marca."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Jonathan Benítez",
  "age": 29,
  "number": 11,
  "team_id": "66ba5abbcbe14991232f41a6",
  "description": "Delantero desequilibrante, con gran capacidad para asistir y anotar."
}'

# Crear jugadores de Colo-Colo
curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Esteban Paredes",
  "age": 43,
  "number": 7,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Delantero histórico y máximo goleador del fútbol chileno."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Gabriel Suazo",
  "age": 26,
  "number": 17,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Lateral izquierdo con gran despliegue y capitán del equipo."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Leonardo Gil",
  "age": 33,
  "number": 5,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Mediocampista central, destacado por su pegada y visión de juego."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Maximiliano Falcón",
  "age": 28,
  "number": 37,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Defensor central uruguayo, conocido por su garra y entrega."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Iván Morales",
  "age": 24,
  "number": 18,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Delantero joven con proyección, fuerte y con buen sentido del gol."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Emiliano Amor",
  "age": 28,
  "number": 2,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Defensa central argentino, sólido en la marca y con buena salida de balón."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Brayan Cortés",
  "age": 28,
  "number": 12,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Arquero titular, ágil y seguro bajo los tres palos."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Marcos Bolados",
  "age": 27,
  "number": 11,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Extremo rápido y habilidoso, desequilibrante por la banda derecha."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Pablo Solari",
  "age": 23,
  "number": 16,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Delantero joven argentino, conocido por su velocidad y capacidad goleadora."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Gabriel Costa",
  "age": 34,
  "number": 8,
  "team_id": "66ba5a9ccbe14991232f41a1",
  "description": "Mediocampista ofensivo peruano, clave en la creación de juego."
}'
