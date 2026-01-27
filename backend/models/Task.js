const mongoose = require('mongoose');

// Definimos el Esquema (El plano de construcción de nuestros datos)
const TaskSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'] // Validación estricta 
    },
    tecnologia: {
        type: String,
        required: true,
        // Podemos añadir un enum si quisiéramos limitar las tecnologías permitidas, 
        // pero por ahora lo dejaremos abierto como pide el ejemplo (Java, JS, etc.) 
    },
    estado: {
        type: String, 
        enum: ['pending', 'completed'], // Limitamos los valores permitidos (Ingeniería robusta)
        default: 'pending' // Por defecto, toda tarea nace pendiente 
    },
    fecha: {
        type: Date,
        default: Date.now // Se pone la fecha actual automáticamente 
    }
});

// Exportamos el modelo para usarlo en el resto de la app
module.exports = mongoose.model('Task', TaskSchema);