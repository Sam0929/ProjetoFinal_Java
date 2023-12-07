const express = require ("express");
const router_adm = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth');

router_adm.get('/users', ensureAuthenticated, adminController.getUsers);

router_adm.get('/cad', ensureAuthenticated, adminController.form);

router_adm.post('/add', ensureAuthenticated, adminController.add);

router_adm.get('/editar/:id', ensureAuthenticated, adminController.edit);

router_adm.post('/update', ensureAuthenticated, adminController.update);

router_adm.get('/deletar/:id', ensureAuthenticated, adminController.delete);


module.exports = router_adm;