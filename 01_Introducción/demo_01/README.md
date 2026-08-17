# Demo 01: dos microservicios con FastAPI y MongoDB

Dos servicios que trabajan en conjunto: `service_01` administra players (puerto 5000) y `service_02` administra teams (puerto 5001). `service_02` consulta a `service_01` por HTTP para expandir los jugadores de un equipo, lo que hace visible el problema del n+1.

## Levantar la demo

Los servicios comparten una red externa de Docker. Créenla una sola vez:

```bash
docker network create demo_01
```

Luego levanten cada servicio (en dos terminales o con `-d`):

```bash
cd service_01 && docker compose up --build
cd service_02 && docker compose up --build
```

La documentación de cada API queda en `localhost:5000/docs` y `localhost:5001/docs`.

## Poblar datos

Con ambos servicios arriba:

```bash
cd service_01
bash seed.sh
```

El script crea primero los teams en `service_02` y usa los ids que devuelve la API para crear los players en `service_01`.

## Probar el n+1

```bash
curl "http://localhost:5001/teams"
curl "http://localhost:5001/teams?expand=players"
```

La segunda consulta demora varios segundos: por cada team se hace un request adicional a `service_01`, que además tiene un `sleep(3)` intencional para exagerar el efecto. Revisen los logs de ambos contenedores mientras corre.
