const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

router.get('/logout', ensureAuthenticated, userController.logout);

router.get('/profile', ensureAuthenticated, userController.profile);

router.get('/edit', ensureAuthenticated, userController.edit);

router.post('/update', ensureAuthenticated, userController.update);

router.get('/investimentos', ensureAuthenticated, userController.investimentos);

module.exports = router;

