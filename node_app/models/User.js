const db = require('./db.js');

const Users = db.sequelize.define('users', {

    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    }
});

//Users.sync({force: true});

module.exports = Users;