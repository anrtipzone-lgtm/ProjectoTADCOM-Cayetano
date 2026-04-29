# ProjectoTADCOM-Cayetano

Aplicación React para gestión de propiedades inmobiliarias, conectada a una API REST desplegada en AWS (Lambda + API Gateway + Aurora PostgreSQL).

---

## Requisitos

- Node.js 18+
- npm

## Instalación y ejecución local

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

> El servidor de desarrollo incluye un proxy hacia la API de AWS para evitar errores CORS. No se necesita configuración adicional.

---

## API

### Base URL

```
https://g3oak4ydna.execute-api.us-east-1.amazonaws.com/Prod
```

La API está desplegada públicamente en AWS API Gateway (us-east-1) y no requiere autenticación.

---

### Endpoints

#### Listar todas las propiedades

```http
GET /casas
```

**Respuesta `200 OK`**
```json
[
  {
    "id": 5,
    "direccion": "Calle Ayar Auca",
    "distrito": "Trujillo",
    "numeroHabitaciones": 2,
    "tipoCasa": "Casa",
    "areaM2": 60.00,
    "precio": 120000.00,
    "descripcion": "Casa en Trujillo",
    "fechaPublicacion": "2026-04-29T16:07:57.003206Z",
    "activo": true
  }
]
```

---

#### Obtener una propiedad por ID

```http
GET /casas/{id}
```

**Respuesta `200 OK`** — objeto individual con la misma estructura de arriba.

**Respuesta `404 Not Found`** — si el ID no existe.

---

#### Crear una propiedad

```http
POST /casas
Content-Type: application/json
```

**Body**
```json
{
  "direccion": "Av. Larco 740",
  "distrito": "Miraflores",
  "numeroHabitaciones": 3,
  "tipoCasa": "Departamento",
  "areaM2": 95.0,
  "precio": 280000.0,
  "descripcion": "Departamento moderno con vista al mar",
  "activo": true
}
```

> `fechaPublicacion` es generado automáticamente por el servidor. No incluirlo en el body.

**Respuesta `201 Created`** — objeto creado con su `id` asignado.

---

#### Actualizar una propiedad

```http
PUT /casas/{id}
Content-Type: application/json
```

**Body** — objeto completo incluyendo `id` y `fechaPublicacion` (los mismos valores que devuelve el GET):

```json
{
  "id": 5,
  "direccion": "Calle Ayar Auca 200",
  "distrito": "Trujillo",
  "numeroHabitaciones": 3,
  "tipoCasa": "Casa",
  "areaM2": 70.00,
  "precio": 135000.00,
  "descripcion": "Casa remodelada en Trujillo",
  "fechaPublicacion": "2026-04-29T16:07:57.003206Z",
  "activo": true
}
```

**Respuesta `204 No Content`** — sin cuerpo en la respuesta.

---

#### Eliminar una propiedad

```http
DELETE /casas/{id}
```

**Respuesta `204 No Content`** — sin cuerpo en la respuesta.

---

### Tipos de propiedad válidos (`tipoCasa`)

| Valor           |
|-----------------|
| Casa            |
| Departamento    |
| Oficina         |
| Local Comercial |
| Terreno         |

---

## Entorno de prueba (API no disponible)

Si la API no está desplegada o no es accesible, puedes levantar un servidor mock local con `json-server`:

### 1. Instalar json-server

```bash
npm install -g json-server
```

### 2. Crear archivo de datos `db.json`

```json
{
  "casas": [
    {
      "id": 1,
      "direccion": "Av. Larco 740",
      "distrito": "Miraflores",
      "numeroHabitaciones": 3,
      "tipoCasa": "Departamento",
      "areaM2": 95.0,
      "precio": 280000.0,
      "descripcion": "Departamento moderno con vista al mar",
      "fechaPublicacion": "2026-04-29T00:00:00Z",
      "activo": true
    },
    {
      "id": 2,
      "direccion": "Calle Las Flores 234",
      "distrito": "San Isidro",
      "numeroHabitaciones": 4,
      "tipoCasa": "Casa",
      "areaM2": 200.0,
      "precio": 550000.0,
      "descripcion": "Casa amplia con jardín en zona residencial",
      "fechaPublicacion": "2026-04-29T00:00:00Z",
      "activo": true
    }
  ]
}
```

### 3. Levantar el servidor mock

```bash
json-server --watch db.json --port 3001
```

### 4. Cambiar la URL en el frontend

Editar `src/services/userService.js`:

```js
// Cambiar esta línea:
const BASE_URL = '/api';

// Por:
const BASE_URL = 'http://localhost:3001';
```

Y actualizar las rutas en el mismo archivo de `/casas` a `/casas` (json-server usa el nombre de la colección directamente).

> Con json-server el CRUD completo funciona sin necesidad de proxy ni AWS.

---

## Arquitectura

```
React (Vite)
    │
    │  /api/*  → proxy Vite (solo dev)
    ▼
AWS API Gateway  (us-east-1)
    │
    ▼
AWS Lambda (.NET 8)
    │
    ▼
AWS Aurora PostgreSQL  (us-east-2)
    Base de datos: CasasDB
```

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Bootstrap 5 |
| Backend | .NET 8 — AWS Lambda |
| API | AWS API Gateway (REST) |
| Base de datos | AWS Aurora PostgreSQL |
| Infraestructura | AWS SAM — stack `awsserverless-casas` |
