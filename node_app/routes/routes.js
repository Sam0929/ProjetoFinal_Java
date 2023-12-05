const express = require ('express');
const router = express.Router();
const userController = require('../controllers/userController');
var cookieParser = require('cookie-parser');


router.use (cookieParser());

router.get('/', userController.home);

router.get('/register', userController.register);

router.get('/login', userController.login);

router.post('/auth/register', userController.authregister);

router.post('/auth/login', userController.authlogin);


module.exports = router;
