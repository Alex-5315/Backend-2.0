// Importar el servicio de usuarios, que contiene las funciones para gestionar usuarios
const userService = require('../services/user.service');

// Controlador para crear nuevos usuarios
exports.createUser = async (req, res) => {
    try { 
        // Extraer los datos necesarios del cuerpo de la solicitud (nombre, email, contraseña, rol y administrador)
        const { nombre, email, password, rol_id, administrador_id } = req.body;

        // Llamar al servicio para crear un usuario con los datos proporcionados
        const newUser = await userService.createUser(nombre, email, password, rol_id, administrador_id);

        // Responder al cliente con el usuario creado y un código de estado 201 (Creado)
        res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500 (Error interno del servidor)
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los usuarios asociados a un administrador
exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        // Extraer el ID del administrador desde el token de autenticación
        const admin_from_token = req.user.id;

        // Extraer opcionalmente el email de la consulta (query) para aplicarlo como filtro
        const { email } = req.query;

        // Llamar al servicio para obtener los usuarios filtrados por administrador y email
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email);

        // Responder al cliente con la lista de usuarios y un código de estado 200 (Éxito)
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para obtener usuarios asociados a un rol específico
exports.getAllUsersByRolId = async (req, res) => {
    try {
        // Llamar al servicio para obtener los usuarios filtrados por rol
        const users = await userService.getAllUsersByRolId(req.params.id);

        // Responder al cliente con la lista de usuarios y un código de estado 200
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Controlador para actualizar un usuario
exports.updateUser = async (req, res) => {
    // Extraer el ID del usuario desde los parámetros de la URL
    const { id } = req.params;

    // Extraer los datos necesarios desde el cuerpo de la solicitud
    const { nombre, email, rol_id, administrador_id } = req.body;

    // Extraer el ID del administrador desde el token de autenticación
    const admin_from_token = req.user.administrador_id;

    try {
        // Llamar al servicio para actualizar el usuario con los nuevos datos
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);

        // Responder al cliente con el usuario actualizado y un código de estado 200
        res.status(200).json({ message: 'El usuario ha sido actualizado con éxito', user });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    // Extraer el ID del usuario desde los parámetros de la URL
    const { id } = req.params;

    // Extraer el ID del administrador desde el token de autenticación
    const admin_from_token = req.user.administrador_id;

    try {
        // Llamar al servicio para eliminar el usuario con el ID proporcionado
        const result = await userService.deleteUser(id, admin_from_token);

        // Responder al cliente con un mensaje de éxito y un código de estado 200
        res.status(200).json(result);
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};


