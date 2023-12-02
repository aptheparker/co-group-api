const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const {Semester} = require("../models/models");

exports.getSemesterMemberList = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "학기별 멤버 조회"
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '조회할 학기 ID',
    type: 'string'
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send("Semester not found");
  } else{
    return res.status(200).send(semester.members);
  }
}

exports.createSemesterMember = async (req, res) => {
  //#swagger.tags = ['Member']
  //#swagger.description = "학기별 멤버 생성"
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '생성할 학기 ID',
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '생성할 멤버 정보',
    schema: {
      name: '홍길동',
      gender: 'M',
      birthDate: '2021-01-01'
    }
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send("Semester not found");
  } else{
    const member = req.body;
    semester.members.push(member);
    await semester.save();
    return res.status(200).send(member);
  }
}