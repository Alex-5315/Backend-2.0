// Importar el servicio de proyectos, que contiene las funciones para gestionar proyectos
const projectService = require('../services/project.service');

// Controlador para crear nuevos proyectos
exports.createProject = async (req, res) => {
    try {
        // Extraer los datos necesarios del cuerpo de la solicitud (nombre, descripción y administrador)
        const { nombre, descripcion, administrador_id } = req.body;

        // Llamar al servicio para crear un proyecto con los datos proporcionados
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id);

        // Responder al cliente con el proyecto creado y un código de estado 201 (Creado)
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500 (Error interno del servidor)
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos, incluyendo el administrador y los usuarios asociados
exports.getAllProjects = async (req, res) => {
    try {
        // Llamar al servicio para obtener todos los proyectos
        const projects = await projectService.getAllProjects();

        // Responder al cliente con la lista de proyectos y un código de estado 200 (Éxito)
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para asociar usuarios a un proyecto
exports.assingUsersToProject = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud (IDs de usuarios y proyecto)
        const data = req.body;

        // Llamar al servicio para asociar los usuarios al proyecto
        const project = await projectService.assingUsersToProject(data);

        // Responder al cliente con el proyecto actualizado y un código de estado 200
        res.status(200).json({ message: 'Usuarios asignados al proyecto con éxito', project });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para desasociar usuarios de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud (IDs de usuario y proyecto)
        const data = req.body;

        // Llamar al servicio para desasociar el usuario del proyecto
        const result = await projectService.removeUserFromProject(data);

        // Responder al cliente con un mensaje de éxito y un código de estado 200
        res.status(200).json({ message: 'Usuario eliminado del proyecto con éxito', result });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un proyecto por su ID
exports.getProjectById = async (req, res) => {
    try {
        // Extraer el ID del proyecto desde los parámetros de la URL
        const id = req.params.id;

        // Llamar al servicio para obtener el proyecto con el ID proporcionado
        const project = await projectService.getProjectById(id);

        // Responder al cliente con el proyecto obtenido y un código de estado 200
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un proyecto existente
exports.updateProject = async (req, res) => {
    try {
        // Extraer el ID del proyecto desde los parámetros de la URL
        const id = req.params.id;

        // Extraer los datos necesarios del cuerpo de la solicitud (nombre, descripción y administrador)
        const { nombre, descripcion, administrador_id } = req.body;

        // Llamar al servicio para actualizar el proyecto con los nuevos datos
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);

        // Responder al cliente con el proyecto actualizado y un código de estado 200
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un proyecto por su ID
exports.deleteProject = async (req, res) => {
    try {
        // Extraer el ID del proyecto desde los parámetros de la URL
        const id = req.params.id;

        // Llamar al servicio para eliminar el proyecto con el ID proporcionado
        const result = await projectService.deleteProject(id);

        // Responder al cliente con un mensaje de éxito y un código de estado 200
        res.status(200).json(result);
    } catch (err) {
        // En caso de error, responder al cliente con un código de estado 500
        res.status(500).json({ message: err.message });
    }
};
