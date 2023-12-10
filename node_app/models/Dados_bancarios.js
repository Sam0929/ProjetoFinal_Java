const { sequelize } = require('./db.js');
const db = require('./db.js');

const Dbanco = db.sequelize.define('dbanco', {

    balance: {
        type: db.Sequelize.FLOAT
    },
    stock: {
        type: db.Sequelize.STRING
    },
    user_id: {
        type: db.Sequelize.INTEGER
    },
});

function checkIfTableExists() {
    try {
        
        sequelize.getQueryInterface().showAllTables()
        
            .then (tables => {
            
            if (tables.includes('dbanco')) {
                Dbanco.sync();
                console.log('Tabela sincronizada com sucesso.');
            } else {
                // Se a tabela não existir, cria a tabela
                Dbanco.sync({ force: true });
                console.log('Tabela criada com sucesso.');
            }
        });

       
    } catch (error) {
        console.error('Erro ao verificar/sincronizar a tabela:', error);
    }
}

checkIfTableExists();



module.exports = Dbanco;