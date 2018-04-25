var express = require('express');
var router = express.Router();

const UserController = require('../controllers/user.controller')

router.post('/signinFb', UserController.signInFb);
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.post('/title', UserController.updateTitle);
router.post('/get', UserController.getUser);

module.exports = router;
