const mongoose = require("mongoose");
const Member = require("../models/Member");

exports.getMemberList = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "멤버 리스트 조회"

  const members = await Member.find({});
  res.status(200).send({ members });
}

exports.createMember = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "멤버 생성"
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '생성할 멤버 정보',
    schema: {
      name: "김철수",
      gender: "M",
      birthDate: "1990-01-01"
    }
  } */

  const newUserInfo = req.body
  const member = await Member.create(newUserInfo);
  res.status(201).send({ success: "Member created", member });
}
