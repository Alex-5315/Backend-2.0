// Importar las funciones necesarias de Sequelize para definir modelos y tipos de datos
const { DataTypes } = require('sequelize');

// Importar la instancia de conexión a la base de datos configurada en database.js
const sequelize = require('../config/database');

// Definir el modelo "usuarios_proyectos" para representar la relación entre usuarios y proyectos
const UserProject = sequelize.define('usuarios_proyectos', {
    // Definir el campo "id" como clave primaria y auto incrementable
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    // Definir el campo "usuario_id" como clave foránea referenciada a la tabla "usuarios"
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "usuarios"
        }
    },
    // Definir el campo "proyecto_id" como clave foránea referenciada a la tabla "proyectos"
    proyecto_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'proyectos', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "proyectos"
        }
    },
}, {
    // Deshabilitar la creación de los campos "createdAt" y "updatedAt" generados automáticamente por Sequelize
    timestamps: false, 

    // Especificar el nombre exacto de la tabla en la base de datos
    tableName: 'usuarios_proyectos',
});

// Exportar el modelo "usuarios_proyectos" para que pueda ser utilizado en otros módulos
module.exports = UserProject;
