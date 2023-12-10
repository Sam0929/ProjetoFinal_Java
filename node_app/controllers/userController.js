const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
const User = require('../models/User');
const passport = require('passport');

exports.profile = (req, res) => {
    res.render('profile');
};

exports.edit = (req, res) => {
    res.render('edit_profile');
};

exports.update = async (req, res) =>{

  try {
    
    const user = res.locals.user;
    
    await body('name').notEmpty().withMessage('O campo Nome é obrigatório').run(req);
    await body('email').notEmpty().withMessage('O campo Email é obrigatório').run(req);
    await body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres!').run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Se houver erros de validação, renderize a página do formulário novamente com os erros
        return res.render('edit_profile', { errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = passwordHash;

    user.save()
        .then(() => {
            req.flash('success_msg', 'Usuário atualizado com sucesso!');
            res.redirect('/user/profile');
        })
        .catch((erro) => {
            req.flash('error_msg', 'Erro ao atualizar o usuário!');
            res.redirect('/user/profile');
        });
} catch (error) {
    console.error(error);
    req.flash('error_msg', 'Erro ao editar o usuário!');
    res.redirect('/user/profile');
};

}

exports.home = (req, res) => {
    res.render('home_user', {layout: false});
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

exports.investimentos = (req, res) => {
    res.render('investimentos');
};


