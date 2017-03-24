var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

//user route
router.get('/user', userController.readUsers);
router.get('/user/:username', userController.readUser);
router.post('/user', userController.createUser);
router.delete('/user/:username', userController.deleteUser);

//user skill route
router.get('/user/skill/:username', userController.getSkills);
router.put('/user/addskill/:username', userController.addSkill);
router.put('/user/removeskill/:username', userController.removeSkill);

module.exports = router;
