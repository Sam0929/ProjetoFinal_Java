// Disponibiliza o usuário para todas as views

exports.req_user = (req, res, next) => 
{
    res.locals.user = req.user;
    next();
};