const mongoose = require("mongoose");
const { User, Semester } = require("../models/models");
require("dotenv").config();

exports.getUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne({ userId: userId });

  // res.send(`Get user route ${user}`);

  const semester = await Semester.create({
    name: "1학기",
    members: [{
      name: "a",
      gender: "M",
      birth: "1999-01-01",
    }],
    groups: [
      {
        name: "1조",
      },
      {
        name: "2조",
      },
    ],
  });

  res.send(`Get user route ${semester}`);
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, age, username, password } = req.body;

  res.send(
    `Update user route ${userId} ${name} ${age} ${username} ${password}`
  );
};
