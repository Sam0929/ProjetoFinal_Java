const express = require('express');
const router_users = express.Router();
const userController = require('../controllers/userController');
const transationsController = require('../controllers/transationsController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');
const { req_user } = require('../middleware/user');

router_users.get('/logout', ensureAuthenticated, userController.logout);

router_users.get('/home', ensureAuthenticated, req_user, userController.home);

router_users.get('/profile', ensureAuthenticated, req_user, userController.profile);

router_users.get('/edit', ensureAuthenticated, req_user, userController.edit);

router_users.post('/update', ensureAuthenticated, userController.update);

router_users.get('/investimentos', ensureAuthenticated, req_user, userController.investimentos);

router_users.get('/transacoes', ensureAuthenticated, req_user, transationsController.cad);

router_users.post('/transacoes/add', ensureAuthenticated, req_user, transationsController.add);

module.exports = router_users;

