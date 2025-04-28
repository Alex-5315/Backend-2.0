// Importar el modelo de Usuario y la biblioteca bcryptjs para cifrar contraseñas
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Servicio para crear usuarios en la base de datos
exports.createUser = async (nombre, email, password, rol_id, administrador_id) => {
    try {
        // Verificar si el usuario ya existe en la base de datos
        const userExists = await User.findOne({ where: { email } }); // Busca un usuario por su email
        if (userExists) {
            throw new Error('El usuario ya existe'); // Lanzar error si ya existe
        }
        // Cifrar la contraseña del usuario antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear un nuevo registro de usuario en la base de datos
        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser; // Retorna el usuario creado
    } catch (err) {
        // Lanza un error si ocurre algún problema durante la creación
        throw new Error(`Error al crear el usuario: ${err.message}`);
    }
};

// Servicio para obtener todos los usuarios asociados a un administrador
exports.getAllUsersByAdministradorId = async (administrador_id, email) => {
    try {
        // Crear una cláusula "where" para filtrar por administrador_id y, opcionalmente, por email
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email; // Filtrar por email si está disponible
        }
        // Buscar usuarios en la base de datos excluyendo la contraseña
        const users = await User.findAll({ where: whereClause, attributes: { exclude: ['password'] } });
        return users; // Retorna la lista de usuarios filtrados
    } catch (err) {
        // Lanza un error si ocurre un problema al obtener los usuarios
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Servicio para obtener todos los usuarios con un rol específico
exports.getAllUsersByRolId = async (rol_id) => {
    try {
        // Buscar usuarios con el rol especificado, excluyendo la contraseña
        const users = await User.findAll({ where: { rol_id }, attributes: { exclude: ['password'] } });
        return users; // Retorna la lista de usuarios con el rol
    } catch (err) {
        // Lanza un error si ocurre un problema al obtener los usuarios
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};

// Servicio para actualizar un usuario existente en la base de datos
exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        // Buscar el usuario por su ID
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuario no encontrado'); // Lanzar error si el usuario no existe
        }

        console.log('user.administrador_id:', user.administrador_id); // Debugging de administrador actual
        console.log('admin_from_token:', admin_from_token); // Debugging de administrador autenticado

        // Verificar que el administrador autenticado tiene permisos sobre el usuario
        if (Number(user.administrador_id) !== Number(admin_from_token)) {
            throw new Error(`Acceso denegado: user.administrador_id (${user.administrador_id}) no coincide con admin_from_token (${admin_from_token})`);
        }

        // Verificar si el email ya está en uso por otro usuario
        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya está en uso');
            }
        }

        // Actualizar los datos del usuario
        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        return user; // Retorna el usuario actualizado
    } catch (err) {
        // Lanza un error si ocurre un problema durante la actualización
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

// Servicio para eliminar un usuario existente
exports.deleteUser = async (id, admin_from_token) => {
    try {
        // Buscar el usuario por su ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado'); // Lanzar error si el usuario no existe
        }

        // Verificar que el administrador autenticado tiene permisos para eliminar el usuario
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        // Eliminar el usuario de la base de datos
        await user.destroy();
        return { message: 'Usuario eliminado con éxito' }; // Retorna un mensaje de éxito
    } catch (err) {
        // Lanza un error si ocurre un problema durante la eliminación
        throw new Error(`Error al eliminar el usuario: ${err.message}`);
    }
};
