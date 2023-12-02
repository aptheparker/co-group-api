const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json

require("dotenv").config();
const { PORT, MONGO_URI } = process.env;

// Swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// MongoDB
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
const semesterRoutes = require("./routes/SemesterRoute");
const memberRoutes = require("./routes/MemberRoute");
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/semester", semesterRoutes);
app.use("/member", memberRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
