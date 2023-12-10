const express = require ("express");
const router_admin = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/auth');

router_admin.get('/users', ensureAdmin, adminController.getUsers);

router_admin.get('/cad', ensureAdmin, adminController.form);

router_admin.post('/add', ensureAdmin, adminController.add);

router_admin.get('/editar/:id', ensureAdmin, adminController.edit);

router_admin.post('/update', ensureAdmin, adminController.update);

router_admin.get('/deletar/:id', ensureAdmin, adminController.delete);


module.exports = router_admin;