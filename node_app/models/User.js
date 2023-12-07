const { sequelize } = require('./db.js');
const db = require('./db.js');

const Users = db.sequelize.define('users', {

    name: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    role: {
        type: db.Sequelize.STRING
    }
});


function checkIfTableExists() {
    try {
        
        sequelize.getQueryInterface().showAllTables()
        
            .then (tables => {
            
            if (tables.includes('users')) {
                Users.sync();
                console.log('Tabela sincronizada com sucesso.');
            } else {
                // Se a tabela não existir, cria a tabela
                Users.sync({ force: true });
                console.log('Tabela criada com sucesso.');
            }
        });

       
        
    } catch (error) {
        console.error('Erro ao verificar/sincronizar a tabela:', error);
    }
}

checkIfTableExists();

module.exports = Users;