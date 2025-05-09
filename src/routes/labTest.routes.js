const express = require('express');
const router = express.Router();

// Importamos el controlador
const labTestController = require('../controllers/labTest.controllers');

// Rutas del microservicio

// Crear un nuevo examen
router.post('/', labTestController.crearExamen);

// Obtener todos los exámenes
router.get('/', labTestController.obtenerExamenes);

// Obtener un examen por ID
router.get('/:id', labTestController.obtenerExamenPorId);

// Actualizar un examen por ID
router.put('/:id', labTestController.actualizarExamen);

// Eliminar un examen por ID
router.delete('/:id', labTestController.eliminarExamen);

module.exports = router;
