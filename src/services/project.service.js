// Importar el modelo de Proyecto y Usuario desde los archivos correspondientes
const Project = require('../models/project.model');
const User = require('../models/user.model');

// Servicio para crear un nuevo proyecto en la base de datos
exports.createProject = async (nombre, descripcion, administrador_id) => {
    try {
        // Crear un nuevo proyecto con los datos proporcionados
        const newProject = await Project.create({
            nombre,
            descripcion,
            administrador_id
        });

        return newProject; // Retorna el proyecto creado
    } catch (err) {
        // Lanza un error si ocurre algún problema durante la creación
        throw new Error(`Error al crear el proyecto: ${err.message}`);
    }
};

// Servicio para obtener todos los proyectos junto con el administrador y los usuarios asociados
exports.getAllProjects = async () => {
    try {
        // Buscar todos los proyectos incluyendo su administrador y los usuarios relacionados
        const projects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'administrador', // Relación con el administrador del proyecto
                    attributes: ['id', 'nombre', 'email'] // Atributos del administrador
                },
                {
                    model: User,
                    as: 'usuarios', // Relación con los usuarios asociados al proyecto
                    attributes: ['id', 'nombre', 'email'], // Atributos de los usuarios
                    through: { attributes: [] } // Excluir atributos de la tabla intermedia
                }
            ]
        });
        return projects; // Retorna todos los proyectos encontrados
    } catch (err) {
        // Lanza un error si ocurre algún problema al obtener los proyectos
        throw new Error(`Error al obtener los proyectos: ${err.message}`);
    }
};

// Servicio para obtener un proyecto por su ID
exports.getProjectById = async (id) => {
    try {
        // Buscar un proyecto en la base de datos por su ID
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanzar error si el proyecto no existe
        }
        return project; // Retorna el proyecto encontrado
    } catch (err) {
        // Lanza un error si ocurre algún problema al obtener el proyecto
        throw new Error(`Error al obtener el proyecto: ${err.message}`);
    }
};

// Servicio para asociar usuarios a un proyecto mediante IDs
exports.assingUsersToProject = async (data) => {
    // Buscar el proyecto por su ID
    const project = await Project.findByPk(data.projectId);
    if (!project) throw new Error('Proyecto no encontrado'); // Lanzar error si el proyecto no existe
    
    // Buscar los usuarios por sus IDs
    const users = await User.findAll({ where: { id: data.userIds } });
    if (users.length !== data.userIds.length) throw new Error('Algunos usuarios no fueron encontrados'); // Verificar que todos los usuarios existan

    // Asociar los usuarios al proyecto
    await project.addUsuarios(users);

    // Recargar el proyecto con la información actualizada incluyendo los usuarios asociados
    return await project.reload({
        include: [
            {
                model: User,
                as: 'usuarios',
                attributes: ['id', 'nombre', 'email'],
                through: { attributes: [] }
            }
        ]
    });
};

// Servicio para desasociar un usuario de un proyecto
exports.removeUserFromProject = async (data) => {
    // Buscar el proyecto por su ID
    const project = await Project.findByPk(data.projectId);
    if (!project) 
        throw new Error('Proyecto no encontrado'); // Lanzar error si el proyecto no existe

    // Buscar el usuario por su ID
    const user = await User.findByPk(data.userId);
    if (!user) 
        throw new Error('Usuario no encontrado'); // Lanzar error si el usuario no existe

    // Desasociar el usuario del proyecto
    await project.removeUsuario(user); // Utiliza el método `removeUsuario` de Sequelize para desasociar
};

// Servicio para actualizar los datos de un proyecto existente
exports.updateProject = async (id, nombre, descripcion, administrador_id) => {
    try {
        // Buscar el proyecto por su ID
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanzar error si el proyecto no existe
        }

        // Actualizar los datos del proyecto con los nuevos valores proporcionados
        await project.update({
            nombre,
            descripcion,
            administrador_id
        });

        return project; // Retorna el proyecto actualizado
    } catch (err) {
        // Lanza un error si ocurre algún problema durante la actualización
        throw new Error(`Error al actualizar el proyecto: ${err.message}`);
    }
};

// Servicio para eliminar un proyecto por su ID
exports.deleteProject = async (id) => {
    try {
        // Buscar el proyecto por su ID
        const project = await Project.findByPk(id);
        if (!project) {
            throw new Error('Proyecto no encontrado'); // Lanzar error si el proyecto no existe
        }
        
        // Eliminar el proyecto de la base de datos
        await project.destroy();
        return { message: 'Proyecto eliminado con éxito' }; // Retorna un mensaje de éxito
    } catch (err) {
        // Lanza un error si ocurre algún problema durante la eliminación
        throw new Error(`Error al eliminar el proyecto: ${err.message}`);
    }
};
