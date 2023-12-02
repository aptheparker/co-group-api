const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { User } = require("../models/models");

exports.createUser = async (req, res) => {
  //#swagger.tags = ['User']
  //#swagger.description = '사용자 생성'
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '생성할 사용자 정보',
    schema: {
      name: "홍길동",
      username: "hong",
      password: "123"
    }
  } */ 
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).send({ err: "Data not enough" });
  }

  const duplicatedUser = await User.findOne({ username });

  if (duplicatedUser) {
    return res.status(409).send({ err: "Username already exists" });
  } else {
    const user = await User.create({ name, username, password });
    res.status(201).send({ success: "User created", user });
  }
};

exports.getUser = async (req, res) => {
  //#swagger.tags = ['User']
  //#swagger.description = '사용자 정보 조회'
  /*#swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    description: '사용자 아이디',
    type: string
  } */
  const userId = new ObjectId(req.params.userId);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).send({ err: "User not found" });
  }

  res.status(200).send({ user });
};

exports.updateUser = async (req, res) => {
  //#swagger.tags = ['User']
  //#swagger.description = '사용자 정보 수정'
  /*#swagger.parameters['userId'] = {
    in: 'path',
    required: true,
    description: '사용자 아이디',
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '수정할 사용자 정보',
    schema: {
      name: "홍길동",
    }
  } */
  const userId = new ObjectId(req.params.userId);
  const { name, age } = req.body;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).send({ err: "User not found" });
  }

  const updatedUser = await User.updateOne(
    { _id: userId },
    { name, updatedAt: Date.now() }
  );

  res.status(200).send({ success: "User updated", updatedUser });
};
