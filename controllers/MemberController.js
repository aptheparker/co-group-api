const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Member = require("../models/Member");

exports.getMemberList = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "멤버 리스트 조회"

  const members = await Member.find({});
  res.status(200).send({ members });
};

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

  const newUserInfo = req.body;
  const member = await Member.create(newUserInfo);
  res.status(201).send({ success: "Member created", member });
};

exports.getMember = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "멤버 조회"
  /*#swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    description: '조회할 멤버 ID'
  } */

  const memberId = new ObjectId(req.params.memberId);
  const foundMember = await Member.findById(memberId);
  if (!foundMember) {
    return res.status(404).send({ error: "Member not found" });
  }

  res.status(200).send({ foundMember });
};

exports.updateMember = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "멤버 정보 수정"
  /*#swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    description: '수정할 멤버 ID'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '수정할 멤버 정보',
    schema: {
      name: "김철수",
      gender: "M",
      birthDate: "1990-01-01"
    } 
  } */

  const memberId = new ObjectId(req.params.memberId);
  const updatedMemberInfo = req.body;

  const foundMember = await Member.findById(memberId);
  if (!foundMember) {
    return res.status(404).send({ error: "Member not found" });
  }

  await Member.updateOne(memberId, {updatedMemberInfo, updatedAt: Date.now()});
  res.status(200).send({ success: "Member updated" });
};

exports.deleteMember = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "멤버 삭제"
  /*#swagger.parameters['memberId'] = {
    in: 'path',
    required: true,
    description: '삭제할 멤버 ID'
  } */

  const memberId = new ObjectId(req.params.memberId);
  const foundMember = await Member.findById(memberId);
  if (!foundMember) {
    return res.status(404).send({ error: "Member not found" });
  }

  await Member.deleteOne(memberId);
  res.status(200).send({ success: "Member deleted" });
}