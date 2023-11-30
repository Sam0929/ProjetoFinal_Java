const express = require ('express');
const routes_users = express.Router();
const User = require('../models/User');

routes_users.get('/user/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({where: {id: id} });

    if(!user){
        req.flash('error_msg', 'O usuário não existe!');
        res.redirect('/admin/users');
    }
    else{
        req.flash('success_msg', 'O usuário existe!');
        res.redirect('/admin/users');
    }
    
    
});

module.exports = routes_users;
