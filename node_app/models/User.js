const db = require('./db.js');

const Users = db.sequelize.define('users', {

    nome: {
        type: db.Sequelize.STRING
    },
    sobrenome: {
        type: db.Sequelize.STRING
    },
    idade: {
        type: db.Sequelize.INTEGER
    },
    email: {
        type: db.Sequelize.STRING
    }
});

//Users.sync({force: true});

module.exports = Users;