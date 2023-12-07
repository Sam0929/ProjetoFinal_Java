const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
const User = require('../models/User');
const passport = require('passport');

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
          res.redirect('/');
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

exports.authlogin = async (req, res, next) => {

  await body('email').notEmpty().withMessage('O campo email é obrigatório').run(req);
  await body('password').notEmpty().withMessage('A senha não pode estar vazia!').run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('login', { errors: errors.array() });
  }

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
};


exports.logout = (req, res) => {

    req.logout(err => {
        if (err) {
          console.error(err);
          req.flash('error_msg', 'Erro ao fazer logout');
          res.redirect('/');  
        } else {
          req.flash('success_msg', 'Você fez logout com sucesso');
          res.redirect('/login');
        }
      });
    
};
