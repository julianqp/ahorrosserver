const { gql } = require("apollo-server");

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    apellidos: String
    email: String
    saldo: Float
    creado: String
  }

  type Finanza {
    id: ID
    concepto: String
    cantidad: Float
    tipo: TipoFianza
    etiqueta: String
    isMensual: Boolean
    inicio: String
    fin: String
    usuario: ID
    fecha: String
    creado: String
  }

  type Token {
    token: String
  }

  input UsuarioInput {
    nombre: String
    apellidos: String
    email: String
    password: String
    saldo: Float
  }

  input FinanzaInput {
    concepto: String!
    cantidad: Float!
    tipo: TipoFianza!
    etiqueta: String!
    isMensual: Boolean!
    inicio: String
    fin: String
    fecha: String
  }

  enum TipoFianza {
    GASTO
    INGRESO
  }

  type Query {
    ## USUARIO
    # Obtener un usuario
    obtenerUsuario: Usuario

    ## FINANZA
    # Obtención de una finanza
    obtenerFianza(id: ID!): Finanza
    # Obtener finanzas de un usuario
    obtenerFinanazasUsuario: [Finanza]
    # Obtener finanzas de un usuario por mes
    obtenerFinanazasMes(mes: Int!): [Finanza]
  }
  type Mutation {
    ## USUARIO
    # Creación de nuevo usuario
    nuevoUsuario(input: UsuarioInput!): Usuario
    # Login
    login(email: String!, password: String!): Token

    ## FINANZA
    # Creación de una finanza
    nuevaFinanza(input: FinanzaInput!): Finanza
    # Editar finanza
    editarFinanza(id: ID!, input: FinanzaInput!): Finanza
    # Eliminar finanza
    eliminarFinanza(id: ID!): String
  }
`;

module.exports = typeDefs;
