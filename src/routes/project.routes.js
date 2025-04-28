// Importar la biblioteca Express para gestionar las rutas en la aplicación
const express = require('express');

// Crear una instancia del router de Express
const router = express.Router();

// Importar el controlador de proyectos que contiene las funciones asociadas a las rutas
const projectController = require('../controllers/project.controller');

// Importar constantes que definen los roles permitidos en la aplicación
const ROLES = require('../utils/constants');

// Importar los middlewares para autenticación y validación de roles
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Definición de rutas para manejar proyectos

// Ruta para crear un nuevo proyecto
// Protegida mediante autenticación y verificación de que el usuario tenga el rol de administrador
router.post('/projects/create', authenticateToken, checkRole([ROLES.ADMIN]), projectController.createProject);

// Ruta para actualizar un proyecto existente por ID
// Protegida mediante autenticación y verificación de rol de administrador
router.put('/projects/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.updateProject);

// Ruta para obtener todos los proyectos
// Protegida mediante autenticación y verificación de rol de administrador
router.get('/projects', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getAllProjects);

// Ruta para eliminar un proyecto existente por ID
// Protegida mediante autenticación y verificación de rol de administrador
router.delete('/projects/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.deleteProject);

// Ruta para obtener un proyecto específico por ID
// Protegida mediante autenticación y verificación de rol de administrador
router.get('/projects/:id', authenticateToken, checkRole([ROLES.ADMIN]), projectController.getProjectById);

// Ruta para asociar usuarios a un proyecto
// Protegida mediante autenticación y verificación de rol de administrador
router.post('/projects/associate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.assingUsersToProject);

// Ruta para desasociar usuarios de un proyecto
// Protegida mediante autenticación y verificación de rol de administrador
router.delete('/projects/disassociate', authenticateToken, checkRole([ROLES.ADMIN]), projectController.removeUserFromProject);

// Exportar el router para que las rutas definidas puedan ser utilizadas en otros módulos
module.exports = router;
