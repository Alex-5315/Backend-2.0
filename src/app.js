// Importar la biblioteca Express para manejar el servidor
const express = require('express');

// Importar la biblioteca CORS para permitir solicitudes desde diferentes dominios
const cors = require('cors'); // La biblioteca CORS es para habilitar el acceso a la API desde distintas partes

// Crear una instancia de la aplicación Express
const app = express();

// Configurar middleware para procesar solicitudes en formato JSON
app.use(express.json());

// Habilitar CORS para manejar las políticas de origen cruzado
app.use(cors());

// Importar rutas específicas para diferentes módulos de la aplicación
const userRoutes = require('./routes/user.routes'); // Rutas relacionadas con usuarios
const authRoutes = require('./routes/auth.routes'); // Rutas relacionadas con autenticación
const projectRoutes = require('./routes/project.routes'); // Rutas relacionadas con proyectos

// Habilitar las rutas para la API bajo el prefijo "/api/v1"
app.use('/api/v1', userRoutes); // Rutas de usuarios
app.use('/api/v1', authRoutes); // Rutas de autenticación
app.use('/api/v1', projectRoutes); // Rutas de proyectos

// Exportar la instancia de la aplicación para que sea utilizada en otros módulos
module.exports = app;
