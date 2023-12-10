const express = require ("express");
const router_admin = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/auth');
const { req_user } = require('../middleware/user');

router_admin.get('/users', ensureAdmin, req_user, adminController.getUsers);

router_admin.get('/cad', ensureAdmin, req_user, adminController.form);

router_admin.post('/add', ensureAdmin, adminController.add);

router_admin.get('/editar/:id', ensureAdmin, req_user, adminController.edit);

router_admin.post('/update', ensureAdmin, adminController.update);

router_admin.get('/deletar/:id', ensureAdmin, adminController.delete);


module.exports = router_admin;