// importamos el servicio de auntenticacion
const authService = require('../services/auth.service');

// Controlador para el Inicio sesión
exports.login = async (req, res) => {  // "req" contiene la solicitud del cliente con sus datos y "res" sirve para enviar respuestas ha esa solicitud
    const { email, password } = req.body; // el "req.body" contiene los datos enviados por el cliente
    try{ // "try" Si no hay problema con la solicitud
        const token = await authService.loginUser(email, password);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) { // "catch" Si hay problema con la solicitud
        res.status(400).json({ message: err.message});
    }
};

/* El "async" declara que la función es asíncrona. Esto permite utilizar la palabra clave "await" dentro de la función,
para manejar operaciones que toman tiempo (como consultas a la base de datos o llamadas a las APIs),
y recibir el resultado antes de continuar.*/