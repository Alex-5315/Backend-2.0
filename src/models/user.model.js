// Importar las funciones necesarias de Sequelize para definir modelos y tipos de datos
const { DataTypes } = require('sequelize');

// Importar la instancia de conexión a la base de datos configurada en database.js
const sequelize = require('../config/database');

// Definir el modelo "usuarios" para representar la tabla de usuarios en la base de datos
const User = sequelize.define('usuarios', {
    // Definir el campo "id" como clave primaria y auto incrementable
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // Definir el campo "nombre" como un string obligatorio
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false // Este campo no puede ser nulo
    },
    // Definir el campo "email" como un string único y obligatorio
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, // Este campo no puede ser nulo
        unique: true // Este campo debe ser único en la base de datos
    },
    // Definir el campo "password" como un string obligatorio
    password: { 
        type: DataTypes.STRING, 
        allowNull: false // Este campo no puede ser nulo
    },
    // Definir el campo "rol_id" como una clave foránea referenciada a la tabla "roles"
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'roles', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "roles"
        }
    },
    // Definir el campo "administrador_id" como una clave foránea referenciada a la tabla "usuarios"
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "usuarios"
        }
    }
}, {
    // Deshabilitar la creación de los campos "createdAt" y "updatedAt" generados automáticamente por Sequelize
    timestamps: false, 

    // Especificar el nombre exacto de la tabla en la base de datos
    tableName: 'usuarios',
});

// Exportar el modelo "usuarios" para que pueda ser utilizado en otros módulos
module.exports = User;
