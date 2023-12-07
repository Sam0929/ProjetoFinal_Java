// middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Substitua pelo caminho correto do seu modelo de usuário

const loggedIn = async (req, res, next) => {
    try {
        // Verifique se o cookie 'userSave' está presente na requisição
        if (!req.cookies.userSave) {
            return res.status(401).render('login', { errors: [{ msg: 'Você precisa fazer login para acessar esta página.' }] });
        }

        // Decodifique o token JWT
        const token = req.cookies.userSave;
        const decoded = jwt.verify(token, process.env.SECRET);
        
        // Consulte o usuário no banco de dados usando o ID do token
        const user = await User.findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(401).render('login', { errors: [{ msg: 'Usuário não encontrado.' }] });
        }

        // Adicione o objeto do usuário à requisição para uso posterior nas rotas
        req.user = user;

        // Continue para a próxima função de middleware ou rota
        next();
    } catch (err) {
        console.error(err);
        res.status(401).render('login', { errors: [{ msg: 'Token inválido.' }] });
    }
};



module.exports = loggedIn;
