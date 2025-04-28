// Importar la biblioteca "jsonwebtoken" para generar y verificar tokens de autenticación
const jwt = require('jsonwebtoken');

// Importar la biblioteca "bcryptjs" para cifrar y verificar contraseñas
const bcrypt = require('bcryptjs');

// Importar la biblioteca "dotenv" para manejar variables de entorno
const dotenv = require('dotenv');

// Importar los modelos "User" y "RolePermisssion" desde sus respectivas ubicaciones
const User = require('../models/user.model'); // Modelo que representa a los usuarios en la base de datos
const RolePermisssion = require('../models/rolePermission.model'); // Modelo que representa los permisos de rol en la base de datos

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la clave secreta desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// **Opcional**: Verificar si la variable JWT_SECRET está definida
// Esto puede evitar errores si la variable no está configurada correctamente
// if (!SECRET_KEY) {
//     throw new Error('La variable JWT_SECRET no está definida');
// }

// Exportar un servicio para iniciar sesión con email y contraseña
exports.loginUser = async (email, password) => {
    try {
        // Buscar al usuario en la base de datos usando su email
        const user = await User.findOne({ where: { email } }); // Busca un usuario en la tabla "users" mediante su email
        if (!user) {
            throw new Error('Usuario no encontrado'); // Lanza un error si el usuario no existe
        }

        // **Opcional**: Verificar si el usuario está activo antes de continuar
        // Esto evita que usuarios desactivados puedan iniciar sesión
        // if (!user.isActive) {
        //     throw new Error('El usuario no está activo');
        // }

        // Verificar si la contraseña proporcionada es válida comparándola con la contraseña cifrada
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compara contraseñas
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta'); // Lanza un error si la contraseña no coincide
        }

        // Consultar los permisos relacionados con el rol del usuario en la base de datos
        const rolePermissions = await RolePermisssion.findAll({
            where: { rol_id: user.rol_id }, // Filtrar por el rol del usuario
            attributes: ['permiso_id'] // Obtener únicamente los IDs de los permisos
        });

        // Extraer los permisos del resultado obtenido
        const permisos = rolePermissions.map(rp => rp.permiso_id); // Crear un arreglo con los IDs de permisos

        // Generar un token JWT que contiene los datos del usuario y sus permisos
        const token = jwt.sign(
            { 
                id: user.id, // ID único del usuario
                nombre: user.nombre, // Nombre del usuario
                email: user.email, // Email del usuario
                rol_id: user.rol_id, // ID del rol del usuario
                permisos, // Permisos asociados al rol
                administrador_id: user.administrador_id // ID del administrador asociado al usuario
            },
            SECRET_KEY, // Clave secreta para firmar el token
            { expiresIn: '1h' } // Duración del token antes de expirar
        );

        // Imprimir el token generado para propósitos de depuración
        console.log(token);

        // **Opcional**: Verificar si el token se generó correctamente
        // Esto puede ayudar a identificar problemas con la generación del token
        // if (!token) {
        //     throw new Error('Error al generar el token');
        // }

        return token; // Retorna el token generado para el usuario
    } catch (error) {
        // Lanza un error si ocurre algún problema durante el proceso de inicio de sesión
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};
