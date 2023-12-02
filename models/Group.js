const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: String,
  memberIds: [{ type: Schema.Types.ObjectId, ref: "Member" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;