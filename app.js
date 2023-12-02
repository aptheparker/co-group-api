const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
require("dotenv").config();

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile))


// MongoDB
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (e) {
    console.error(e);
  }
}
connect();

// Routes
const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
