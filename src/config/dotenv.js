// Importar la biblioteca "dotenv" para manejar variables de entorno
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env utilizando "dotenv"
dotenv.config();

// Exportar un objeto que contiene las variables de entorno
// Este objeto se utiliza para centralizar y facilitar el acceso a estas variables en diferentes partes del proyecto
module.exports = {
    PORT: process.env.PORT, // Puerto en el que se ejecuta el servidor
    DB_NAME: process.env.DB_NAME, // Nombre de la base de datos
    DB_USER: process.env.DB_USER, // Nombre del usuario de la base de datos
    DB_PASSWORD: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    DB_HOST: process.env.DB_HOST, // Dirección del servidor de la base de datos
    DB_PORT: process.env.DB_PORT, // Puerto del servidor de la base de datos
    JWT_SECRET: process.env.JWT_SECRET // Clave secreta utilizada para la generación y verificación de tokens
};
