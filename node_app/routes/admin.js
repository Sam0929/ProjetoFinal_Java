const express = require ("express");
const router_adm = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/auth');

router_adm.get('/users', ensureAdmin, adminController.getUsers);

router_adm.get('/cad', ensureAdmin, adminController.form);

router_adm.post('/add', ensureAdmin, adminController.add);

router_adm.get('/editar/:id', ensureAdmin, adminController.edit);

router_adm.post('/update', ensureAdmin, adminController.update);

router_adm.get('/deletar/:id', ensureAdmin, adminController.delete);


module.exports = router_adm;