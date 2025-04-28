// Importar la biblioteca Express para crear el servidor y manejar las rutas
const express = require('express');

// Importar la biblioteca CORS para habilitar solicitudes de recursos desde diferentes orígenes
const cors = require('cors'); // CORS permite que tu API sea accesible desde otros dominios, ideal para aplicaciones frontend y APIs RESTful

// Crear una instancia de la aplicación Express
const app = express();

// **Habilitar módulos necesarios**
// Este middleware permite que la aplicación procese solicitudes con datos en formato JSON
app.use(express.json());

// Este middleware habilita las políticas de CORS para permitir el acceso a la API desde otros dominios
app.use(cors());

// **Importar rutas**
// Ruta para manejar la lógica relacionada con los usuarios (registro, inicio de sesión, etc.)
const userRoutes = require('./routes/user.routes');

// Ruta para manejar la autenticación (login y validaciones de tokens)
const authRoutes = require('./routes/auth.routes');

// Ruta para manejar la lógica relacionada con los proyectos
const projectRoutes = require('./routes/project.routes');

// **Habilitar estas rutas**
// Se utiliza un prefijo común '/api/v1' para todas las rutas, lo que ayuda a estructurar las versiones de la API
app.use('/api/v1', userRoutes); // Rutas relacionadas con usuarios
app.use('/api/v1', authRoutes); // Rutas relacionadas con autenticación
app.use('/api/v1', projectRoutes); // Rutas relacionadas con proyectos

// Exportar la instancia de la aplicación Express para que pueda ser utilizada en otros módulos
module.exports = app;
