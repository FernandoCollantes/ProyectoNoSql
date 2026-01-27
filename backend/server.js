require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON y permitir CORS
app.use(express.json()); // Fundamental para leer los datos que envíe el usuario
app.use(cors());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes); // Todo lo que llegue a /api/tasks se va a taskRoutes

// Conexión a MongoDB Atlas (RA3.c)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1); // Detiene la app si no hay base de datos
    }
};

// Iniciar servidor solo si la conexión a DB es exitosa
connectDB().then(() => {
    
    app.listen(PORT, () => {
        console.log(`Servidor Ingeniería corriendo en http://localhost:${PORT}`);
    });
});