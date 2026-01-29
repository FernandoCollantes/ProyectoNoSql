// Constante para la URL de nuestra API (El puerto de tu backend)
const API_URL = 'http://localhost:3000/api/tasks';

// Seleccionamos los elementos del DOM (HTML) que vamos a manipular
const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');

// --- ICONOS SVG (Vectores Profesionales) ---
const ICONS = {
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    undo: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`
};

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
            // Añadimos clase condicional si está completada
            const isCompleted = task.estado === 'completed';
            card.className = `task-card ${isCompleted ? 'completed-task' : ''}`;
            
            // Formateamos la fecha a formato local (ej: 27/1/2026)
            const fechaFormateada = new Date(task.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            // Generamos el HTML interno con los nuevos ICONOS SVG
            card.innerHTML = `
                <div class="task-info">
                    <h3>${task.titulo}</h3>
                    <div class="task-meta">
                        <span class="tech-tag">${task.tecnologia}</span>
                        <span class="date-tag">📅 ${fechaFormateada}</span>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn-icon btn-toggle" onclick="toggleTask('${task._id}')" title="${isCompleted ? 'Desmarcar' : 'Completar'}">
                        ${isCompleted ? ICONS.undo : ICONS.check}
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteTask('${task._id}')" title="Eliminar">
                        ${ICONS.trash}
                    </button>
                </div>
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

// 4. Función para Cambiar Estado (UPDATE)
async function toggleTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH' // Usamos el nuevo método que creamos
        });
        loadTasks(); // Recargamos para ver el cambio
    } catch (error) {
        console.error('Error actualizando tarea:', error);
    }
}

// Inicializamos la app cargando las tareas al principio
document.addEventListener('DOMContentLoaded', loadTasks);