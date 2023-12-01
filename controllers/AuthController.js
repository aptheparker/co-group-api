const mongoose = require("mongoose");
const { User } = require("../models/models");

exports.signIn = async (req, res) => {

  //#swagger.tags = ['Auth']
  //#swagger.description = '로그인'
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '로그인 정보',
    schema: {
      username: "hong",
      password: "123"
    }
  } */

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ err: "Data not enough" });
  } else if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).send({ err: "Data type wrong" });
  }

  const user = await User.findOne({ username, password });
  if (user) {
    res.status(200).send({ success: "User signed in", user });
  } else {
    res.status(404).send({ err: "User not found" });
  }
};
