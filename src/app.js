// Carga variables de entorno desde .env (como la URI de MongoDB y el puerto)
require('dotenv').config();

// Framework principal para construir la API
const express = require('express');

// Librería para permitir peticiones de otros orígenes (Cross-Origin Resource Sharing)
const cors = require('cors');

// Cliente oficial de MongoDB para Node.js (se usará en db.js)
const mongoose = require('mongoose');

// Para cargar documentación Swagger en formato YAML
const fs = require('fs');
const yaml = require('yaml');

// Middleware para mostrar Swagger UI
const swaggerUi = require('swagger-ui-express');

// Archivo externo para conectar a la base de datos
const connectDB = require('./config/db');

// Archivo de rutas del microservicio
const labTestRoutes = require('./routes/labTest.routes');

// Inicializa la app de Express
const app = express();

// --------------------- MIDDLEWARES ---------------------

// Permite recibir JSON en las peticiones
app.use(express.json());

// Permite conexiones desde cualquier origen (útil para el orquestador u otros microservicios)
app.use(cors());

// ------------------ CONEXIÓN A MONGODB -----------------

// Llama a la función que conecta con MongoDB (definida en src/config/db.js)
connectDB();

// ---------------------- RUTAS API ----------------------

// Carga todas las rutas relacionadas con exámenes de laboratorio
// Estas estarán disponibles bajo /api/lab-tests
app.use('/api/lab-tests', labTestRoutes);

// ------------------- DOCUMENTACIÓN SWAGGER -------------

// Carga el archivo YAML que define la documentación de la API
const swaggerFile = fs.readFileSync('./swagger/swagger.yaml', 'utf8');
const swaggerDocument = yaml.parse(swaggerFile);

// Muestra la documentación Swagger en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// -------------------- SERVIDOR -------------------------

// Usa el puerto definido en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;

// Inicia el servidor y escucha en el puerto
app.listen(PORT, () => {
  console.log(`✅ Microservicio de Exámenes de Laboratorio corriendo en el puerto ${PORT}`);
});
