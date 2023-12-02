const express = require('express');
const router = express.Router();

const SemesterController = require('../controllers/SemesterController');

router.get('/list', SemesterController.getSemesterList);
router.post('/', SemesterController.createSemester);
router.get('/:semesterId', SemesterController.getSemester);
router.put('/:semesterId', SemesterController.updateSemester);
router.delete('/:semesterId', SemesterController.deleteSemester);

module.exports = router;