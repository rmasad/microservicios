# Demo de la Unidad 4

El demo tiene 4 componentes: el _message broker_ (RabbitMQ), los servicios ```players``` y ```teams``` (cada uno con su MongoDB) y el ```api-gateway``` GraphQL.

Todos comparten la red ```microsvcs```, la misma que usan los demos de las unidades siguientes. Hay que crearla antes de levantar cualquier cosa:

```bash
docker network create microsvcs
```

Luego, ejecutar ```docker-compose up``` en cada directorio, en este orden:

1. ```message_broker```
2. ```service_01``` (players) y ```service_02``` (teams)
3. ```api-gateway```

Los puertos expuestos son:

- ```localhost:5000``` para el servicio _middleware_ ```api-gateway```
- ```localhost:5001``` para el servicio de ```players```
- ```localhost:5002``` para el servicio de ```teams```

Con todo arriba, se puede cargar datos de ejemplo con ```python3 populate.py``` (requiere ```requests```).

![](./demo.gif)
