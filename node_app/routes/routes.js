const express = require ('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const path = require('path');

router.get('/', (req, res) => {

    res.render('home');
});

router.post('/auth/register', [
    
    body('nome').notEmpty().withMessage('O campo Nome é obrigatório'),
    body('email').notEmpty().withMessage('O campo Sobrenome é obrigatório'),
    body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8}).withMessage('A senha deve ter no mínimo 8 caracteres!'),

  ],

  async(req, res) => 
  
  {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Se houver erros de validação, renderize a página do formulário novamente com os erros
      return res.render('./admins/add_users', { errors: errors.array() });                              //Em desenvolvimento
    } 

    const {name, email, password, confirmpassword} = req.body;

    res.sendFile(path.join(__dirname, '../views/plain-html/signup.html'));
    
});

router.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, '../views/plain-html/login.html'));
});

module.exports = router;
