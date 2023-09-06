const express = require("express");
const app = express();
const cors = require("cors");

require("./loadEnvironment.js");
const dbConnect = require("./config/mongoDbConnect.js");
const pizza = require("./routes/pizzaRoutes.js");
const ingredient = require("./routes/ingredientRoutes.js");
const operation = require("./routes/operationRoutes.js");

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

// Available Routes
app.use("/api/pizza", pizza);
app.use("/api/ingredient", ingredient);
app.use("/api/operation", operation);

dbConnect();

app.get("/", (req, res) => {
  res.send("Server is working properly.");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
