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

router.get('/user/profile', ensureAuthenticated, userController.profile);

router.get('/user/edit', ensureAuthenticated, userController.edit);

router.post('/user/update', ensureAuthenticated, userController.update);

router.get('/aaa', (req, res) => {                          //rota teste
    res.render('aaa');
});
module.exports = router;

