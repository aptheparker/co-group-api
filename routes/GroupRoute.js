const express = require('express');
const router = express.Router();

const GroupController = require('../controllers/GroupController');

router.get('/list', GroupController.getGroupList);
router.post('/', GroupController.createGroup);
router.get('/:groupId', GroupController.getGroup);
router.put('/:groupId', GroupController.updateGroup);
router.delete('/:groupId', GroupController.deleteGroup);
router.post('/:groupId/member', GroupController.createGroupMember);
router.delete('/:groupId/member', GroupController.deleteGroupMember);

module.exports = router;