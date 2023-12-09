const express = require ("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const { ensureAdmin } = require('../middleware/auth');

router.get('/users', ensureAdmin, adminController.getUsers);

router.get('/cad', ensureAdmin, adminController.form);

router.post('/add', ensureAdmin, adminController.add);

router.get('/editar/:id', ensureAdmin, adminController.edit);

router.post('/update', ensureAdmin, adminController.update);

router.get('/deletar/:id', ensureAdmin, adminController.delete);


module.exports = router;