const express = require ('express');
const routes = express.Router();
const path = require('path');
const { body, validationResult } = require('express-validator');
const User = require('./models/User');

routes.use(express.static('views'));

routes.get('/', (req, res) => {
    console.log('Acessando rota /a');
    res.render('home');
});

routes.get('/users', (req, res) => {
    console.log('Acessando rota /users');
     
    User.findAll({order: [['id', 'ASC']]}).then(users => {
        res.render('users', {
            users: users.map(user => user.toJSON())
        })
    });
});

routes.get('/login', (req, res) => {
    console.log('Acessando rota /login');
    res.sendFile(path.join(__dirname, '/views/plain-html/login.html'));
});

routes.get('/cad', (req, res) => {
    console.log('Acessando rota /cad');
    res.render('form');
});
routes.post('/add',
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
          res.redirect('/');
        })
        .catch(function (erro) {
          res.send('Erro: ' + erro);
        });
    }
  );



module.exports = routes;
