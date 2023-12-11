const User = require('../models/User');
const Dbanco = require('../models/Dados_bancarios');
const bcrypt = require('bcrypt');

const initializeApp = async () => {
    try {
      // Verifique se o usuário já existe
      const existingUser = await User.findOne({ where: { email: 'vaninisamuel1324@gmail.com' } });
  
      if (!existingUser) {
        // Se não existir, crie o usuário inicial
        const hashedPassword = await bcrypt.hash('1234', 10);

        const newUser = await User.create({
          name: 'Samuel',
          email: 'vaninisamuel1324@gmail.com',
          password: hashedPassword,
          role: 'admin'
        });

        let userId = newUser.dataValues.id;
        
        await Dbanco.create({
            name: 'Salário',
            description: 'Salário do mês de abril',
            value: 1000,
            user_id: userId
        });

        await Dbanco.create({
            name: 'Aluguel',
            description: 'Aluguel do mês de abril',
            value: -500,
            user_id: userId
        });


  
        console.log('Usuário inicial criado com sucesso.');
      } else {
        console.log('Usuário inicial já existe.');
      }
    } catch (error) {
      console.error('Erro ao inicializar a aplicação:', error.message);
    }
};

  module.exports = initializeApp;