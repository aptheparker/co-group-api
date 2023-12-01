const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/", UserController.createUser);
router.get("/:userId", UserController.getUser);
router.put("/:userId", UserController.updateUser);

module.exports = router;
