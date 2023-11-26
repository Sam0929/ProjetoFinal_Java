const express = require ('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const path = require('path');

router.get('/', (req, res) => {

    res.render('home');
});

router.get('/register', (req, res) => {
  
      res.sendFile(path.join(__dirname, '../views/plain-html/signup.html'));
  });

router.post('/auth/register', [
    
    body('nome').notEmpty().withMessage('O campo Nome é obrigatório'),
    body('email').notEmpty().withMessage('O campo Sobrenome é obrigatório'),
    body('password').notEmpty().withMessage('A senha não pode estar vazia!').isLength({ min: 8}).withMessage('A senha deve ter no mínimo 8 caracteres!'),

  ],

  async(req, res) => 
  
  {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Se houver erros de validação, renderize a página do formulário novamente com os erros
      return res.sendfile(path.join(__dirname, '../views/plain-html/sigup.html'), { errors: errors.array() });                              //Em desenvolvimento
    } 

    const {name, email, password, confirmpassword} = req.body;

    if(password != confirmpassword){
      return res.sendfile(path.join(__dirname, '../views/plain-html/signup.html'), {errors: [{msg: 'As senhas não conferem!'}]});
    }

    // Verifique se o usuário com o mesmo e-mail já existe no banco de dados
    let userExist = await User.findOne({email});

    if(userExist){
      return res.sendfile(path.join(__dirname, '../views/plain-html/signup.html'), {errors: [{msg: 'O e-mail já está em uso!'}]});
    }

    // Create password

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user

    const user = new User({
      name,
      email,
      password: passwordHash
    });

    try{
        await user.save();
        res.send('Usuário criado com sucesso!');

    }catch(err){
      res.status(500).send('Erro ao criar o usuário!');
    };

    res.sendFile(path.join(__dirname, '../views/plain-html/signup.html'));
    
});

router.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, '../views/plain-html/login.html'));
});

module.exports = router;
