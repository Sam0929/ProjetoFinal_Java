// Carregando módulos

    const express = require ('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const router = require('./routes/routes');
    const router_adm = require ('./routes/admin');

    require('./models/db.js');
    require('./models/User.js');
    const app = express();

// Configurações

    // Handlebars

        const hbs = handlebars.create({
            
            defaultLayout: 'main'
        });
        app.engine('handlebars', hbs.engine);                       // É uma linguagem templating para exibir um mesmo layout para diferentes views.
        app.set('view engine', 'handlebars');

    // Body Parser

        app.use(bodyParser.urlencoded({extended: true}));          // Middleware para resgatar dados do front-end // Formulários, req.body.(nome_do_input);
        app.use(bodyParser.json()); 

    // Public

        app.use(express.static('views'));

// Rotas

    app.use(router);                                                // (dev) Usar prefixos depois, exemplo app.use('/main', router);
    app.use('/admin', router_adm)                                             // (dev) Exemplo app.use('/admin', router_adm);

// Outros

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log('Servidor rodando na porta ' + PORT);
    });
         
           
