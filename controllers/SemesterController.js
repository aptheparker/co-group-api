const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Semester = require("../models/Semester");
const Group = require("../models/Group");
const Member = require("../models/Member");

exports.getSemesterList = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기 목록 조회'
  const semesterList = await Semester.find(
    {},
    { _id: 1, name: 1, startDate: 1, endDate: 1 }
  );
  res.status(200).send({ semesterList });
};

exports.createSemester = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기 생성'
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '생성할 학기 정보',
    schema: {
      name: "2021년 1학기",
      startDate: "2021-03-02",
      endDate: "2021-06-15"
    }
  } */

  const { name, startDate, endDate } = req.body;

  if (!name || !startDate || !endDate) {
    return res.status(400).send({ err: "Data not enough" });
  } else if (startDate > endDate) {
    return res.status(400).send({ err: "Start date must be before end date" });
  } else if (await Semester.findOne({ name })) {
    return res.status(400).send({ err: "Semester already exists" });
  } else {
    const semester = await Semester.create({ name, startDate, endDate });
    res.status(201).send({ success: "Semester created", semester });
  }
};

exports.getSemester = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기별 조회'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '조회할 학기 ID'
    type: 'string'
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else {
    res.status(200).send({ semester });
  }
};

exports.updateSemester = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기 정보 수정'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '학기 ID',
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '수정할 학기 정보',
    schema: {
      name: "2021년 1학기",
      startDate: "2021-03-02",
      endDate: "2021-06-15"
    }
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const updatedSemesterInfo = req.body;

  const updatedSemester = await Semester.updateOne(semesterId, {
    updatedSemesterInfo,
    updateAt: Date.now(),
  });
  if (!updatedSemester) {
    return res.status(404).send({ err: "Semester not found" });
  } else {
    res.status(200).send({ success: "Semester updated", updatedSemester });
  }
};

exports.deleteSemester = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기 삭제'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '삭제할 학기 ID'
    type: 'string'
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const semester = await Semester.deleteOne(semesterId);

  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else {
    res.status(200).send({ success: "Semester deleted", semester });
  }
};

exports.addSemesterMember = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기에 멤버 추가'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '멤버를 추가할 학기 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '추가할 멤버 정보',
    schema: {
      memberIds: ["60b3c0e4e4b3f4a8a0d1b8a7"]
    }
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const newMemberIds = req.body.memberIds;

  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else if (semester.memberIds.includes(newMemberIds)) {
    return res.status(400).send({ err: "Member already exists" });
  } else {
    const updatedSemester = await Semester.updateOne(semesterId, {
      $push: { memberIds: newMemberIds },
      updateAt: Date.now(),
    });
    res.status(200).send({ success: "Semester updated", updatedSemester });
  }
};

exports.deleteSemesterMember = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기에서 멤버 삭제'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '멤버를 삭제할 학기 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '삭제할 멤버 정보',
    schema: {
      memberId: "60b3c0e4e4b3f4a8a0d1b8a7"
    }
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const deletedMemberIds = req.body.memberIds;

  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else if (!semester.memberIds.includes(deletedMemberIds)) {
    return res.status(400).send({ err: "Member not found" });
  } else {
    const updatedSemester = await Semester.updateOne(semesterId, {
      $pull: { memberIds: { $in: deletedMemberIds } },
      updateAt: Date.now(),
    });
    res.status(200).send({ success: "Semester updated", updatedSemester });
  }
};

exports.addSemesterGroup = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기에 그룹 추가'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '그룹을 추가할 학기 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '추가할 그룹 정보',
    schema: {
      groupIds: ["60b3c0e4e4b3f4a8a0d1b8a7"]
    }
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const newGroupIds = req.body.groupIds;

  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else if (semester.groupIds.includes(newGroupIds)) {
    return res.status(400).send({ err: "Group already exists" });
  } else {
    const updatedSemester = await Semester.updateOne(semesterId, {
      $push: { groupIds: newGroupIds },
      updateAt: Date.now(),
    });
    res.status(200).send({ success: "Semester updated", updatedSemester });
  }
}

exports.deleteSemesterGroup = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기에서 그룹 삭제'
  /*#swagger.parameters['semesterId'] = {
    in: 'path',
    required: true,
    description: '그룹을 삭제할 학기 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '삭제할 그룹 정보',
    schema: {
      groupId: "60b3c0e4e4b3f4a8a0d1b8a7"
    }
  } */

  const semesterId = new ObjectId(req.params.semesterId);
  const deletedGroupIds = req.body.groupIds;

  const semester = await Semester.findById(semesterId);
  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else if (!semester.groupIds.includes(deletedGroupIds)) {
    return res.status(400).send({ err: "Group not found" });
  } else {
    const updatedSemester = await Semester.updateOne(semesterId, {
      $pull: { groupIds: { $in: deletedGroupIds } },
      updateAt: Date.now(),
    });
    res.status(200).send({ success: "Semester updated", updatedSemester });
  }
};