const express = require("express");
const router = express.Router();

const MemberController = require("../controllers/MemberController");

router.get("/list", MemberController.getMemberList);
router.post("/", MemberController.createMember);
router.get("/:memberId", MemberController.getMember);
router.put("/:memberId", MemberController.updateMember);
router.delete("/:memberId", MemberController.deleteMember);

module.exports = router;