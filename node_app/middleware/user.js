// Disponibiliza o usuário para todas as views

exports.req_user = async (req, res, next) => {
    
    if (req.isAuthenticated()) {
        try {
            // Adicione o usuário ao res.locals para que seja acessível nas visualizações
            res.locals.user = req.user;
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
