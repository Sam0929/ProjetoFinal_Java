const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');



router.get('/register', forwardAuthenticated, registerController.register);

router.get('/login', forwardAuthenticated, loginController.login);

router.post('/auth/register', forwardAuthenticated, registerController.authregister);

router.post('/auth/login', forwardAuthenticated, loginController.authlogin);



module.exports = router;
