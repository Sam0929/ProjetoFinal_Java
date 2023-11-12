const express = require ('express');
const routes = express.Router();
const path = require('path');
const User = require('./models/User');

routes.use(express.static('public'));

routes.get('/a', (req, res) => {
    console.log('Acessando rota /a');
    res.render('home');
});

routes.get('/login', (req, res) => {
    console.log('Acessando rota /login');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

routes.get('/cad', (req, res) => {
    console.log('Acessando rota /cad');
    res.render('form');
});

routes.get('/ola/:nome/:cargo/:cor', function (req, res) {                                      //Quando eu uso /: eu estou dizendo que é um parâmetro         
    res.send('<h1>Olá ' + req.params.nome + ', seja bem vindo ao meu site!</h1>' 
    + '<h2>Seu cargo é: ' + req.params.cargo + '</h2>' 
    + '<h3>Sua cor favorita é: ' + req.params.cor + '</h3>');       
                    
});

routes.post('/add', (req, res) => {
    User.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        email: req.body.email
    }).then(function () {
        res.redirect('/');
    }).catch(function (erro) {
        res.send('Erro: ' + erro);
    });
});




module.exports = routes;
