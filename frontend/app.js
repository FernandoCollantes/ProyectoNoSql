// Constante para la URL de nuestra API (El puerto de tu backend)
const API_URL = 'http://localhost:3000/api/tasks';

// Seleccionamos los elementos del DOM (HTML) que vamos a manipular
const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');

// 1. Función para Cargar y Mostrar Tareas (GET)
// Esta función se ejecuta al cargar la página y cada vez que hay cambios
async function loadTasks() {
    try {
        const response = await fetch(API_URL); // Petición al Backend
        const tasks = await response.json();   // Convertimos la respuesta a JSON
        
        // Limpiamos la lista actual para no duplicar
        tasksList.innerHTML = '';

        // Si no hay tareas, mostramos mensaje
        if (tasks.length === 0) {
            tasksList.innerHTML = '<p class="empty-message">No hay tareas pendientes. ¡Buen trabajo!</p>';
            return;
        }

        // Recorremos cada tarea y creamos su HTML
        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'task-card';
            
            // Creamos el contenido de la tarjeta
            card.innerHTML = `
                <div class="task-info">
                    <h3>${task.titulo}</h3>
                    <div class="task-meta">
                        <span class="tech-tag">Target: ${task.tecnologia}</span> | 
                        <span>Estado: ${task.estado}</span>
                    </div>
                </div>
                <button class="btn-delete" onclick="deleteTask('${task._id}')">Eliminar</button>
            `;
            
            tasksList.appendChild(card);
        });

    } catch (error) {
        console.error('Error cargando tareas:', error);
        tasksList.innerHTML = '<p class="error">Error de conexión con el servidor.</p>';
    }
}

// 2. Evento para Crear Nueva Tarea (POST)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue (SPA feeling)

    // Capturamos los datos del formulario
    const titulo = document.getElementById('titulo').value;
    const tecnologia = document.getElementById('tecnologia').value;

    const newTask = { titulo, tecnologia };

    try {
        // Enviamos los datos al Backend
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Decimos que enviamos JSON
            },
            body: JSON.stringify(newTask)
        });

        // Limpiamos el formulario y recargamos la lista
        taskForm.reset();
        loadTasks(); 

    } catch (error) {
        console.error('Error creando tarea:', error);
        alert('Hubo un error al guardar la tarea');
    }
});

// 3. Función para Eliminar Tarea (DELETE)
// Nota: Esta función es llamada desde el botón HTML que creamos arriba
async function deleteTask(id) {
    if(!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        // Recargamos la lista para ver que desapareció
        loadTasks();
    } catch (error) {
        console.error('Error eliminando tarea:', error);
    }
}

// Inicializamos la app cargando las tareas al principio
document.addEventListener('DOMContentLoaded', loadTasks);