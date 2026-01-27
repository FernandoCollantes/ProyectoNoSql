const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); 

// 1. GET /api/tasks - Obtener todas las tareas [cita: 36]
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Busca todo en MongoDB
        res.status(200).json(tasks); // Responde con JSON y código 200 (OK)
    } catch (error) {
        res.status(500).json({ message: error.message }); // Error del servidor
    }
});

// 2. POST /api/tasks - Crear una nueva tarea [cita: 36]
router.post('/', async (req, res) => {
    // req.body contiene los datos que envía el frontend
    const task = new Task({
        titulo: req.body.titulo,
        tecnologia: req.body.tecnologia,
        estado: 'pending' // Forzamos estado inicial
    });

    try {
        const newTask = await task.save(); // Guarda en Atlas
        res.status(201).json(newTask); // 201 significa "Created" (Importante para RA2)
    } catch (error) {
        res.status(400).json({ message: error.message }); // 400 si faltan datos
    }
});

// 3. DELETE /api/tasks/:id - Eliminar una tarea [cita: 37]
router.delete('/:id', async (req, res) => {
    try {
        // Buscamos por ID y borramos
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        
        res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;