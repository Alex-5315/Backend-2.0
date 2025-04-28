// Importar la biblioteca Express para crear y gestionar rutas en el servidor
const express = require('express');

// Crear una instancia del objeto router de Express
const router = express.Router();

// Importar el controlador de usuarios para manejar las funciones asociadas a las rutas
const userController = require('../controllers/user.controller');

// Importar los middlewares para autenticación y validación de roles
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Importar los roles definidos en la aplicación desde un archivo de constantes
const ROLES = require('../utils/constants');

// Importar el middleware para manejar errores
const errorHandler = require('../middlewares/error.middleware');

// Definición de rutas para usuarios

// Ruta para crear un nuevo usuario
// No se requiere autenticación para esta acción
router.post('/users/create', userController.createUser);

// Ruta para actualizar un usuario existente
// Protegida mediante middleware para verificar autenticación y rol de administrador
router.put('/users/update/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.updateUser);

// Ruta para obtener todos los usuarios asociados a un administrador
// Protegida mediante autenticación y rol de administrador
router.get('/users', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByAdministradorId);

// Ruta para eliminar un usuario existente
// Protegida mediante autenticación y rol de administrador
router.delete('/users/delete/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.deleteUser);

// Ruta para obtener todos los usuarios con un rol específico
// Protegida mediante autenticación y rol de administrador
router.get('/users/rol/:id', authenticateToken, checkRole([ROLES.ADMIN]), userController.getAllUsersByRolId);

// Middleware para manejar errores en todas las rutas definidas
router.use(errorHandler);

// Exportar el objeto router para que se pueda utilizar en otros módulos de la aplicación
module.exports = router;
