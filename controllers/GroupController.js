const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Group = require("../models/Group");
const Member = require("../models/Member");

exports.getGroupList = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 리스트 조회"

  const groups = await Group.find({}, { _id: 1, name: 1 });
  res.status(200).send({ groups });
}

exports.createGroup = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 생성"
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '생성할 그룹 정보',
    schema: {
      name: "JS 스터디",
    }
  } */

  const newGroupInfo = req.body;

  const duplicatedGroup = await Group.findOne({ name: newGroupInfo.name });
  if (duplicatedGroup) {
    return res.status(400).send({ err: "Group already exists" });
  }

  const newGroup = await Group.create(newGroupInfo);
  res.status(201).send({ success: "Group created", newGroup });
}

exports.getGroup = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 조회"
  /*#swagger.parameters['groupId'] = {
    in: 'path',
    required: true,
    description: '조회할 그룹 ID'
    type: 'string'
  } */

  const groupId = new ObjectId(req.params.groupId);
  const group = await Group.findById(groupId);
  if (!group) {
    return res.status(404).send({ err: "Group not found" });
  } else {
    res.status(200).send({ group });
  }
}

exports.updateGroup = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 수정"
  /*#swagger.parameters['groupId'] = {
    in: 'path',
    required: true,
    description: '수정할 그룹 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '수정할 그룹 정보',
    schema: {
      name: "JS 스터디",
    }
  } */

  const groupId = new ObjectId(req.params.groupId);
  const newGroupInfo = req.body;
  const group = await Group.updateOne(groupId, {newGroupInfo, updateAt: Date.now()});
  if (!group) {
    return res.status(404).send({ err: "Group not found" });
  } else {
    res.status(200).send({ success: "Group updated", group });
  }
}

exports.deleteGroup = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 삭제"
  /*#swagger.parameters['groupId'] = {
    in: 'path',
    required: true,
    description: '삭제할 그룹 ID'
    type: 'string'
  } */

  const groupId = new ObjectId(req.params.groupId);
  const group = await Group.deleteOne(groupId);
  if (!group) {
    return res.status(404).send({ err: "Group not found" });
  } else {
    res.status(200).send({ success: "Group deleted", group });
  }
}

// TODO: swagger memberIds example
// TODO: update function refactoring
exports.createGroupMember = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 멤버 추가"
  /*#swagger.parameters['groupId'] = {
    in: 'path',
    required: true,
    description: '멤버를 추가할 그룹 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '추가할 멤버 ID 리스트',
    schema: {
      memberIds: ["5f4f4f4f4f4f4f4f4f4f4f4f"],
    }
  } */

  const groupId = new ObjectId(req.params.groupId);
  const newMemberIds = req.body.memberIds;

  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    return res.status(404).send({ err: "Group not found" });
  }

  const newMembers = await Member.find({ _id: { $in: newMemberIds } });
  if (newMembers.length !== newMemberIds.length) {
    return res.status(404).send({ err: "Member not found" });
  }

  const groupMemberIds = group.memberIds.map((memberId) => memberId.toString());
  const duplicatedMembers = newMembers.filter((member) => groupMemberIds.includes(member._id.toString()));
  if (duplicatedMembers.length > 0) {
    return res.status(400).send({ err: "Member already exists" });
  }

  await Group.updateOne({ _id: groupId }, { $push: { memberIds: { $each: newMemberIds } } });
  res.status(200).send({ success: "Group member added", group });
}

// TODO: swagger memberIds example
// TODO: update function refactoring
exports.deleteGroupMember = async (req, res) => {
  //#swagger.tags = ['Group']
  //#swagger.description = "그룹 멤버 삭제"
  /*#swagger.parameters['groupId'] = {
    in: 'path',
    required: true,
    description: '멤버를 삭제할 그룹 ID'
    type: 'string'
  } */
  /*#swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: '삭제할 멤버 ID 리스트',
    schema: {
      memberIds: ["5f4f4f4f4f4f4f4f4f4f4f4f"],
    }
  } */

  const groupId = new ObjectId(req.params.groupId);
  const deleteMemberIds = req.body.memberIds;

  const group = await Group.findOne({ _id: groupId });
  if (!group) {
    return res.status(404).send({ err: "Group not found" });
  }

  const deleteMembers = await Member.find({ _id: { $in: deleteMemberIds } });
  if (deleteMembers.length !== deleteMemberIds.length) {
    return res.status(404).send({ err: "Member not found" });
  }

  const groupMemberIds = group.memberIds.map((memberId) => memberId.toString());
  const notExistMembers = deleteMembers.filter((member) => !groupMemberIds.includes(member._id.toString()));
  if (notExistMembers.length > 0) {
    return res.status(400).send({ err: "Member not exists" });
  }

  const changedGroup = await Group.updateOne({ _id: groupId }, { $pull: { memberIds: { $in: deleteMemberIds } } });
  res.status(200).send({ success: "Group member deleted", changedGroup });
}