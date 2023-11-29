const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
require("dotenv").config();
const { MONGO_URI } = process.env;

// Swagger
const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

const mongoose = require("mongoose");
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
