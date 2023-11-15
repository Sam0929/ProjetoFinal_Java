const express = require ('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {

    res.render('home');
});

router.get('/signup', (req, res) => {

    res.sendFile(path.join(__dirname, '../views/plain-html/signup.html'));
    
});

router.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, '../views/plain-html/login.html'));
});

module.exports = router;
