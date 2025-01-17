const router = require('express').Router();
const userController = require('../controller/userController');

router.post('/signup',userController.signup);
router.get('/login',userController.login);

module.exports = router;