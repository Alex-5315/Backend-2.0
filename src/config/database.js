// Importar la clase Sequelize del módulo 'sequelize' para gestionar la conexión y operaciones en la base de datos
const { Sequelize } = require('sequelize');

// Importar la biblioteca 'dotenv' para manejar variables de entorno de forma segura
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env utilizando dotenv
dotenv.config(); // Esto permite acceder a las variables como process.env.VARIABLE

// Crear una nueva instancia de Sequelize con los parámetros necesarios para conectar a la base de datos
const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
    {
        host: process.env.DB_HOST, // Dirección del host donde se encuentra la base de datos
        dialect: 'postgres', // Especificar el dialecto de la base de datos (en este caso, PostgreSQL)
        port: process.env.DB_PORT, // Puerto utilizado para conectar a la base de datos
        logging: false, // Desactivar el registro de consultas SQL en la consola
        timezona: '-05:00' // Ajustar la zona horaria a la correspondiente de Colombia (-05:00)
    }
);

// Exportar la instancia de Sequelize para que pueda ser utilizada en otros módulos del proyecto
module.exports = sequelize;

/*
Notas:
- 'dotenv' es especialmente útil para proteger credenciales sensibles como contraseñas o claves API.
- Sequelize es una herramienta poderosa para gestionar bases de datos mediante modelos y relaciones,
  reduciendo la necesidad de escribir consultas SQL directamente.
*/
