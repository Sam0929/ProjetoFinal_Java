const express = require ("express");
const router_adm = express.Router();
const adminController = require('../controllers/adminController');


router_adm.get('/users',adminController.getUsers);

router_adm.get('/cad', adminController.form);

router_adm.post('/add', adminController.add);

router_adm.get('/editar/:id', adminController.edit);

router_adm.post('/update', adminController.update);

router_adm.get('/deletar/:id', adminController.delete);


module.exports = router_adm;