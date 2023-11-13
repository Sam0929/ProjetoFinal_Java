const express = require ("express");
const router_adm = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');


router_adm.get('/users', (req, res) => {
    
    User.findAll({order: [['id', 'ASC']]}).then(users => {
        res.render('./admins/users', {
            users: users.map(user => user.toJSON())
        })
    });
});

router_adm.get('/cad', (req, res) => {

    res.render('./admins/form');
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
        return res.render('form', { errors: errors.array() });
      }
  
      // Se a validação passar, continue com a lógica de criar o usuário
      User.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        email: req.body.email,
      })
        .then(function () {
          res.redirect('/admin/users');
        })
        .catch(function (erro) {
          res.send('Erro: ' + erro);
        });
    }
  );

  router_adm.get('/deletar/:id', (req, res) => {

    User.destroy({where: {'id': req.params.id}})

      .then(() =>{
        res.json("Postagem deletada com sucesso!");
      })
      .catch((erro) =>{
        res.json("Essa postagem não existe!!");
      });
    

  });



module.exports = router_adm;