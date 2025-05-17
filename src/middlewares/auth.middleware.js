// Importar la biblioteca "jsonwebtoken" para generar y verificar tokens de autenticación
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la clave secreta desde las variables de entorno
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware para autenticar tokens
const authenticateToken = (req, res, next) => {
    console.log('Middleware authenticateToken ejecutado'); // 🔎 Depuración

    // Obtener el token del encabezado de autorización y eliminar el prefijo "Bearer"
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        console.log('No se proporcionó token'); 
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }

    // Verificar la validez del token utilizando la clave secreta
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Error al verificar token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }

        console.log('Token decodificado:', user); // 🔎 Ver contenido del token

        // PARTE EDITADA: Se agregó validación para asegurarse de que `administrador_id` y `rol_id` estén presentes
        if (!user.administrador_id || !user.rol_id) {
            console.error('Error: El token no contiene datos completos.');
            return res.status(403).json({ message: 'Token inválido, falta información.' });
        }

        req.user = user; //  Asignar el usuario autenticado
        next();
    });
};

// Middleware para verificar el rol del usuario
const checkRole = (roles) => {
    return (req, res, next) => {
        console.log('Middleware checkRole ejecutado'); // 🔎 Depuración

        // Obtener el rol del usuario desde el objeto `req.user`
        const { rol_id } = req.user;
        console.log(`Rol del usuario: ${rol_id}`); 
        console.log(`Roles permitidos: ${roles}`); 

        // Verificar si el rol del usuario está incluido en los roles permitidos
        if (!roles.includes(rol_id)) {
            console.log('Acceso denegado');
            return res.status(403).json({ message: 'Acceso denegado, no tienes permiso para realizar esta acción' });
        }

        next();
    };
};

module.exports = { authenticateToken, checkRole };
