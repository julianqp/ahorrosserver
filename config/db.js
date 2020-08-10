const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB Conectada");
  } catch (error) {
    console.log("HUBO UN ERROR");
    console.log(error);
    process.exit(1); // Detiene el proceso
  }
};

module.exports = connectDB;
