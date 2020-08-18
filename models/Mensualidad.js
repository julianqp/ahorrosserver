const mongoose = require("mongoose");

const MensualidadModel = mongoose.Schema({
  concepto: {
    type: String,
    required: true,
    trim: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
  },
  etiqueta: {
    type: String,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  dia: {
    type: Number,
    required: true,
  },
  inicio: {
    type: String,
    required: true,
  },
  fin: {
    type: String,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Mensualidad", MensualidadModel);
