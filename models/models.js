const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  username: { type: String, unique: true},
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const semesterSchema = new Schema({
  name: String,
  members: [{
    name: String,
    gender: String,
    birth: { type: Date },
  }],
  groups: [{
    name: String,
    memberIds: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }],
});

const User = mongoose.model("User", userSchema);
const Semester = mongoose.model("Semester", semesterSchema);

module.exports = {
  User,
  Semester,
};