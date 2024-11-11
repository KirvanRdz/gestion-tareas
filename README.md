# Proyecto de Gestión de Tareas

Este proyecto es una API RESTful para la gestión de tareas, que permite la creación, actualización, eliminación y obtención de tareas. El sistema utiliza autenticación mediante JWT (JSON Web Tokens) para proteger los endpoints.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org) (versión 16 o superior)
- [PostgreSQL](https://www.postgresql.org/download/) para el entorno de producción.

Además, necesitarás configurar un archivo `.env` para definir las variables de entorno necesarias para el proyecto.

## Instalación

1. Clona el repositorio:

```bash
  git clone https://github.com/KirvanRdz/gestion-tareas.git
  cd gestion-tareas
```

2. Instala las dependencias del proyecto:
```bash
$ npm install
```

3. Crea un archivo .env en la raíz del proyecto y configura las siguientes variables de entorno:

- JWT_SECRET='sahaskKASJAH521A2S-/*ASJAT6543'
- DB_USER='postgres'
- DB_HOST='localhost'
- DB_NAME='task'
- DB_PASSWORD='test246'

Asegúrate de que tu base de datos PostgreSQL esté configurada en tu entorno local.

## Ejecutar el Proyecto

3. Ejecuta el servidor:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
Esto iniciará la API en el puerto 3000 (puedes cambiar el puerto si lo necesitas).

## Pruebas unitarias y de integración

El proyecto utiliza Jest para las pruebas unitarias y SQLite como base de datos en memoria para las pruebas de integración.

```bash

$ npm run test
```
Esto ejecutará todas las pruebas en el proyecto, utilizando una base de datos SQLite en memoria para la prueba de integración con el fin garantizar que las pruebas sean independientes del entorno de producción.

## Descripción de los Endpoints

Puedes consultar la documentación de todos los endpoints disponibles en la API en la sección de Swagger en http://localhost:3000/api/docs.

### Endpoints principales:
#### POST /api/registro: Crear un nuevo usuario en el sistema.
#### POST /api/login: Inicia sesión y obtiene un token JWT.
#### POST /api/tareas: Crear una nueva tarea.
#### GET /api/tareas: Obtener un listado de tareas con paginado.
#### GET /api/tareas/{id}: Obtener una tarea especifica.
#### PUT /api/tareas/{id}: Actualizar una tarea existente
#### DELETE /api/tareas/{id} Elimina una tarea por su ID.

## Instrucciones de Uso

1. Registrar un usuario: Usa el endpoint de registro para crear un usuario en el sistema. Necesitarás este paso antes de iniciar sesión.
2. Iniciar sesión: Utiliza el endpoint de login para autenticar al usuario y obtener un token JWT.
3. Acceder a tareas: Una vez que hayas obtenido el token JWT, inclúyelo en la cabecera de autorización (Bearer Token) al realizar solicitudes a los endpoints protegidos, como la gestión de tareas.