const express = require("express");
const app = express();

const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
