# Base común: Chat en microservicios

Esta es la base funcional entregada al inicio de la Unidad 3. Los equipos la
levantan con `docker compose up --build`. Está formada por tres microservicios
independientes, cada uno dueño de sus datos:

| Servicio | Puerto | Responsabilidad |
| --- | --- | --- |
| `users` | 8001 | Crear y consultar usuarios |
| `channels` | 8002 | Crear y consultar canales |
| `messages` | 8003 | Crear y listar mensajes |

La documentación OpenAPI de cada servicio está disponible en
`http://localhost:{8001,8002,8003}/docs`. El servicio `messages` consulta las
APIs de `users` y `channels` para validar las referencias antes de crear un
mensaje. Ningún servicio accede a los datos internos de otro.

Cada servicio usa su propia instancia MongoDB y volumen Docker: `users-data`,
`channels-data` y `messages-data`.

## Cómo extenderla

Cada grupo crea un servicio propio y lo agrega al `docker-compose.yaml` con la
red `microsvcs`. La capacidad puede publicar rutas propias y consumir los
eventos de los servicios base; no debe leer ni escribir el estado de `users`,
`channels` o `messages`.

Cada servicio expone `GET /api/v1/events` solo para explorar su contrato
localmente. En las unidades de implementación se sustituye por un consumidor de
broker.
