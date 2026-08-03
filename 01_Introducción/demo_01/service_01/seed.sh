#!/bin/bash
# Puebla ambos servicios: primero crea los equipos en service_02 (puerto 5001)
# y usa los IDs que devuelve la API para crear los jugadores en service_01.
# Ambos servicios deben estar arriba antes de ejecutarlo.

set -euo pipefail

create_team() {
  curl --fail-with-body -sS -X POST http://localhost:5001/teams \
    -H "Content-Type: application/json" -d "$1" \
    | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])"
}

create_player() {
  curl --fail-with-body -sS -X POST http://localhost:5000/players \
    -H "Content-Type: application/json" -d "$1"
  echo
}

create_roster_player() {
  local name="$1" age="$2" number="$3" team_id="$4" description="$5"
  create_player "{\"name\": \"$name\", \"age\": $age, \"number\": $number, \"team_id\": \"$team_id\", \"description\": \"$description\"}"
}

PALESTINO_ID=$(create_team '{
  "name": "Palestino",
  "country": "Chile",
  "description": "Club de fútbol chileno fundado por la colonia palestina."
}')
echo "Team Palestino creado: $PALESTINO_ID"

COLOCOLO_ID=$(create_team '{
  "name": "Colo-Colo",
  "country": "Chile",
  "description": "Club de fútbol chileno, el más ganador del país."
}')
echo "Team Colo-Colo creado: $COLOCOLO_ID"

# Plantel actual de Palestino
create_roster_player "Enzo Roco" 33 4 "$PALESTINO_ID" "Defensa central chileno, referente de experiencia en la zaga árabe."
create_roster_player "Dilan Zúñiga" 30 28 "$PALESTINO_ID" "Lateral izquierdo chileno, de recorrido por la banda."
create_roster_player "Julián Fernández" 30 5 "$PALESTINO_ID" "Mediocampista argentino, aporta equilibrio en el centro del campo."
create_roster_player "Nicolás Meza" 27 6 "$PALESTINO_ID" "Volante chileno, opción de marca y salida."
create_roster_player "Bryan Carrasco" 35 7 "$PALESTINO_ID" "Extremo chileno, desequilibrante y referente ofensivo."
create_roster_player "Ariel Martínez" 30 10 "$PALESTINO_ID" "Mediocampista argentino, creativo en la generación de juego."
create_roster_player "Francisco Montes" 25 15 "$PALESTINO_ID" "Mediocampista chileno, con despliegue y llegada."
create_roster_player "César Munder" 26 11 "$PALESTINO_ID" "Delantero chileno, rápido y habilidoso por las bandas."
create_roster_player "Nelson Da Silva" 27 9 "$PALESTINO_ID" "Delantero argentino, referencia de área del ataque árabe."
create_roster_player "Jonathan Benítez" 35 14 "$PALESTINO_ID" "Volante argentino, experimentado en labores ofensivas."

# Plantel actual de Colo-Colo
create_roster_player "Vozinha" 40 1 "$COLOCOLO_ID" "Arquero caboverdiano, incorporación de Colo-Colo tras su actuación con Cabo Verde."
create_roster_player "Eduardo Villanueva" 21 12 "$COLOCOLO_ID" "Arquero chileno formado en Colo-Colo."
create_roster_player "Jeyson Rojas" 24 2 "$COLOCOLO_ID" "Defensa chileno, formado en el club."
create_roster_player "Javier Méndez" 31 20 "$COLOCOLO_ID" "Defensa uruguayo, aporta fortaleza en la última línea."
create_roster_player "Erick Wiemberg" 31 21 "$COLOCOLO_ID" "Lateral izquierdo chileno, con proyección ofensiva."
create_roster_player "Arturo Vidal" 39 23 "$COLOCOLO_ID" "Mediocampista chileno de amplia trayectoria internacional."
create_roster_player "Tomás Alarcón" 27 6 "$COLOCOLO_ID" "Volante chileno, orden y recuperación en el mediocampo."
create_roster_player "Claudio Aquino" 34 22 "$COLOCOLO_ID" "Mediocampista argentino, creativo y especialista a balón parado."
create_roster_player "Lautaro Pastrán" 23 10 "$COLOCOLO_ID" "Delantero chileno, extremo con velocidad y desborde."
create_roster_player "Javier Correa" 33 9 "$COLOCOLO_ID" "Delantero argentino, referencia de área y goleador."
create_roster_player "Maximiliano Romero" 27 19 "$COLOCOLO_ID" "Delantero argentino, alternativa ofensiva del Cacique."
