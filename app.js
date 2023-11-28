const express = require("express");
const app = express();
app.use(express.json()); // for parsing application/json
require("dotenv").config();

// Swagger
const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));

const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URL;
  const client = new MongoClient(uri);

  try {
    await client.connect()
    console.log("Database Connected");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// Routes
const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
