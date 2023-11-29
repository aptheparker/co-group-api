const mongoose = require("mongoose");
const User = require("../models/models");
require("dotenv").config();

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ userId: userId });

  res.send(`Get user route ${user}`);
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, age, username, password } = req.body;

  res.send(`Update user route ${userId} ${name} ${age} ${username} ${password}`);
};
