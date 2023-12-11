const { sequelize } = require('./db.js');
const db = require('./db.js');

const Dbanco = db.sequelize.define('dbancos', {

    transation_type: {
        type: db.Sequelize.BOOLEAN
    },
    value: {
        type: db.Sequelize.FLOAT
    },
    user_id: {
        type: db.Sequelize.INTEGER
    },
});

function checkIfTableExists() {
    try {
        
        sequelize.getQueryInterface().showAllTables()
        
            .then (tables => {
            
            if (tables.includes('dbancos')) {
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