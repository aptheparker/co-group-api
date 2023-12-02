const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Semester } = require('../models/models');

exports.getSemesterList = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기 목록 조회'
  const semesterList = await Semester.find({}, { _id: 1, name: 1, startDate: 1, endDate: 1 });
  res.status(200).send({ semesterList });
}

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
}

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
}

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
  const { name, startDate, endDate } = req.body;

  if (!name || !startDate || !endDate) {
    return res.status(400).send({ err: "Data not enough" });
  } else if (startDate > endDate) {
    return res.status(400).send({ err: "Start date must be before end date" });
  } else {
    const semester = await Semester.findByIdAndUpdate(semesterId, { name, startDate, endDate });
    if (!semester) {
      return res.status(404).send({ err: "Semester not found" });
    } else {
      res.status(200).send({ success: "Semester updated", semester });
    }
  }
}

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
  const semester = await Semester.findByIdAndDelete(semesterId);

  if (!semester) {
    return res.status(404).send({ err: "Semester not found" });
  } else {
    res.status(200).send({ success: "Semester deleted", semester });
  }
}