// Disponibiliza o usuário para todas as views

const User = require('../models/User.js'); // Certifique-se de ajustar o caminho do arquivo conforme necessário
const Dbanco = require ('../models/Dados_bancarios.js');

exports.req_user = async (req, res, next) => {
    
    if (req.isAuthenticated()) {
        try {
            const userId = req.user.id;

            // Recupere o usuário com os dados relacionados de Dbanco
            const user = await User.findByPk(userId, {
                include: Dbanco,
            });

            // Adicione o usuário ao res.locals para que seja acessível nas visualizações
            res.locals.user = user;
            console.log('Middleware req_user executado com sucesso.');
            next();
        } catch (error) {
            console.error('Erro ao recuperar usuário:', error);
            next(error);
        }
    } else {
        next();
    }
};
