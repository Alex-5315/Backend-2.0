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
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id } = req.body;
    const admin_from_token = req.user.administrador_id;
    const rolUsuarioAutenticado = req.user.rol_id; // ✅ Nuevo parámetro

    console.log('ID del usuario a modificar:', id);
    console.log('Datos enviados:', { nombre, email, rol_id, administrador_id });
    console.log('Admin autenticado desde el token:', admin_from_token); 
    console.log('Rol del usuario autenticado:', rolUsuarioAutenticado);

    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token, rolUsuarioAutenticado);
        res.status(200).json({ message: 'El usuario ha sido actualizado con éxito', user });
    } catch (err) {
        console.error('Error en el controlador updateUser:', err);
        res.status(500).json({ message: err.message });
    }
};


// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.administrador_id;
    const rolUsuarioAutenticado = req.user.rol_id; // ✅ Nuevo parámetro

    console.log(`Intentando eliminar usuario con ID: ${id}`);
    console.log(`Admin autenticado desde el token: ${admin_from_token}`);
    console.log(`Rol del usuario autenticado: ${rolUsuarioAutenticado}`);

    try {
        const result = await userService.deleteUser(id, admin_from_token, rolUsuarioAutenticado);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error en el controlador deleteUser:', err);
        res.status(500).json({ message: err.message });
    }
};



