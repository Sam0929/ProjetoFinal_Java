const { body, validationResult } = require('express-validator');
const bcrypt = require ('bcrypt');
const Dbanco = require ('../models/Dados_bancarios.js');
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
  try {

    const data_transactions = await Dbanco.findAll({ where: { user_id: req.user.dataValues.id } });
    // const apiKey = '27Pbu8Kw18B0cIh1JOUBgefgGe80h4bB'; //'6DTJBAXQPLNZO4EE';  Chave da API FMD
    // const symbol = 'IBM'; // Símbolos das ações desejadas

    // const response = await fetch(
    // `https://financialmodelingprep.com/api/v3/stock-price-change/${symbol}?apikey=${apiKey}`
    // );

    // if (!response.ok) {
    //   throw new Error('Erro ao buscar dados da API FMD');
    // }

    // const data = await response.json();
    const data = [
        {
          "symbol": "AAPL",
          "name": "Apple Inc.",
          "price": 195.71,
          "changesPercentage": 0.7412,
          "change": 1.44,
          "dayLow": 193.67,
          "dayHigh": 195.99,
          "yearHigh": 198.23,
          "yearLow": 124.17,
          "marketCap": 3043838488000,
          "priceAvg50": 180.9752,
          "priceAvg200": 176.0961,
          "exchange": "NASDAQ",
          "volume": 49677887,
          "avgVolume": 55608009,
          "open": 194.2,
          "previousClose": 194.27,
          "eps": 6.14,
          "pe": 31.87,
          "earningsAnnouncement": "2024-01-31T10:59:00.000+0000",
          "sharesOutstanding": 15552800000,
          "timestamp": 1702069201
        },
        {
          "symbol": "IBM",
          "name": "International Business Machines Corporation",
          "price": 161.96,
          "changesPercentage": 1.086,
          "change": 1.74,
          "dayLow": 160,
          "dayHigh": 162.04,
          "yearHigh": 162.79,
          "yearLow": 120.55,
          "marketCap": 147888753240,
          "priceAvg50": 147.2304,
          "priceAvg200": 137.43375,
          "exchange": "NYSE",
          "volume": 4553990,
          "avgVolume": 4152734,
          "open": 160,
          "previousClose": 160.22,
          "eps": 7.76,
          "pe": 20.87,
          "earningsAnnouncement": "2024-01-23T10:59:00.000+0000",
          "sharesOutstanding": 913119000,
          "timestamp": 1702069202
        },
        {
          "symbol": "GOOGL",
          "name": "Alphabet Inc.",
          "price": 134.99,
          "changesPercentage": -1.4168,
          "change": -1.94,
          "dayLow": 134.025,
          "dayHigh": 136.4,
          "yearHigh": 141.22,
          "yearLow": 84.86,
          "marketCap": 1697794626344,
          "priceAvg50": 133.5032,
          "priceAvg200": 121.5674,
          "exchange": "NASDAQ",
          "volume": 30300291,
          "avgVolume": 28051368,
          "open": 134.2,
          "previousClose": 136.93,
          "eps": 5.23,
          "pe": 25.81,
          "earningsAnnouncement": "2024-01-31T21:00:00.000+0000",
          "sharesOutstanding": 12577188135,
          "timestamp": 1702069201
        }
      ];
    
    console.log(data);
    res.render('home_user', { layout: false , data, data_transactions: data_transactions});

  } catch (error) {
    console.error(error);
    res.render('home_user', { error: 'Erro ao buscar dados da API FMD', layout: false});
  }
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


