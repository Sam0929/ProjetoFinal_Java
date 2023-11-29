// Carregando módulos

    const express = require ('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const router = require('./routes/routes');
    const router_adm = require ('./routes/admin');
    const session = require('express-session');
    const flash = require('connect-flash');
   

    require('./models/db.js');
    require('./models/User.js');
    require('dotenv').config();
    const app = express();

// Configurações

    // Session
        app.use(session({
            secret: "qualquercoisa",
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash());

    // Middleware
        
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");              //locals, variáveis globais
            res.locals.error_msg = req.flash("error_msg");
            next();
        });
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

        app.use(express.static('views'));                          // Middleware para arquivos estáticos, como css, js, imagens, etc.
        

// Rotas

    app.use(router);                                                // (dev) Usar prefixos depois, exemplo app.use('/main', router);
    app.use('/admin', router_adm)                                             // (dev) Exemplo app.use('/admin', router_adm);

// Outros

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log('Servidor rodando na porta ' + PORT);
    });
         
           
