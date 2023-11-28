const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.get("/", UserController.getUser);
router.put("/", UserController.updateUser);

module.exports = router;