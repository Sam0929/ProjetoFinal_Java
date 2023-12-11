const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
const User = require('../models/User');
const passport = require('passport');


exports.login = (req, res) => {
    res.render("login", {layout:false});
};

exports.authlogin = async (req, res, next) => {

    await body('email').notEmpty().withMessage('O campo email é obrigatório').run(req);
    await body('password').notEmpty().withMessage('A senha não pode estar vazia!').run(req);
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render('login', { errors: errors.array(), layout:false });
    }
  
    passport.authenticate('local', {
      successRedirect: '/user/home',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  };