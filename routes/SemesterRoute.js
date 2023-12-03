const express = require('express');
const router = express.Router();

const SemesterController = require('../controllers/SemesterController');

router.get('/list', SemesterController.getSemesterList);
router.post('/', SemesterController.createSemester);
router.get('/:semesterId', SemesterController.getSemester);
router.put('/:semesterId', SemesterController.updateSemester);
router.delete('/:semesterId', SemesterController.deleteSemester);
router.post('/:semesterId/member', SemesterController.addSemesterMember);
router.delete('/:semesterId/member', SemesterController.deleteSemesterMember);
router.post('/:semesterId/group', SemesterController.addSemesterGroup);
router.delete('/:semesterId/group', SemesterController.deleteSemesterGroup);

module.exports = router;