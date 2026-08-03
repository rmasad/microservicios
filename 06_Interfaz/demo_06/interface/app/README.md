# Interfaz

Aplicación React construida con [Vite](https://vitejs.dev/).

## Scripts disponibles

En el directorio del proyecto puedes ejecutar:

### `npm run dev`

Levanta la aplicación en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.
La página se recarga automáticamente al editar el código.

### `npm run build`

Genera la versión de producción en la carpeta `dist`.

### `npm run preview`

Sirve localmente el resultado de `npm run build` para revisarlo antes de desplegar.

## Variables de entorno

- `VITE_GATEWAY_URI`: URI del API Gateway GraphQL. Si no se define, se usa `http://localhost:5000`.
