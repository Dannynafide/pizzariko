const mongoose = require("mongoose");
require("../loadEnvironment.js");

async function dbConnect() {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      process.exit();
    });
}

module.exports = dbConnect;
