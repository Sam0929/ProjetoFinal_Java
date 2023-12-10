const express = require('express');
const router_auth = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');



router_auth.get('/register', forwardAuthenticated, registerController.register);

router_auth.get('/login', forwardAuthenticated, loginController.login);

router_auth.post('/auth/register', forwardAuthenticated, registerController.authregister);

router_auth.post('/auth/login', forwardAuthenticated, loginController.authlogin);



module.exports = router_auth;
