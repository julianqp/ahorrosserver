// Importamos los modelos
const Usuario = require("../models/Usuario");
const Finanza = require("../models/Finanza");

// importamos las librerias necesarias
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// Funcion que crea un token de autenticacion
const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre, apellido } = usuario;

  return jwt.sign({ id, email, nombre, apellido }, secreta, { expiresIn });
};

const resolvers = {
  Query: {
    obtenerUsuario: async (_, {}, ctx) => {
      if (!ctx.usuario) {
        throw new Error("Falta token usuario");
      }
      const { id } = ctx.usuario;
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        throw new Error("El usuario no existe");
      }
      return usuario;
    },
    obtenerFianza: async (_, { id }, ctx) => {
      // Buscamos la finanza
      const finanza = await Finanza.findById(id);
      if (!finanza) {
        throw new Error("La finanza no existe.");
      }
      // Comprobamos si la finanza pertenece al usuario
      if (finanza.usuario.toString() !== ctx.usuario.id) {
        throw new Error("Credenciales incorrectas para la finanza.");
      }
      return finanza;
    },
    obtenerFinanazasUsuario: async (_, {}, ctx) => {
      // Comprobamos si las credenciales son válidas
      if (!ctx.usuario) {
        throw new Error("Faltan credenciales usuario.");
      }
      // Buscamos las finanzas del usuario
      const finanzas = await Finanza.find({
        usuario: ctx.usuario.id.toString(),
      });

      return finanzas;
    },
    obtenerFinanazasMes: async (_, { mes }, ctx) => {
      // Comprobamos si las credenciales son válidas
      if (!ctx.usuario) {
        throw new Error("Faltan credenciales usuario.");
      }
      // Buscamos las finanzas del usuario
      const finanzas = await Finanza.find({
        usuario: ctx.usuario.id.toString(),
      });

      return finanzas;
    },
  },
  Mutation: {
    nuevoUsuario: async (_, { input }) => {
      const { email, password } = input;
      // Buscamos si el usuario existe
      const existeUsurio = await Usuario.findOne({ email });
      if (existeUsurio) {
        throw new Error("El usuario ya está registrado.");
      }
      // Encriptamos la password
      const salto = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salto);
      try {
        // Creamos el usuario y lo almacenamos y lo guardamos en la base de datos
        const usuario = new Usuario(input);
        usuario.save();
        return usuario;
      } catch (error) {
        // En caso de error devolvemos el error
        throw new Error(error);
      }
    },
    login: async (_, { email, password }) => {
      // Buscamos si el usuario existe
      const existeUsuario = await Usuario.findOne({ email });

      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }
      // Comprobamos si la contraseña es correcta
      const isCorrectPass = await bcryptjs.compare(
        password,
        existeUsuario.password
      );
      if (!isCorrectPass) {
        throw new Error("La contraseña es incorrecta");
      }
      // Creamos un nuevo token para el usuario
      const token = crearToken(existeUsuario, process.env.SECRETA, "24h");
      return { token };
    },
    nuevaFinanza: async (_, { input }, ctx) => {
      if (!ctx.usuario) {
        throw new Error("Credenciales de usuarios incorrectas.");
      }

      let newFinanza = new Finanza(input);
      newFinanza.usuario = ctx.usuario.id;
      newFinanza = await newFinanza.save();

      return newFinanza;
    },
    editarFinanza: async (_, { id, input }, ctx) => {
      // Buscamos la finanza
      let finanza = await Finanza.findById(id);
      if (!finanza) {
        throw new Error("Finanza no encontrada.");
      }
      if (finanza.usuario.toString() !== ctx.usuario.id) {
        throw new Error("Credenciales incorrectas para la finanza.");
      }
      // Actualizamos las finanzas con los nuevos datos
      finanza = await Finanza.findByIdAndUpdate({ _id: id }, input, {
        new: true,
      });
      return finanza;
    },
    eliminarFinanza: async (_, { id }, ctx) => {
      // Buscamos si la finanza existe
      const finanza = await Finanza.findById(id);
      if (!finanza) {
        throw new Error("Finanza no encontrada.");
      }
      // Comprobamos si el esuario tiene permisos para la finanza
      if (finanza.usuario.toString() !== ctx.usuario.id) {
        throw new Error("Credenciales incorrectas para la finanza.");
      }
      await Finanza.findOneAndDelete({ _id: id });
      return "Finanza eliminada.";
    },
  },
};

module.exports = resolvers;
