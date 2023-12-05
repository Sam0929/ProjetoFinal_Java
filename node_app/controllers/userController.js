const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require('../models/User');

exports.home = (req, res) => {              
    res.render('home');
};

exports.register = (req, res) => {
    res.render('signup');
};

exports.login = (req, res) => {
    res.render("login");
};

exports.authregister = async (req, res) => {
    try {
        // Manualmente define as regras de validação
        await body('name').notEmpty().withMessage('O campo Nome é obrigatório').run(req);
        await body('email').notEmpty().withMessage('O campo Email é obrigatório').run(req);
        await body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres!').run(req);
    
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('signup', { errors: errors.array(), formData: req.body });
        }

        const { name, email, password, confirmpassword } = req.body;

        if (password != confirmpassword) {
            return res.render('signup', { errors: [{ msg: 'As senhas não conferem!' }], formData: req.body });
        }

        // Verifique se o usuário com o mesmo e-mail já existe no banco de dados
        let userExist = await User.findOne({ where: { email: email } });

        if (userExist) {
            return res.render('signup', { errors: [{ msg: 'O e-mail já está em uso!' }], formData: req.body });
        }

        // Create password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        User.create({
            name: name,
            email: email,
            password: passwordHash,
        })
        .then(() => {
            req.flash('success_msg', 'Usuário criado com sucesso!');
            res.redirect('/register');
        })
        .catch((erro) => {
            req.flash('error_msg', 'Erro ao criar o usuário!');
            res.redirect('/register');
        });

    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Erro ao criar o usuário!');
        res.redirect('/admin/users');
    }
};

exports.authlogin = async (req, res) => {
    try {
        // Manualmente define as regras de validação
        await body('email').notEmpty().withMessage('O campo email é obrigatório').run(req);
        await body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres!').run(req);
                
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('login', { errors: errors.array() });                              
        } 
        
        const { email, password } = req.body;
        
        // Verifique se o usuário com o mesmo e-mail já existe no banco de dados
        const user = await User.findOne({ where: { email: email } });
        
        if (!user) {
            return res.render('login', { errors: [{ msg: 'Este usuário não existe!' }] });
        }
        
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.render('login', { errors: [{ msg: 'As senhas não conferem!' }] });
        }
        
        try {
            const secret = process.env.SECRET; // Em desenvolvimento
        
            const token = jwt.sign(
                { id: user._id },
                secret,
            );
            
            req.flash('success_msg', 'Autenticação realizada com sucesso!');
        
            res.cookie('token', token, { httpOnly: true, secure: true });
        } catch (err) {
            return res.render('login', { errors: errors.array() });
        }
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Erro ao efetuar o login!');
        res.redirect('/login');
    }
};
