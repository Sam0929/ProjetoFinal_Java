const { sequelize } = require('./db.js');
const db = require('./db.js');
const Dbanco = require ('./Dados_bancarios.js');

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
    },
    stokes: {
        type: db.Sequelize.STRING, allowNull: true,
        defaultValue: "null,"
    }
});

Users.hasMany(Dbanco, {foreignKey: 'user_id', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
Dbanco.belongsTo(Users, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});




function checkIfTableExists() {
    try {
        
        sequelize.getQueryInterface().showAllTables()
        
            .then (tables => {
            
            if (tables.includes('users')) {
                Users.sync();
                console.log('Tabela users sincronizada com sucesso.');
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