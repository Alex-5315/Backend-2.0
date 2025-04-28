// Importar el servicio de proyectos que contiene la lógica para gestionar operaciones relacionadas con los proyectos
const projectService = require('../services/project.service');

// Controlador para crear nuevos proyectos
exports.createProject = async (req, res) => {
    try {
        // Extraer los datos necesarios del cuerpo de la solicitud (nombre, descripción y administrador_id)
        const { nombre, descripcion, administrador_id } = req.body;

        // Llamar al servicio para crear un nuevo proyecto con los datos proporcionados
        const newProject = await projectService.createProject(nombre, descripcion, administrador_id);

        // Responder al cliente con un código de estado 201 (Creado) y el proyecto recién creado
        res.status(201).json({ message: 'Proyecto creado con éxito', newProject });
    } catch (err) {
        // En caso de error, enviar un código de estado 500 (Error interno del servidor) con el mensaje del error
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener todos los proyectos, incluidos el administrador y los usuarios asociados
exports.getAllProjects = async (req, res) => {
    try {
        // Llamar al servicio para obtener todos los proyectos
        const projects = await projectService.getAllProjects();

        // Responder al cliente con un código de estado 200 (Éxito) y la lista de proyectos
        res.status(200).json({ message: 'Proyectos obtenidos con éxito', projects });
    } catch (err) {
        // En caso de error, enviar un código de estado 500 con el mensaje del error
        res.status(500).json({ message: err.message });
    }
};

// Controlador para asociar usuarios a un proyecto
exports.assingUsersToProject = async (req, res) => {
    try {
        // Extraer los datos enviados en el cuerpo de la solicitud
        const data = req.body;

        // Llamar al servicio para asignar los usuarios al proyecto correspondiente
        const project = await projectService.assingUsersToProject(data);

        // Responder al cliente con un código de estado 200 y el proyecto actualizado
        res.status(200).json({ message: 'Usuarios asignados al proyecto con éxito', project });
    } catch (err) {
        // En caso de error, enviar un código de estado 500 con el mensaje del error
        res.status(500).json({ message: err.message });
    }
};

// Controlador para desasociar usuarios de un proyecto
exports.removeUserFromProject = async (req, res) => {
    try {
        // Extraer los datos enviados en el cuerpo de la solicitud
        const data = req.body;

        // Llamar al servicio para eliminar los usuarios del proyecto especificado
        const result = await projectService.removeUserFromProject(data);

        // Responder al cliente con un código de estado 200 y el resultado de la operación
        res.status(200).json({ message: 'Usuario eliminado del proyecto con éxito', result });
    } catch (err) {
        // En caso de error, enviar un código de estado 500 con el mensaje del error
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

        // Responder al cliente con un código de estado 200 y el proyecto obtenido
        res.status(200).json({ message: 'Proyecto obtenido con éxito', project });
    } catch (err) {
        // En caso de error, enviar un código de estado 500 con el mensaje del error
        res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar un proyecto existente
exports.updateProject = async (req, res) => {
    try {
        // Extraer el ID del proyecto desde los parámetros de la URL
        const id = req.params.id;

        // Extraer los datos necesarios desde el cuerpo de la solicitud (nombre, descripción y administrador_id)
        const { nombre, descripcion, administrador_id } = req.body;

        // Llamar al servicio para actualizar el proyecto con los datos proporcionados
        const project = await projectService.updateProject(id, nombre, descripcion, administrador_id);

        // Responder al cliente con un código de estado 200 y el proyecto actualizado
        res.status(200).json({ message: 'Proyecto actualizado con éxito', project });
    } catch (err) {
        // En caso de error, enviar un código de estado 500 con el mensaje del error
        res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un proyecto por su ID
exports.deleteProject = async (req, res) => {
    try {
        // Extraer el ID del proyecto desde los parámetros de la URL
        const id = req.params.id;

        // Llamar al servicio para eliminar el proyecto especificado
        const result = await projectService.deleteProject(id);

        // Responder al cliente con un código de estado 200 y el resultado de la operación
        res.status(200).json(result);
    } catch (err) {
        // En caso de error, enviar un código de estado 500 con el mensaje del error
        res.status(500).json({ message: err.message });
    }
};
