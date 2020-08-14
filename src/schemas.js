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
    usuario: ID
    fecha: String
    mensualidad: ID
    creado: String
  }

  type Mensualidad {
    id: ID
    concepto: String
    cantidad: Float
    tipo: TipoFianza
    etiqueta: String
    inicio: String
    fin: String
    usuario: ID
    dia: Int
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
    fecha: String!
  }

  input MensualidadInput {
    concepto: String!
    cantidad: Float!
    tipo: TipoFianza!
    etiqueta: String!
    inicio: String!
    fin: String
    dia: Int!
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
    obtenerFinanzasUsuario: [Finanza]
    # Obtener finanzas de un usuario por mes
    obtenerFinanzasMes(mes: Int!): [Finanza]
    ## MENSUALIDAD
    #Obtener mensualidades de un usuario
    obtenerMensualidadesUsuario: [Mensualidad]
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

    # Actulizar info Perfil
    actulizarInfoUser(clave: String!): Boolean

    ## MENSUALIDAD
    # Creación de una mensualidad
    nuevaMensualidad(input: MensualidadInput!): Mensualidad
    # Editar mensualidad
    editarMensualidad(id: ID!, input: MensualidadInput!): Mensualidad
    # Eliminar mensualidad
    eliminarMensualidad(id: ID!): String
  }
`;

module.exports = typeDefs;
