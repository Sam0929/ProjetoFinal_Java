const express = require('express');
const router_home = express.Router();
const homeController = require('../controllers/homeController');

 router_home.get('/', homeController.home);


module.exports = router_home;