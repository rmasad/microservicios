#!/bin/bash

echo "🧹 Limpiando datos existentes..."

# Limpiar jugadores del service_01
echo "⚽ Eliminando jugadores existentes..."
PLAYERS=$(curl -s http://localhost:5000/players | jq -r '.[].id')
for player_id in $PLAYERS; do
    if [ "$player_id" != "null" ] && [ -n "$player_id" ]; then
        curl -s -X DELETE http://localhost:5000/players/$player_id
    fi
done

# Limpiar equipos del service_02
echo "🏟️ Eliminando equipos existentes..."
TEAMS=$(curl -s http://localhost:5001/teams | jq -r '.[].id')
for team_id in $TEAMS; do
    if [ "$team_id" != "null" ] && [ -n "$team_id" ]; then
        curl -s -X DELETE http://localhost:5001/teams/$team_id
    fi
done

echo "✅ Limpieza completada"
echo ""

# Crear equipos primero en service_02 y capturar sus IDs
echo "🏟️ Creando equipos..."

PALESTINO_RESPONSE=$(curl -s -X POST http://localhost:5001/teams -H "Content-Type: application/json" -d '{
  "name": "Palestino",
  "country": "Chile",
  "description": "Club de fútbol profesional chileno fundado en 1920, con sede en Santiago."
}')

COLOCOLO_RESPONSE=$(curl -s -X POST http://localhost:5001/teams -H "Content-Type: application/json" -d '{
  "name": "Colo-Colo",
  "country": "Chile", 
  "description": "Club de fútbol más popular de Chile, fundado en 1925, conocido como El Cacique."
}')

# Extraer los IDs de los equipos creados
PALESTINO_ID=$(echo $PALESTINO_RESPONSE | jq -r '.id')
COLOCOLO_ID=$(echo $COLOCOLO_RESPONSE | jq -r '.id')

echo "✅ Palestino creado con ID: $PALESTINO_ID"
echo "✅ Colo-Colo creado con ID: $COLOCOLO_ID"
echo "⏰ Esperando que los servicios procesen las peticiones..."
sleep 2

# Crear jugadores de Palestino en service_01
echo "⚽ Creando jugadores de Palestino..."

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Luis Jiménez",
  "age": 39,
  "number": 10,
  "team_id": "'$PALESTINO_ID'",
  "description": "Mediocampista creativo y capitán del equipo, conocido como El Mago."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Carlos Villanueva",
  "age": 37,
  "number": 14,
  "team_id": "'$PALESTINO_ID'",
  "description": "Experimentado mediocampista, gran ejecutor de tiros libres."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Agustín Farías",
  "age": 34,
  "number": 5,
  "team_id": "'$PALESTINO_ID'",
  "description": "Volante defensivo, destacado por su labor de recuperación y equilibrio en el mediocampo."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Jonathan Benítez",
  "age": 29,
  "number": 11,
  "team_id": "'$PALESTINO_ID'",
  "description": "Delantero veloz y habilidoso, desequilibrante por las bandas."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Bruno Barticciotto",
  "age": 22,
  "number": 7,
  "team_id": "'$PALESTINO_ID'",
  "description": "Joven delantero con gran proyección, hijo del ídolo Marcelo Barticciotto."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Sebastián Pérez",
  "age": 30,
  "number": 1,
  "team_id": "'$PALESTINO_ID'",
  "description": "Arquero confiable y seguro, clave en la defensa de Palestino."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Maximiliano Salas",
  "age": 25,
  "number": 9,
  "team_id": "'$PALESTINO_ID'",
  "description": "Delantero centro con buen juego aéreo y gran sentido del gol."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Fernando Cornejo",
  "age": 27,
  "number": 6,
  "team_id": "'$PALESTINO_ID'",
  "description": "Mediocampista de gran despliegue físico y buena visión de juego."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Cristián Suárez",
  "age": 33,
  "number": 4,
  "team_id": "'$PALESTINO_ID'",
  "description": "Defensa central experimentado, fuerte en el juego aéreo y en la marca."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Jonathan Benítez",
  "age": 29,
  "number": 11,
  "team_id": "'$PALESTINO_ID'",
  "description": "Delantero desequilibrante, con gran capacidad para asistir y anotar."
}'

# Crear jugadores de Colo-Colo en service_01
echo "⚽ Creando jugadores de Colo-Colo..."

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Esteban Paredes",
  "age": 43,
  "number": 7,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Delantero histórico y máximo goleador del fútbol chileno."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Gabriel Suazo",
  "age": 26,
  "number": 17,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Lateral izquierdo con gran despliegue y capitán del equipo."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Leonardo Gil",
  "age": 33,
  "number": 5,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Mediocampista central, destacado por su pegada y visión de juego."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Maximiliano Falcón",
  "age": 28,
  "number": 37,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Defensor central uruguayo, conocido por su garra y entrega."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Iván Morales",
  "age": 24,
  "number": 18,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Delantero joven con proyección, fuerte y con buen sentido del gol."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Emiliano Amor",
  "age": 28,
  "number": 2,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Defensa central argentino, sólido en la marca y con buena salida de balón."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Brayan Cortés",
  "age": 28,
  "number": 12,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Arquero titular, ágil y seguro bajo los tres palos."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Marcos Bolados",
  "age": 27,
  "number": 11,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Extremo rápido y habilidoso, desequilibrante por la banda derecha."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Pablo Solari",
  "age": 23,
  "number": 16,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Delantero joven argentino, conocido por su velocidad y capacidad goleadora."
}'

curl -X POST http://localhost:5000/players -H "Content-Type: application/json" -d '{
  "name": "Gabriel Costa",
  "age": 34,
  "number": 8,
  "team_id": "'$COLOCOLO_ID'",
  "description": "Mediocampista ofensivo peruano, clave en la creación de juego."
}'

echo ""
echo "🎉 ¡Datos creados exitosamente!"
echo ""
echo "📊 Verificando datos en ambos microservicios:"
echo ""
echo "🏟️  Equipos en service_02 (puerto 5001):"
curl -s http://localhost:5001/teams | jq '.'
echo ""
echo "⚽ Jugadores en service_01 (puerto 5000):"
curl -s http://localhost:5000/players | jq '.[0:3]'  # Mostrar solo los primeros 3 para no saturar
echo ""
echo "✅ Seed completado - Ambos microservicios tienen datos"
