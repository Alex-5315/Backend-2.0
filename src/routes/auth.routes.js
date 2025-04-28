// Importar la biblioteca Express para crear y gestionar rutas en el servidor
const express = require('express');

// Crear una instancia del router de Express para definir rutas específicas
const router = express.Router();

// Importar el controlador de autenticación que contiene las funciones para manejar las solicitudes
const authController = require('../controllers/auth.controller');

// Importar los middlewares para autenticar tokens y verificar los roles de los usuarios
const { authenticateToken, checkRole } = require('../middlewares/auth.middleware');

// Importar las constantes que definen los roles permitidos en la aplicación
const ROLES = require('../utils/constants');

// Ruta POST para iniciar sesión
// Permite que un usuario inicie sesión enviando email y contraseña
router.post('/auth/login', authController.login);

// Ruta PUT para actualizar un usuario específico por ID
// Protegida mediante el middleware de autenticación (authenticateToken)
// Esta ruta permite que los datos del usuario sean actualizados si el administrador tiene permisos
router.put('/api/v1/users/update/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Extraer el ID del usuario desde los parámetros de la URL
        const { nombre, email, rol_id, administrador_id } = req.body; // Extraer los datos enviados en el cuerpo de la solicitud
        const admin_from_token = req.user.administrador_id; // Obtener el ID del administrador desde el token autenticado

        // Llamar a la función para actualizar los datos del usuario
        const updatedUser = await updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json(updatedUser); // Enviar una respuesta con el usuario actualizado
    } catch (err) {
        // Manejar cualquier error durante la ejecución y enviar una respuesta de error
        res.status(500).json({ message: err.message });
    }
    console.log('Token generado:', token); // Depuración para verificar el token generado
});

// Exportar el router para que se pueda utilizar en otros módulos de la aplicación
module.exports = router;
