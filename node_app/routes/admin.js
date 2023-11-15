const express = require ("express");
const router_adm = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');


router_adm.get('/users', (req, res) => {
    
    User.findAll({order: [['id', 'ASC']]}).then(users => {
        res.render('./admins/users', {
            users: users.map(user => user.toJSON())
        });
    });
});

router_adm.get('/cad', (req, res) => {

    res.render('./admins/add_users');
});

router_adm.post('/add',
    [
      body('nome').notEmpty().withMessage('O campo Nome é obrigatório'),
      body('sobrenome').notEmpty().withMessage('O campo Sobrenome é obrigatório'),
      body('idade').notEmpty().isInt().withMessage('A Idade deve ser um número inteiro'),
      body('email').notEmpty().isEmail().withMessage('Digite um endereço de e-mail válido'),
    ],
    (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // Se houver erros de validação, renderize a página do formulário novamente com os erros
        return res.render('./admins/add_users', { errors: errors.array() });
      }
  
      // Se a validação passar, continue com a lógica de criar o usuário
      User.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        email: req.body.email,
      })
        .then(() =>{
          req.flash('success_msg', 'Usuário criado com sucesso!');
          res.redirect('/admin/users');
        })
        .catch((erro) => {
          res.flash('error_msg', 'Erro ao criar o usuário!');
          res.redirect('/admin/users');
        });
    }
  );

  router_adm.get('/editar/:id', (req, res) => {
   
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
          
          req.flash('error_msg', 'ID de usuário não encontrado');
          return res.redirect('/admin/users');
        }
  
        
        res.render('./admins/edit_users', {  users: user.map(user => user.toJSON()) });
      })
      .catch((erro) => {
      
        req.flash('error_msg', 'Erro ao buscar o usuário!');
        res.redirect('/admin/users');
      });
  });

  router_adm.get('/deletar/:id', (req, res) => {
    
    User.findOne({ where: { id: req.params.id } })
      .then((user) => {
        if (!user) {
        
          req.flash('error_msg', 'ID de usuário não encontrado');
          return res.redirect('/admin/users');
        }
  
        User.destroy({ where: { id: req.params.id } })
          .then(() => {
            req.flash('success_msg', 'Usuário deletado com sucesso!');
            res.redirect('/admin/users');
          })
          .catch((erro) => {
            req.flash('error_msg', 'Erro ao deletar o usuário!');
            res.redirect('/admin/users');
          });
      })
      .catch((erro) => {
   
        req.flash('error_msg', 'Erro ao buscar o usuário!');
        res.redirect('/admin/users');
      });
  });
  



module.exports = router_adm;