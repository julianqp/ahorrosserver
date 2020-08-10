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
  isMensual: {
    type: Boolean,
    default: false,
    required: true,
  },
  inicio: {
    type: String,
  },
  fin: {
    type: String,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Finanza", FinanzaModel);
