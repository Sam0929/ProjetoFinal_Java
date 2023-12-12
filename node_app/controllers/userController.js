const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
const Dbanco = require ('../models/Dados_bancarios.js');
const Sequelize = require('sequelize');
// const fetch = require('node-fetch').default || require('node-fetch');

exports.profile = (req, res) => {
    res.render('profile');
};

exports.edit = (req, res) => {
    res.render('edit_profile', {layout: false});
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

// exports.home = async (req, res) => {
//     const apiKey = '6DTJBAXQPLNZO4EE'; // Chave da API Alpha Vantage
//     const symbol = 'AAPL'; // Símbolos das ações desejadas

//     const response = await fetch(
//       `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
//     );
//     const responseJson = await response.json();
//     console.log(responseJson);
//     res.render('home_user', {layout: false});
// };

exports.home = async (req, res) => {
  let data_transactions = [];
  let balance = 0;
  let positiveTotal = 0;
  let negativeTotal = 0;
  let data_transactions_in = [];
  let data_transactions_out = [];
  let incomePercentage = 0;
  let expensePercentage = 0;

  try {

    console.log("!!!!!Estou aqui");
    data_transactions = await Dbanco.findAll({ where: { user_id: req.user.dataValues.id } });
    data_transactions_in = await Dbanco.findAll({ where: { user_id: req.user.dataValues.id, value: { [Sequelize.Op.gte]: 0 } } });
    data_transactions_out = await Dbanco.findAll({ where: { user_id: req.user.dataValues.id, value: { [Sequelize.Op.lt]: 0 }} });

    positiveTotal = data_transactions.reduce((total, transaction) => {
      return transaction.value >= 0 ? total + transaction.value : total;
    }, 0);
    
    negativeTotal = data_transactions.reduce((total, transaction) => {
      return transaction.value < 0 ? total + transaction.value : total;
    }, 0);

    
    totalValue = data_transactions.reduce((total, transaction) => {
      return total + Math.abs(transaction.value);
    }, 0);

    incomePercentage = parseInt((positiveTotal / totalValue) * 100);
    
    expensePercentage = parseInt((Math.abs(negativeTotal) / totalValue) * 100);


    const result = await Dbanco.findOne({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('value')), 'balance']
      ],
      where: { user_id: req.user.dataValues.id }
    });
  
    balance = result.get('balance');
  } catch(error){
    console.log(error);
  }
  try{
    console.log("Antes da chamada à API FMD");
      
    const apiKey = '27Pbu8Kw18B0cIh1JOUBgefgGe80h4bB'; //'6DTJBAXQPLNZO4EE';  Chave da API FMD
    const symbol = req.user.dataValues.stokes.replace("null,", ""); // Símbolos das ações desejadas
    console.log("AQUI: " + symbol);
    const response = await fetch(
    `https://financialmodelingprep.com/api/v3/quote-order/${symbol}?apikey=${apiKey}`
    );

    // console.log(response);

    if (!response.ok) {
      throw new Error('Erro ao buscar dados da API FMD');
    }

    const data = await response.json();
    
    // console.log("Dados da API FMD:", data);
    res.render('home_user', { 

        layout: false , stokes: data, data_transactions: data_transactions, 
        balance: balance, positiveTotal: positiveTotal, negativeTotal: negativeTotal,
        data_transactions_in: data_transactions_in, data_transactions_out: data_transactions_out,
        incomePercentage: incomePercentage, expensePercentage: expensePercentage
    });

  } catch (error) {
    console.error(error);
    res.render('home_user', { error: 'Erro ao buscar dados da API FMD', layout: false});
  };
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


