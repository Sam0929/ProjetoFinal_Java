const express = require('express');
const router_users = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

router_users.get('/logout', ensureAuthenticated, userController.logout);

router_users.get('/home', ensureAuthenticated, userController.home);

router_users.get('/profile', ensureAuthenticated, userController.profile);

router_users.get('/edit', ensureAuthenticated, userController.edit);

router_users.post('/update', ensureAuthenticated, userController.update);

router_users.get('/investimentos', ensureAuthenticated, userController.investimentos);

module.exports = router_users;

