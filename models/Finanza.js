const mongoose = require("mongoose");

const FinanzaModel = mongoose.Schema({
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
  fecha: {
    type: Date,
    required: true,
  },
  mensualidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mensualidad",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Finanza", FinanzaModel);
