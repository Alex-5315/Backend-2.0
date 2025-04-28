// Importar el servicio de autenticación que contiene la lógica para manejar el inicio de sesión
const authService = require('../services/auth.service');

// Controlador para manejar el inicio de sesión
exports.login = async (req, res) => {
    // "req" (request) contiene la información enviada por el cliente en la solicitud
    // "res" (response) se utiliza para enviar una respuesta al cliente
    const { email, password } = req.body; // Extraer el email y la contraseña del cuerpo de la solicitud (req.body)
    
    try {
        // Llamar al servicio de autenticación para iniciar sesión con el email y la contraseña proporcionados
        const token = await authService.loginUser(email, password);

        // Responder al cliente con un mensaje de éxito y el token generado, junto con un código de estado 200
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        // Si ocurre algún error, responder al cliente con un código de estado 400 (Solicitud incorrecta)
        // y un mensaje que detalla el error
        res.status(400).json({ message: err.message });
    }
};

/* 
Notas adicionales:
- La función está declarada como "async" porque realiza operaciones asíncronas, como llamadas al servicio
de autenticación para verificar los datos de inicio de sesión.
- El uso de "try" permite manejar la lógica principal del controlador, mientras que "catch" captura cualquier 
error que pueda ocurrir y lo maneja apropiadamente, devolviendo una respuesta al cliente.
*/
