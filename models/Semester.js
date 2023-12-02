const mongoose = require("mongoose");
const { Schema } = mongoose;

const semesterSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  memberIds: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  groups: [{
    name: String,
    memberIds: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }],
});

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;
