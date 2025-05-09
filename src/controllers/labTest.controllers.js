const LabTest = require('../models/labTest.models');

// Crear un nuevo examen
exports.crearExamen = async (req, res) => {
  try {
    const nuevoExamen = new LabTest(req.body);
    await nuevoExamen.save();
    res.status(201).json(nuevoExamen);
  } catch (error) {
    console.error('Error al crear examen:', error);
    res.status(500).json({ mensaje: 'Error al crear el examen' });
  }
};

// Obtener todos los exámenes
exports.obtenerExamenes = async (req, res) => {
  try {
    const examenes = await LabTest.find();
    res.status(200).json(examenes);
  } catch (error) {
    console.error('Error al obtener exámenes:', error);
    res.status(500).json({ mensaje: 'Error al obtener los exámenes' });
  }
};

// Obtener un examen por ID
exports.obtenerExamenPorId = async (req, res) => {
  try {
    const examen = await LabTest.findById(req.params.id);
    if (!examen) {
      return res.status(404).json({ mensaje: 'Examen no encontrado' });
    }
    res.status(200).json(examen);
  } catch (error) {
    console.error('Error al obtener examen por ID:', error);
    res.status(500).json({ mensaje: 'Error al obtener el examen' });
  }
};

// Actualizar un examen por ID
exports.actualizarExamen = async (req, res) => {
  try {
    const examenActualizado = await LabTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Devuelve el nuevo documento actualizado
    );
    if (!examenActualizado) {
      return res.status(404).json({ mensaje: 'Examen no encontrado' });
    }
    res.status(200).json(examenActualizado);
  } catch (error) {
    console.error('Error al actualizar examen:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el examen' });
  }
};

// Eliminar un examen por ID
exports.eliminarExamen = async (req, res) => {
  try {
    const examenEliminado = await LabTest.findByIdAndDelete(req.params.id);
    if (!examenEliminado) {
      return res.status(404).json({ mensaje: 'Examen no encontrado' });
    }
    res.status(200).json({ mensaje: 'Examen eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar examen:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el examen' });
  }
};
