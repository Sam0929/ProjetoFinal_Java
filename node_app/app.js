// Carregando módulos

    const express = require ('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const passport = require('passport');
    const router_users = require('./routes/router_users');
    const router_adm = require ('./routes/admin');
    const router_auth = require('./routes/auth');
    const router_home = require('./routes/home');
    const session = require('express-session');
    const flash = require('connect-flash');
    const dotenv = require('dotenv');
    const { req_user } = require('./middleware/user.js');
    require('./middleware/passport')(passport);
// Banco de dados

    require('./models/db.js');
    require('./models/User.js');

//
    dotenv.config();
    const app = express();

// Configurações
   
     // Express and Passport Session
    
        app.use(express.urlencoded({ extended: true }));
        app.use(session({ 
            secret: 'secretpass', 
            resave: true, 
            saveUninitialized: true
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());
        
    // Middleware
        app.use(flash());

        app.use((req, res, next) => {
            res.locals.success_msg = req.flash("success_msg");              //locals, variáveis globais
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            next();
        });

        app.use(req_user);
       
        
    // Handlebars

        const hbs = handlebars.create({
            
            defaultLayout: 'main',
            helpers: {
                
                ifRole: function (user, role, options) {
                    return user && user.role === role ? options.fn(this) : options.inverse(this);
                }
            }
        });
        app.engine('handlebars', hbs.engine);                       // É uma linguagem templating para exibir um mesmo layout para diferentes views.
        app.set('view engine', 'handlebars');

    // Body Parser

        app.use(bodyParser.urlencoded({extended: true}));          // Middleware para resgatar dados do front-end // Formulários, req.body.(nome_do_input);
        app.use(bodyParser.json()); 

    // Public

        app.use(express.static('views'));                          // Middleware para arquivos estáticos, como css, js, imagens, etc

    // Rotas

        app.use('/user', router_users);                                                // (dev) Usar prefixos depois, exemplo app.use('/main', router);
        app.use('/admin', router_adm);                                             // (dev) Exemplo app.use('/admin', router_adm);
        app.use(router_auth);
        app.use(router_home);
        
    // Migration

        const initializeApp = require('./migrations/admin.js');
        initializeApp();    

    // Outros
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log('Servidor rodando na porta ' + PORT);
        });
            
            
