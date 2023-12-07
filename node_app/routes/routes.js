const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

router.get('/', userController.home);

router.get('/register', forwardAuthenticated, userController.register);

router.get('/login', forwardAuthenticated, userController.login);

router.post('/auth/register', forwardAuthenticated, userController.authregister);

router.post('/auth/login', forwardAuthenticated, userController.authlogin);

router.get('/logout', ensureAuthenticated, userController.logout);

module.exports = router;

