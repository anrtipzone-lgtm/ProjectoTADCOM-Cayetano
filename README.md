# UPCH · Gestión de Usuarios — Prueba Técnica Frontend

Implementación en React del prototipo HTML de listado de usuarios. Consume la [Random User API](https://randomuser.me/) para obtener datos reales, con soporte para filtros, paginación, edición y eliminación de registros.

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18.x           |
| npm         | 9.x            |

---

## Instrucciones para ejecutar

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd upch-users-app

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en **http://localhost:5173**

### Otros comandos

```bash
npm run build    # Genera el build de producción en /dist
npm run preview  # Sirve el build de producción localmente
```

---

## Consumo de la API

La aplicación utiliza la **[Random User API](https://randomuser.me/)** — pública, gratuita y sin autenticación.

### Endpoint principal

```
GET https://randomuser.me/api/
```

### Parámetros utilizados

| Parámetro | Tipo     | Descripción                                              | Ejemplo          |
|-----------|----------|----------------------------------------------------------|------------------|
| `results` | `number` | Cantidad de usuarios por página                          | `results=10`     |
| `page`    | `number` | Número de página (paginación basada en `seed`)           | `page=2`         |
| `seed`    | `string` | Semilla para resultados consistentes entre páginas       | `seed=upch2024`  |
| `nat`     | `string` | Filtrar por nacionalidad (código ISO de 2 letras)        | `nat=US`         |
| `gender`  | `string` | Filtrar por género (`male` o `female`)                   | `gender=female`  |

### Ejemplo de llamadas

```bash
# Obtener 10 usuarios (primera página, semilla fija)
GET https://randomuser.me/api/?results=10&page=1&seed=upch2024

# Filtrar por nacionalidad y género
GET https://randomuser.me/api/?results=10&page=1&seed=upch2024&nat=US&gender=female

# Múltiples nacionalidades
GET https://randomuser.me/api/?results=10&page=1&seed=upch2024&nat=US,AU,BR
```

### Estructura de la respuesta

```json
{
  "results": [
    {
      "gender": "female",
      "name": { "title": "Ms", "first": "Lesa", "last": "Collins" },
      "location": {
        "street": { "number": 8929, "name": "Valwood Pkwy" },
        "city": "Billings",
        "state": "Michigan",
        "country": "United States"
      },
      "email": "lesa.collins@example.com",
      "phone": "527-567-368",
      "nat": "US",
      "login": { "uuid": "abc123..." },
      "picture": {
        "large": "https://randomuser.me/api/portraits/women/53.jpg",
        "medium": "https://randomuser.me/api/portraits/med/women/53.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/53.jpg"
      }
    }
  ],
  "info": {
    "seed": "upch2024",
    "results": 10,
    "page": 1,
    "version": "1.4"
  }
}
```

> **Nota:** las operaciones de **editar** y **eliminar** son locales (state de React) porque la API de Random User no admite mutaciones. En un entorno real, estas acciones dispararían llamadas `PUT`/`DELETE` a una API propia.

---

## Arquitectura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx          # Barra de navegación
│   ├── FilterPanel.jsx     # Panel de filtros colapsable (nat, gender)
│   ├── UserTable.jsx       # Tabla principal con acciones
│   ├── UserRow.jsx         # Fila individual de usuario
│   ├── Pagination.jsx      # Componente de paginación accesible
│   ├── EditModal.jsx       # Modal de edición con validación
│   ├── DeleteModal.jsx     # Modal de confirmación de eliminación
│   └── Toast.jsx           # Notificaciones de feedback
├── hooks/
│   └── useUsers.js         # Estado global via useReducer (fetch, filtros, CRUD)
├── services/
│   └── userService.js      # Lógica de llamadas a la API
├── App.jsx                 # Composición de la aplicación
├── main.jsx                # Entry point con imports de Bootstrap
└── index.css               # Estilos globales (Montserrat, overrides Bootstrap)
```

### Decisiones técnicas destacadas

- **`useReducer`** en `useUsers.js` para centralizar las transiciones de estado (fetch, selección, edición, eliminación) de forma predecible.
- **Componentización fina**: cada responsabilidad visual está encapsulada en su propio componente con props explícitas.
- **Validación en el formulario de edición**: campos obligatorios + formato de email, con mensajes de error accesibles (`aria-describedby`, `aria-invalid`).
- **Accesibilidad básica**: roles ARIA en modales (`role="dialog"`, `aria-modal`, `aria-labelledby`), `aria-live` en el spinner de carga, `aria-label` en botones icónicos, foco automático al abrir modales, navegación por teclado (Escape para cerrar).
- **Paginación consistente** usando `seed` fijo en la API para que la misma página siempre devuelva los mismos datos.

---

## Stack tecnológico

| Librería           | Uso                              |
|--------------------|----------------------------------|
| React 19           | UI reactiva                      |
| Vite 8             | Bundler y dev server             |
| Bootstrap 5        | Sistema de diseño y layout       |
| Bootstrap Icons    | Iconografía SVG                  |
| Random User API    | Fuente de datos de usuarios      |
