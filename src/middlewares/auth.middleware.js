// Importar la biblioteca "jsonwebtoken" para generar y verificar tokens de autenticación
const jwt = require('jsonwebtoken');

// Importar la biblioteca "dotenv" para manejar variables de entorno
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la clave secreta desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar tokens
const authenticateToken = (req, res, next) => {
    console.log('Middleware authenticateToken ejecutado'); // Mensaje de depuración para indicar que se ejecutó el middleware

    // Obtener el token del encabezado de autorización y eliminar el prefijo "Bearer"
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        // Mensaje de depuración para indicar que no se proporcionó un token
        console.log('No se proporcionó token'); 
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' }); // Respuesta con código de estado 401 si no hay token
    }

    // Verificar la validez del token utilizando la clave secreta
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            // Mensaje de depuración para indicar que ocurrió un error al verificar el token
            console.error('Error al verificar token:', err);
            return res.status(403).json({ message: 'Token no válido' }); // Respuesta con código de estado 403 si el token no es válido
        }

        // Si el token es válido, asignar el usuario decodificado al objeto "req" para que esté disponible en las siguientes capas
        req.user = user;
        console.log('Token verificado correctamente'); // Mensaje de depuración para indicar que el token fue verificado
        console.log('Contenido del token:', req.user); // Mostrar el contenido del token decodificado en la consola
        next(); // Continuar con el siguiente middleware o controlador
    });
};

// Middleware para verificar el rol del usuario
const checkRole = (roles) => {
    return (req, res, next) => {
        console.log('Middleware checkRole ejecutado'); // Mensaje de depuración para indicar que se ejecutó el middleware

        // Obtener el rol del usuario desde el objeto "req.user" previamente asignado por el middleware "authenticateToken"
        const { rol_id } = req.user;
        console.log(`Rol del usuario: ${rol_id}`); // Mensaje de depuración para mostrar el rol del usuario
        console.log(`Roles permitidos: ${roles}`); // Mensaje de depuración para mostrar los roles permitidos

        // Verificar si el rol del usuario está incluido en los roles permitidos
        if (!roles.includes(rol_id)) {
            console.log('Acceso denegado'); // Mensaje de depuración para indicar que se denegó el acceso
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción' }); // Respuesta con código de estado 403 si el usuario no tiene un rol permitido
        }

        next(); // Continuar con el siguiente middleware o controlador
    };
};

// Exportar los middlewares para que puedan ser utilizados en otras partes de la aplicación
module.exports = { authenticateToken, checkRole };
