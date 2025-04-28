// Importar los modelos necesarios para establecer relaciones entre ellos
const User = require('./user.model'); // Modelo de usuarios
const Project = require('./project.model'); // Modelo de proyectos
const UserProject = require('./userProject.model'); // Modelo intermedio para la relación entre usuarios y proyectos

// Definir las relaciones entre los modelos

// Relación muchos a muchos entre usuarios y proyectos
// Utilizamos "belongsToMany" para crear la relación de varios usuarios con varios proyectos
User.belongsToMany(Project, { 
    through: UserProject, // Modelo intermedio que actúa como puente entre usuarios y proyectos
    foreignKey: 'usuario_id', // Clave foránea desde el modelo de usuarios
    as: 'proyectos' // Alias para referirse a los proyectos asociados a un usuario
});

Project.belongsToMany(User, { 
    through: UserProject, // Modelo intermedio que actúa como puente entre proyectos y usuarios
    foreignKey: 'proyecto_id', // Clave foránea desde el modelo de proyectos
    as: 'usuarios' // Alias para referirse a los usuarios asociados a un proyecto
});

// Relación uno a muchos entre proyectos y administradores
// Utilizamos "belongsTo" para indicar que un proyecto pertenece a un administrador
Project.belongsTo(User, { 
    foreignKey: 'administrador_id', // Clave foránea que conecta el proyecto con el administrador
    as: 'administrador' // Alias para referirse al administrador asociado a un proyecto
});

// Exportar los modelos junto con las relaciones definidas
module.exports = { User, Project, UserProject };

/* 
Recordatorio de los parámetros utilizados:
- "through": Indica el modelo que actúa como puente para la relación entre las dos entidades.
- "foreignKey": Especifica la clave foránea que se utiliza para establecer la relación entre las tablas.
- "as": Define un alias que se utiliza para referirse a la relación en consultas y asociaciones.
*/
