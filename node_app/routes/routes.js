const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loggedIn = require('../middleware/loggedin'); // Fix the casing of the import

router.get('/', userController.home);

router.get('/register', userController.register);

router.get('/login', userController.login);

router.post('/auth/register', userController.authregister);

router.post('/auth/login', userController.authlogin);

router.get('/teste', loggedIn, userController.teste);

router.get('/logout', userController.logout);

module.exports = router;

