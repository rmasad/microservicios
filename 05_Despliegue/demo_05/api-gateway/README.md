# api-gateway

API Gateway en GraphQL (Ariadne sobre FastAPI) usado como ejemplo de despliegue de la Unidad 5. Expone el esquema GraphQL en `/` y un endpoint de salud en `/health`, que usan las probes de Kubernetes.

## Levantar en local con docker-compose

El servicio se conecta a la red `microsvcs`, compartida por las demos del curso. Si no existe, hay que crearla primero:

```bash
docker network create microsvcs
docker compose up --build
```

El servicio queda disponible en `http://localhost:5000`. Al abrirlo en el navegador aparece el explorador de GraphQL, donde puedes probar:

```graphql
{
  getCourse {
    id
    name
  }
}
```

## Desplegar en Kubernetes

Todo el despliegue está en `deployment.yaml`:

- `Service` (ClusterIP) que expone el puerto 5000 dentro del cluster.
- `Deployment` con 2 réplicas, recursos declarados (`requests` y `limits`) y probes de *liveness* y *readiness* contra `/health`.
- `Issuer` de cert-manager para obtener certificados de Let's Encrypt.
- `Ingress` (clase nginx) con TLS para exponer el servicio con URL pública.
- `HorizontalPodAutoscaler` que escala entre 2 y 5 réplicas según uso de CPU.

Para aplicarlo:

```bash
kubectl apply -f deployment.yaml --namespace=microservices
```

## Integración continua

`.gitlab-ci.yml` define dos etapas que corren en cada push a `main`:

1. `docker-build`: construye la imagen y la publica en el registry del proyecto con el tag que indica el archivo `VERSION`.
2. `deploy`: aplica `deployment.yaml` al cluster con `kubectl`, usando el `KUBECONFIG` configurado como variable de CI.

Para publicar una versión nueva: actualiza `VERSION`, actualiza el tag de la imagen en `deployment.yaml` para que coincida, y haz push a `main`. Si el mensaje del commit incluye `[skip-build]`, la etapa de build se salta.
