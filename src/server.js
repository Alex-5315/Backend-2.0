// Importa la configuración de la conexión a la base de datos
const sequelize = require('./config/database');

// Importa la configuración de la aplicación (Express u otra librería)
const app = require('./app');

// Importa dotenv para manejar variables de entorno
const dotenv = require('dotenv');

// Importa las asociaciones entre modelos en Sequelize
require('./models/associations'); // Define las relaciones entre los modelos (foreign keys, belongsToMany, etc.)

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Establece el puerto en el que se ejecutará la aplicación, con un valor predeterminado de 3000 si no se define en el archivo .env
const PORT = process.env.PORT || 3000;

// Prueba la conexión a la base de datos utilizando Sequelize
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize'); // Confirma que la conexión a la base de datos fue exitosa

        // Inicia el servidor en el puerto especificado
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`); // Muestra la URL del servidor
        });
    })
    .catch(err => {
        // Maneja errores de conexión a la base de datos
        console.error('Error conectando a la base de datos:', err);
    });

// Sincroniza los modelos con la base de datos, creando tablas si no existen
sequelize.sync({ force: false }) // La opción "force: false" asegura que no se eliminen datos existentes
    .then(() => {
        console.log('Base de datos sincronizada'); // Confirmación de que las tablas se han sincronizado con éxito
    })
    .catch(err => {
        // Maneja errores durante la sincronización de la base de datos
        console.error('Error al sincronizar la base de datos', err);
    });
