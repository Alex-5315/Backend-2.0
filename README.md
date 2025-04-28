# Proyecto Web - ProgamacionWeb

HOLA MUNDO

## Descripción del proyecto

Este proyecto es realizado con el fin de aprender y poner a prueba conceptos vistos en Programación Web, el backend del proyecto ha sido desarrollado con **node.js** y **express**, siguiendo una arquitectura recomendada con la correcta separación de archivos. 
Se ha implementado la conexión con **PostgreSQL**, asegurando un acceso eficiente a los datos.
Como objetivo del proyecto se tomo como idea proporcionar una plataforma para la gestion de proyectos y usuarios, permitiendo la creación, edición y eliminación tanto de proyectos como de usuarios, así como la signación de roles y permisos dados a los usuarios.

## Características de proyecto

- Autenticación de login y registro de usuarios.
- Gestión para usuarios (**CRUD**).
- Gestión de proyectos (**CRUD**).
- Asignación de roles y permisos a los usuarios.
- Integración con una base de datos **PostgreSQL** con ayuda de Sequelize.

## Tecnologías y herramientas

- **Node.js:** Entorno de ejecución para el lado del servidor.
- **Sequelize:** ORM (Mapeo Relacional de Objetos) para interactuar con las base de datos.
- **Express:** Framework para el manejo de rutas y middlewares.
- **Dotenv:** Gestión de variables de entorno.

## Estructura del proyecto

```plaintext
src/
├── config/          
│   ├── database.js        
│   ├── dotenv.js          
├── controllers/     
│   ├── auth.controller.js 
│   ├── project.controller.js 
│   ├── user.controller.js 
├── middlewares/     
│   ├── auth.middleware.js 
│   ├── error.middleware.js   
├── models/          
│   ├── associations.js
│   ├── project.model.js
│   ├── rolePermission.model.js
│   ├── user.model.js
│   ├── userProject.model.js
├── routes/          
│   ├── auth.routes.js
│   ├── project.routes.js
│   ├── user.routes.js
├── services/        
│   ├── auth.service.js
│   ├── project.service.js
│   ├── user.service.js
├── utils/          
│   ├── constants.js
.env
app.js
service.js
```

## Configuració e instalación

### GITHUB
Pasos pal Git
1. ...
2. ...
3. ...

### TERMINAL
Pasos pal npm
1. ...
2. ...

## Cómo generar el JWT_SECRET
1. En al terminal colocar 
```node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"```
2. Esto hara que se genere un jwt secret random y este tambien sera inmutable

## Desarroladores 

...