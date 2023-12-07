const User = require('../models/User');
const bcrypt = require('bcrypt');

const initializeApp = async () => {
    try {
      // Verifique se o usuário já existe
      const existingUser = await User.findOne({ where: { email: 'vaninisamuel1324@gmail.com' } });
  
      if (!existingUser) {
        // Se não existir, crie o usuário inicial
        const hashedPassword = await bcrypt.hash('1234', 10);
        await User.create({
          name: 'Samuel',
          email: 'vaninisamuel1324@gmail.com',
          password: hashedPassword,
          role: 'admin'
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