const mongoose = require('mongoose');
const { Semester } = require('../models/models');

exports.getSemesterList = async (req, res) => {
  //#swagger.tags = ['Semester']
  //#swagger.description = '학기 목록 조회'
  const semesterList = await Semester.find();
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