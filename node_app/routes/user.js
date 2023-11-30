const express = require ('express');
const router = express.Router();
const User = require('../models/User');

router.get('/user/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User.findById(id, '-password');

    if(!user){
        return req.flash('error_msg', 'Erro ao criar o usuário!');
    }
    
    res.render('home');
});