const { body, validationResult } = require('express-validator');
const Dbanco = require ('../models/Dados_bancarios.js');

exports.cad = (req, res) => {
    res.render('transations');
};


exports.add = async (req, res) => {
    try {
        // Manualmente define as regras de validação
        await body('transaction_type').notEmpty().withMessage('O tipo da transação é necessário!').run(req);
        await body('value').notEmpty().withMessage('O campo valor é obrigatório!').run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('', { errors: errors.array() });
        }

        const user = req.user;

        const userId = user.dataValues.id;
        console.log(userId);
        const { transaction_type, value} = req.body;

        await Dbanco.create({

            transation_type: transaction_type,
            value: value,
            user_id: userId
        });

        req.flash('success_msg', 'Transação registrada com sucesso!');
        res.redirect('/user/home');

    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Falha no registro!');
        res.redirect('/user/home');
    }
}