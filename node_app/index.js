const express = require ('express');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/about', (req, res) => {
    res.send('Minha página sobre testes');
});

app.get('/ola/:nome/:cargo/:cor', function (req, res) {                                      //Quando eu uso /: eu estou dizendo que é um parâmetro         
    res.send('<h1>Olá ' + req.params.nome + ', seja bem vindo ao meu site!</h1>' 
    + '<h2>Seu cargo é: ' + req.params.cargo + '</h2>' 
    + '<h3>Sua cor favorita é: ' + req.params.cor + '</h3>');       
                    
});

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});


