const { ApolloServer } = require("apollo-server");
const typeDefs = require("./src/schemas");
const resolvers = require("./src/resolvers");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

// Conectar a la base de datos
connectDB();

// servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    let token = req.headers["authorization"] || "";
    token = token.replace("Bearer ", "");
    if (token) {
      try {
        const palabra = process.env.SECRETA;
        const usuario = jwt.verify(token, palabra);
        return {
          usuario,
        };
      } catch (error) {
        console.log(error);
      }
    }
    return {};
  },
});

//Srrancar el servidor
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
