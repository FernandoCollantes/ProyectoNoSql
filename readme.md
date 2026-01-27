# 🛠️ ProyectoNoSql - DevTask Tracker

**Actividad: "El Monolito Artesanal"**
Aplicación FullStack para la gestión de tareas de desarrollo, diseñada para demostrar la integración completa entre un cliente web nativo y una base de datos NoSQL en la nube.

---

## 🚀 Descripción del Proyecto

Este proyecto es una solución de ingeniería web que conecta "el clic del usuario con el byte en el disco". Se ha desarrollado evitando el uso de frameworks de frontend (como React o Angular) para garantizar un dominio profundo de los estándares web nativos y la manipulación del DOM.

**Funcionalidades Principales:**
* **CRUD Completo:** Creación, Lectura, Actualización (estado) y Eliminado de tareas.
* **Persistencia Cloud:** Conexión segura con MongoDB Atlas.
* **API RESTful:** Backend estructurado en Node.js y Express.
* **Interfaz Reactiva:** Frontend dinámico utilizando Vanilla JavaScript y Fetch API.

---

## 💻 Tecnologías Utilizadas

### Backend (Servidor)
* **Runtime:** Node.js
* **Framework:** Express.js
* **ODM:** Mongoose (Modelado de datos)
* **Seguridad:** Dotenv (Gestión de variables de entorno) y CORS

### Frontend (Cliente)
* **HTML5 Semántico:** Estructura limpia y accesible.
* **CSS3:** Diseño responsivo con Flexbox/Grid y variables CSS.
* **JavaScript (ES6+):** Lógica asíncrona (`async/await`) y manipulación del DOM.

### Base de Datos
* **MongoDB Atlas:** Cluster M0 (Sandbox).

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para desplegar el proyecto en local:

### 1. Clonar el Repositorio
```bash
git clone [https://github.com/FernandoCollantes/ProyectoNoSql.git](https://github.com/FernandoCollantes/ProyectoNoSql.git)
cd ProyectoNoSql
2. Configurar el Backend
Navega a la carpeta del servidor e instala las dependencias:

Bash
cd backend
npm install
3. Variables de Entorno (.env)
Por seguridad, las credenciales no están en el repositorio. Debes crear un archivo .env dentro de la carpeta backend con el siguiente contenido:

Fragmento de código
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<tu-cluster>.mongodb.net/devtasktracker?retryWrites=true&w=majority
(Reemplaza <usuario>, <password> y <tu-cluster> con tus credenciales de MongoDB Atlas).

▶️ Ejecución
Paso 1: Arrancar el Servidor
Desde la terminal, dentro de la carpeta backend:

Bash
node server.js
Deberás ver el mensaje: ✅ Conexión exitosa a MongoDB Atlas

Paso 2: Abrir el Cliente
No es necesario un servidor de frontend. Simplemente:

Ve a la carpeta frontend.

Haz doble clic en el archivo index.html o ábrelo con tu navegador preferido.

📂 Estructura del Proyecto
Plaintext
ProyectoNoSql/
├── backend/            # Lógica del servidor
│   ├── models/         # Esquemas de Mongoose (Task.js)
│   ├── routes/         # Endpoints de la API (taskRoutes.js)
│   ├── server.js       # Punto de entrada y conexión DB
│   └── package.json    # Dependencias del proyecto
│
├── frontend/           # Interfaz de usuario
│   ├── index.html      # Estructura HTML
│   ├── style.css       # Estilos visuales
│   └── app.js          # Lógica Fetch y DOM
│
└── README.md           # Documentación
👤 Autor
Fernando Collantes Desarrollador FullStack en formación. Proyecto realizado para el módulo de BBDD NoSQL - 2026.