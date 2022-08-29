---
marp: true
---
<!-- marp: true -->
<!-- theme: uncover -->
<!-- class: invert -->
<!-- paginate: true -->
<!-- footer: Microservicios por Rafik Mas'ad Nasra -->
<!-- author: Rafik Mas'ad Nasra -->
<!-- title: Introducción a microservicios -->
<!-- size: 16:9 -->

<style>    
    ul { margin: 0; }
    section.invert p { text-align: left; }
</style>

## Unidad 2
# Estrategias de división de servicios

---

### En este capitulo vamos a estar respondiéndonos las preguntas...
## ¿Cómo dividir un servicio de otro? ¿Cómo definir sus fronteras?

---

<!-- _class: default -->

### Parte importante de lo que veremos en este capitulo son técnicas criterios utilizados para dividir módulos. Como microservice es un tipo de arquitectura modular, veremos que gran parte aplica a esta arquitectura. 

<!--
Colyer, en su blog, el 2016 tomo el trabajo de Parnas de 1972, y lo adapto a microservicios.
On the Criteria To Be Used in Decomposing Systems into Modules...
-->

---

**Definir las fronteras de microservicios utilizando los criterios dee [[Parnas, 1972]]:**
- Información oculta
- Cohesión
- Acoplamiento

---

### 🫣 Información oculta

**"La conexión entre los módulos son las suposiciones que deben hacer los módulos entre ellos"** [[Parnas, 1972]]. Hay que reducir la conexión entre los servicios.

---

Esto significa mejor...
- **Velocidad de desarrollo**: se pueden agregar desarrolladores en paralelo.  
- **Comprensión**: se puede entender cada parte sin entender el total.
- **Flexibilidad**: se puede cambiar una parte sin tocar el resto. 

---

### 🫶 Cohesión

"Mantén junto todo lo que cambia por la misma razón..."  (Robert C. Martin)


### 🪢 Acoplamiento

Un servicio no debe requerir que otro servicio cambie para el cambiar.

---

<!-- _class: default -->

Constantine's Law: "Una estructura es estable si tiene alta cohesión y bajo acoplamiento."

<!-- 
- Albert Endres and Dieter Rombach: A Handbook of Software and Systems Engineering. p. 43pp. 2003.
-->

![h:400](https://miro.medium.com/max/700/1*wtFdHw_l_-muj2e6mowmYA.png)

<!--
Fuente: [Why Product Development and Design needs Cohesion-Coupling](https://bootcamp.uxdesign.cc/why-product-development-and-design-needs-cohesion-coupling-87731c84aaa7)
-->

---

## 🕸️ Tipos de acoplamiento

#### Dominio ↔ Paso ↔ Común ↔ Contenido
##### Menos grave ↔ ... ↔ Más grave

---

### 🔨 Acoplamiento de dominio

Esto se da cuando un servicio requiere interactuar con otro servicio para utilizar una funcionalidad que este tiene. Es inevitable en grandes sistemas pero **debe ser minimizada**.

Ejemplo común: se requiere confirmar si el usuario tiene permisos para realizar la acción solicitada: se consulta a un servicio de autentificación. 

---

### 🚏 Acoplamiento de paso

Esto sucede cuando en una llamada de un servicio a otro, se envían datos para que este llame a un tercero.

Un ejemplo es cuando el servicio de compras le envía información adicional al servicio de inventario para que este pueda llamar al servicio de 'delivery' (shipping).

---

### 🗞️ Acoplamiento de datos comunes

Cuando dos servicios comparten el acceso a la misma base de datos pero escriben sobre atributos/entidades distintas. **Debe evitarse a toda costa.**

---

### 💾 Acoplamiento de contenido

Cuando dos servicios comparten el acceso a la misma base de datos y escriben sobre los mismos atributos/entidades.

En caso de error, hace más complejo la trazabilidad de que servicio fue el que realizo el cambio y tiene el problema. **Debe evitarse a toda costa.**

También se le conoce como **acoplamiento patológico**.

---

## 🎨 Domain Driven Design (DDD)

Es una propuesta de Eric Evans (2003) para representar de mejor manera un sistema en el contexto en el que se desenvuelve.

---

### 👔 Lenguaje ubicuo

Definir y adoptar un lenguaje común para el diseño del sistema, el código y el negocio. Tener un lenguaje ubicuo permite ahorrar tiempo y disminuir el roce en la toma de requerimientos.

---

### 🗄️ Agregación

Un conjunto de objetos que son manejados como un sola entidad, habitualmente, refiriéndose a un concepto del mundo real.

Un servicio esta a cargo del ciclo de vida de una o más agregaciones.

---

La relación entre agregaciones dentro del mismo servicio se modelan con una clave foránea.

Cuando la relación es con una agregación de otro servicio, dependencia entre-servicios, se utiliza la ID remota o su URI (_Uniform Resource Identifier_).

---

### 🪢 Contexto acotado

Fronteras explicitas alrededor una parte del dominio del negocio que entrega una funcionalidad al sistema al mismo tiempo que oculta su complejidad. 

Pueden contener una o más agregaciones. Algunas se exponen (_shared models_) y otras se ocultan (_hidden models_).

---

<!-- _class: default -->

# 📝 Tarea

¡Propón un proyecto para el trabajo final del curso!

Explica tu idea en uno o dos párrafos, divídelo en servicios (5 a 10) y explica mediante DDD cada uno de ellos.

---

## 📚 Material complementario
- Building microservices: Designing fine-grained systems, Sam Newman (2021). O'Reilly. Capitulo 2.
- On the Criteria To Be Used in Decomposing Systems into Modules, [Parnas, 1972].
- On the criteria to be used in decomposing systems into modules, [Colyer, 2016].
---
- A Handbook of Software and Systems Engineering, Albert Endres and Dieter Rombach (2003).
- Domain-Driven Design: Tackling Complexity in the Heart of Software, Eric Evans (2003). 


[Parnas, 1972]: https://www.win.tue.nl/~wstomv/edu/2ip30/references/criteria_for_modularization.pdf
[Colyer, 2016]: https://blog.acolyer.org/2016/09/05/on-the-criteria-to-be-used-in-decomposing-systems-into-modules/