const { body, validationResult } = require('express-validator');
const Dbanco = require ('../models/Dados_bancarios.js');
const stokesSymbols = require ('../views/public/list_symbols.json');

exports.cad = (req, res) => {
    res.render('transations');
};


exports.add = async (req, res) => {
    try {
        // Manualmente define as regras de validação
        await body('name').notEmpty().withMessage('O nome da transação é necessário!').run(req);
        await body('description').notEmpty().withMessage('A descrição da transação é necessária!').run(req);
        await body('value').notEmpty().withMessage('O campo valor é obrigatório!').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('', { errors: errors.array() });
        }

        const user = req.user;

        const userId = user.dataValues.id;

        const { name, description, value } = req.body;

        await Dbanco.create({

            name: name,
            description: description,
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

exports.stokes = (req, res) => {

    const stokes = req.user.dataValues.stokes.replace("null,", "").split(",");
    res.render('stokes', {layout: false, stokesSymbols, stokes});
};

exports.addStokes = async (req, res) => {
    try {

        const user = res.locals.user;
        // Manualmente define as regras de validação
        await body('stoke').notEmpty().withMessage('O símbolo do ativo é necessário!').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('stokes', { errors: errors.array() });
        }

        const atualStokes = user.dataValues.stokes;

        user.stokes = atualStokes + "," + req.body.stoke;
        console.log(user.stokes);
        user.save()
            .then(() => {
                req.flash('success_msg', 'Ações atualizadas com sucesso!');
                res.redirect('/user/home');
            })
            .catch((erro) => {
                req.flash('error_msg', 'Erro ao atualizar as ações!');
                res.redirect('/user/home');
            });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Erro ao adicionar ação!');
        res.redirect('/user/home');
    };
}

exports.deleteStokes = async (req, res) => {
    try {

        const user = res.locals.user;
        // Manualmente define as regras de validação
        await body('stoke').notEmpty().withMessage('O símbolo do ativo é necessário!').run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Se houver erros de validação, renderize a página do formulário novamente com os erros
            return res.render('stokes', { errors: errors.array() , layout:false});
        }

        const atualStokes = user.dataValues.stokes;
        const removeStoke = req.body.stoke + ",";
        console.log(removeStoke);
        user.stokes = atualStokes.replace(removeStoke, "");
        console.log(user.stokes);
        user.save()
            .then(() => {
                req.flash('success_msg', 'Ações atualizadas com sucesso!');
                res.redirect('/user/stokes');
            })
            .catch((erro) => {
                req.flash('error_msg', 'Erro ao atualizar as ações!');
                res.redirect('/user/stokes');
            });
    } catch (error) {
        console.error(error);
        req.flash('error_msg', 'Erro ao remover ação!');
        res.redirect('/user/home');
    };
}
