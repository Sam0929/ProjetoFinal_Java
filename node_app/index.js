const express = require ('express');
const routes = require('./routes');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
require('./models/db.js');
require('./models/User.js');




    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    
    app.use(routes);

    app.listen(3000, function () {
        console.log('Servidor rodando na porta 3000');
    });
         
           
