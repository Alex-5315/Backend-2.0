// Importar las funciones necesarias de Sequelize para definir modelos y tipos de datos
const { DataTypes } = require('sequelize');

// Importar la instancia de conexión a la base de datos configurada en database.js
const sequelize = require('../config/database');

// Definir el modelo "roles_permisos" para representar la relación entre roles y permisos en la base de datos
const RolePermission = sequelize.define('roles_permisos', {
    // Definir el campo "rol_id" como una clave foránea que referencia a la tabla "roles"
    rol_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'roles', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "roles"
        }
    },
    // Definir el campo "permiso_id" como una clave foránea que referencia a la tabla "permisos"
    permiso_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'permisos', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "permisos"
        }
    }
}, {
    // Deshabilitar la creación de los campos "createdAt" y "updatedAt" generados automáticamente por Sequelize
    timestamps: false, 

    // Especificar el nombre exacto de la tabla en la base de datos
    tableName: 'roles_permisos',
});

// Exportar el modelo "roles_permisos" para que pueda ser utilizado en otros módulos de la aplicación
module.exports = RolePermission;
