---
marp: true
---
<!-- marp: true -->
<!-- theme: uncover -->
<!-- class: invert -->
<!-- paginate: true -->
<!-- footer: Microservicios por Rafik Mas'ad Nasra -->
<!-- author: Rafik Mas'ad Nasra -->
<!-- title: Introducci贸n a microservicios -->
<!-- size: 16:9 -->

<style>    
    ul { margin: 0; }
    section.invert p { text-align: left; }
    section.invert h4 { text-align: left; }
</style>

## Unidad 3
# Comunicaci贸n entre servicios

---

**En este capitulo vamos a revisar distintos mecanismos de comunicaci贸n entre servicios, entender las ventajas y desventajas de cada uno, y como seleccionar el que mejor encaja en el problema que estamos tratando de solucionar.**

---

## 馃摓 De llamadas en un proceso a entre procesos...

Las llamadas a trav茅s de una red (entre procesos) son muy diferentes a las llamadas dentro del mismo proceso.

Omitir esta dificultad adicional puede traer multiples problemas.

---

### 馃搱 Rendimiento

- Las llamadas dentro entre procesos en una red habitualmente se miden en mili-segundos (ms). La latencia es insignificante en las llamadas dentro de un mismo proceso.
- Una funci贸n puede llamar a cientos de funciones dentro del mismo proceso, eso no es recomendable en llamadas entre procesos.

---

- Lo mismo pasa con los datos: llamadas dentro de un procesos habitualmente pasan los datos como punteros en la memoria, llamadas entre servicios copian y env铆an los datos.
- Los datos, al enviarse, requieren ser serializados y deserializados.

---

### 馃攲 Cambios en las interfaces

- Cambiar la interfaz de una funci贸n dentro de un proceso no es particularmente complejo: est谩n todos en el mismo repositorio de c贸digo.
- Cambiar la interfaz entre servicios expone a que otro servicio no se puedan desplegar aut贸nomamente.

---

### 馃毃 Manejo de errores

Adem谩s de los errores intr铆nsecos del resultado de llamar a una funci贸n, llamadas a otros servicios traen un conjunto adicional de errores. A continuaci贸n, alguno de ellos:

---

#### 馃挜 Falla catastr贸fica o crash
Todo estuvo bien hasta que el servidor se cay贸.隆Reiniciar!


#### 馃懟 Falla de omisi贸n
Enviaste algo, pero no obtuviste una respuesta. Incluye cuando se env铆a un evento y este detiene la cola.

---

#### 馃暟锔? Falla de tiempo
Algo sucedi贸 demasiado tarde (time-out), o 隆sucedi贸 demasiado temprano! (error de carrera).

#### 馃 Falla de respuesta
Tienes una respuesta, pero parece estar mal. Por ejemplo, faltan valores en la respuesta.

---

#### 馃え Falla arbitraria (o falla bizantina)
Es cuando algo ha salido mal, pero no sabemos si es hubo error o no (y 驴por qu茅?).

---

#### ... Internet es un lugar duro, y un sistema distribuido debe considerar estos casos.

---

## 馃摕 Estilos de comunicaci贸n entre servicios

- **Sincr贸nico con bloqueo**: un microservicio hace una llamada a otro, la operaci贸n se bloquea esperando respuesta.
- **Asincr贸nico sin bloqueo**: el microservicio que emite una llamada puede continuar sin recibir respuesta.

<!-- 
No es necesario elegir un solo estilo de comunicaci贸n. Mezclar estilos, potenciando sus ventajas es normal.
-->

---

<!-- _class: default -->

![v:225px](./assets/bms2_0401.png)

---

<!-- _class: default -->

### 鉁? (acoplamiento temporal)

El acople temporal es cuando dos operaciones, de dos microservicios, tienen que pasar al mismo tiempo. 

![v:225px](./assets/bms2_0203.png)

---

### 馃洃 Sincr贸nico con bloqueo: _request-response_

Un microservicio hace una llamada a otro, la operaci贸n se bloquea esperando respuesta.

Esto se da por que algunas operaciones posteriores **requieren la respuesta**, o simplemente porque quiere asegurarse el 茅xito del trabajo para, si no, realizar un **reintento**.

---

<!-- _class: default -->
![v:225px](./assets/bms2_0402.png)

---

#### 馃З Ejemplo de _request-response_ sincr贸nico

```python
url = f"http://players_service/players?team_id={team_id}"
players = requests.get(url).json()

return [player for player in players
        if player['country'] in countries_in_world_cup]
```

---

#### 馃コ Ventajas de _request-response_ sincr贸nico

- Es un patr贸n simple y familiar. Lo hemos utilizado en consultas SQL a bases de datos o llamadas a APIs externas.
- Nos aseguramos de saber la respuesta a la consulta realizada. Podemos asegurar un flujo si existi贸 un error.

---

#### 馃憥 Desventajas de _request-response_ sincr贸nico

La principal desventaja de este patr贸n es que produce acoplamiento temporal:
- Si el microservicio al que se le hace la _request_ no esta disponible, la consulta inicial falla.
- Se requiere esperar la respuesta, esto puede tardar, m谩s aun en consultas a servicios sobrecargados.
- Especialmente problem谩tico cuando se generan cadenas de consultas.


---

<!-- _class: default -->
![v:225px](./assets/bms2_0403.png)

---

### 鉀擄笍 Asincr贸nico sin bloqueo: _request-response_

Un microservicio env铆a una _request_ a otro microservicio solicitando hacer algo. Cuando se completa la operaci贸n, ya sea con 茅xito o no, el microservicio recibe la respuesta.

Esta respuesta puede recibirla cualquier instancia del microservicio.

---

<!-- _class: default -->
![v:225px](./assets/bms2_0405.png)

---

#### 馃З Ejemplo de _request-response_ asincr贸nico

```python
import aiohttp

session = aiohttp.ClientSession()

url = f"http://players_service/players/train?team_id={team_id}"
session.get(url)

return {'working': True}
```

---

#### 鈿狅笍 No siempre async/await es asincr贸nico

```python
import aiohttp

session = aiohttp.ClientSession()

url = f"http://players_service/players?team_id={team_id}"
players_request = session.get(url)

...

players = await players_request.json()

return [player for player in players
        if player['country'] in countries_in_world_cup]
```

---

#### 馃コ Ventajas de _request-response_ asincr贸nico

- Al no requerir la respuesta inmediatamente, no hay acoplamiento temporal.
- Se permite respuestas que, por falta de informaci贸n o alguna regla de negocio, est茅n en horas o d铆as.

---

#### 馃憥 Desventajas de _request-response_ asincr贸nico

- Es m谩s complejo el dise帽o e implementaci贸n de llamadas asincr贸nicas.
- No hay control del estado de la consulta.

---

### 馃摠 Asincr贸nico sin bloqueo: _event-driven_

- Un microservicio emite un **evento** por cada acci贸n que realiza. Ah铆 termina su responsabilidad.
- El microservicio no sabe que acciones otros microservicios van a realizar al respecto.
- Los microservicios que se suscriben y reciben el evento son los responsables de las respuestas.

---

<!-- _class: default -->
![v:225px](./assets/bms2_0411.png)

---

#### 馃З Ejemplo de cliente _event-driven_ con RabbitMQ

```python
channel = ...

channel.exchange_declare(exchange='warehouse'
                         exchange_type='topic')

channel.basic_publish(exchange='warehouse'
                      routing_key='order.2133.packaged',
                      body=json.dump({...}))
```

---

#### 馃З Ejemplo de servidor _event-driven_ con RabbitMQ

```python
...
queue = channel.queue_declare('notification', exclusive=True)
channel.queue_bind(exchange='warehouse', queue='notification',
                   routing_key='order.*.packaged')

def callback(ch, method, properties, body):
    print(" [x] %r:%r" % (method.routing_key, body))

channel.basic_consume(queue='notification',
                      on_message_callback=callback)
channel.start_consuming()
```

---

- _Event_driven_ intenta ser todo lo contrario a _request-response_: el microservicio que emite el evento sabe muy poco o nada de quienes lo reciben.
- Esto reduce bastante el nivel de acoplamiento de los servicios.
- Esto ayuda bastante a generar equipos independientes trabajando en paralelo.

---

<!-- _class: default -->

#### 馃摠 (驴eventos o mensajes?)

- Eventos son las acciones que suceden en la plataforma. Es un concepto abstracto, arquitect贸nico.
- Habitualmente, estos eventos se env铆an mediante una cola de mensajes. Los mensajes son una forma por la cual se env铆an los eventos.

---

#### 馃啍 Eventos con solo un _id_

- El evento solo env铆a el _id_ de la entidad modificada.
- Habitualmente esto implica realizar una consulta al microservicio que emiti贸 el evento para obtener m谩s informaci贸n.
- Aumenta el acoplamiento y genera mayores consultas, lo que implica mayor carga a los servicios.

---

<!-- _class: default -->
![v:225px](./assets/bms2_0413.png)

---

#### 馃摉 Eventos con toda la informaci贸n

- La alternativa es enviar toda la informaci贸n en el evento.
- Reduce el acoplamiento y al tener un registro de todas las modificaciones del sistema, habilita mayor auditabilidad y patrones como _event sourcing_.
- Eventos muy grandes, dependiendo de la tecnolog铆a, mayor a 1 MB, podr铆an tener problemas.

---

<!-- _class: default -->
![v:225px](./assets/bms2_0414.png)

---

### 馃梽锔? Datos comunes

Este patr贸n se utiliza cuando un microservicio pone datos en una ubicaci贸n definida y otros microservicios acceden y la utilizan. Es muy propenso a acoplamiento de datos comunes (馃檮).

---


<!-- _class: default -->

# 馃摑 Tarea

Realiza una presentaci贸n simple de tu propuesta de proyecto y su arquitectura. Agrega los mecanismos de comunicaci贸n entre servicios a usar y cuales son las conexiones entre los dominios/servicios.

---

## 馃摎 Material complementario
- Building microservices: Designing fine-grained systems, Sam Newman (2021). O'Reilly. Capitulo 4.
- Distributed Systems: Principles and Paradigms, Andrew S. Tanenbaum (2016)