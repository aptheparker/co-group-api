const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ["M", "F"] },
  birthDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;