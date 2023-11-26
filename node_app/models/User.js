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


async function checkIfTableExists() {
    try {
        
        const table = await Users.describe();

       
        if (table) {
            await Users.sync();
            console.log('Tabela sincronizada com sucesso.');
        } else {
            // Se a tabela não existir, cria a tabela
            await Users.sync({ force: true });
            console.log('Tabela criada com sucesso.');
        }
    } catch (error) {
        console.error('Erro ao verificar/sincronizar a tabela:', error);
    }
}

checkIfTableExists();

module.exports = Users;