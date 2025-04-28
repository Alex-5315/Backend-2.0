// Importar las funciones necesarias de Sequelize para definir modelos y tipos de datos
const { DataTypes } = require('sequelize');

// Importar la instancia de conexión a la base de datos configurada en database.js
const sequelize = require('../config/database');

// Definir el modelo "proyectos" para representar la tabla de proyectos en la base de datos
const Project = sequelize.define('proyectos', {
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
    // Definir el campo "descripcion" como un string obligatorio
    descripcion: { 
        type: DataTypes.STRING, 
        allowNull: false // Este campo no puede ser nulo
    },
    // Definir el campo "fecha_creacion" como una fecha obligatoria con un valor predeterminado
    fecha_creacion: { 
        type: DataTypes.DATE, 
        allowNull: false, // Este campo no puede ser nulo
        defaultValue: DataTypes.NOW // Se establece automáticamente la fecha actual al crear el registro
    },
    // Definir el campo "administrador_id" como una clave foránea referenciada a la tabla "usuarios"
    administrador_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // No se permite que este campo sea nulo
        references: { 
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id' // Campo referenciado en la tabla "usuarios"
        }
    },
}, {
    // Deshabilitar la creación de los campos "createdAt" y "updatedAt" generados automáticamente por Sequelize
    timestamps: false, 

    // Especificar el nombre exacto de la tabla en la base de datos
    tableName: 'proyectos',

    // Configurar Sequelize para utilizar nombres de columnas con guiones bajos
    underscored: true,

    // Definir hooks para realizar ajustes automáticos después de crear un proyecto
    hooks: {
        afterCreate: (project, options) => {
            if (project.fecha_creacion) {
                // Ajustar la fecha de creación para la zona horaria de Colombia restando 5 horas
                project.fecha_creacion.setHours(project.fecha_creacion.getHours() - 5);
            }
        }
    }
});

// Exportar el modelo "proyectos" para que pueda ser utilizado en otros módulos de la aplicación
module.exports = Project;
