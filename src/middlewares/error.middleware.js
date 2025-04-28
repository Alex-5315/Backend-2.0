// Definir un middleware de manejo de errores
// Este middleware se utiliza para capturar y gestionar cualquier error que ocurra en la aplicación
const errorHandler = (err, req, res, next) => {
    // Imprimir el stack trace del error en la consola para propósitos de depuración
    console.error(err.stack);

    // Enviar una respuesta al cliente con un código de estado 500 (Error interno del servidor)
    // Incluye un mensaje genérico "Algo salió mal" y el mensaje específico del error para mayor contexto
    res.status(500).json({ 
        message: 'Algo salió mal', // Mensaje genérico para el cliente
        error: err.message // Mensaje específico del error, útil para identificar el problema
    });
};

// Exportar el middleware para que pueda ser utilizado en otras partes de la aplicación
module.exports = errorHandler;

// https:localhost:3000/api/v1/auth/login
// como generar el token de postman usando javaScrip

