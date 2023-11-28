const express = require("express");
const app = express();

const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

const authRoutes = require("./routes/AuthRoute");
const userRoutes = require("./routes/UserRoute");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
