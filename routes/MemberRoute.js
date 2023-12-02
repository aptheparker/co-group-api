const express = require("express");
const router = express.Router();

const MemberController = require("../controllers/MemberController");

router.get("/:semesterId", MemberController.getSemesterMemberList);
router.post("/:semesterId", MemberController.createSemesterMember);
// router.get("/:semesterId/:memberId", MemberController.getSemesterMember);
// router.put("/:semesterId/:memberId", MemberController.updateSemesterMember);
// router.delete("/:semesterId/:memberId", MemberController.deleteSemesterMember);

module.exports = router;