const mongoose = require('mongoose');

// Esquema para los parámetros del resultado del examen
const ParametroSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  valor: {
    type: String,
    required: true,
  },
  unidad: {
    type: String,
    required: true,
  }
}, { _id: false }); // No se necesita _id para subdocumentos

// Esquema principal del examen de laboratorio
const LabTestSchema = new mongoose.Schema({
  paciente_id: {
    type: String,
    required: true, // Es obligatorio vincularlo a un paciente
  },
  tipo_examen: {
    type: String,
    required: true,
  },
  fecha_examen: {
    type: Date,
    required: true,
  },
  resultado: {
    parametros: {
      type: [ParametroSchema], // Lista de parámetros medidos
      required: true,
    },
    observaciones: {
      type: String,
    }
  },
  estado: {
    type: String,
    enum: ['pendiente', 'completado', 'cancelado'], // Solo estos valores permitidos
    default: 'pendiente'
  },
  fecha_registro: {
    type: Date,
    default: Date.now, // Se registra automáticamente al crear el documento
  }
});

// Exporta el modelo para poder utilizarlo en controladores y servicios
module.exports = mongoose.model('LabTest', LabTestSchema);
