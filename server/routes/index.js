var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.get('/:username', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:username', userController.deleteUser);

router.get('/skills/:username', userController.getSkills);
router.put('/addskill/:username', userController.addSkill);
router.put('/removeskill/:username', userController.removeSkill);

module.exports = router;
