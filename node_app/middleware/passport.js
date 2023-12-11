const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function(passport) {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Match user
        const user = await User.findOne({
          where: {
            email: email
          }
        });

        if (!user) {
          return done(null, false, { message: 'Email não registrado' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Senha incorreta' });
        }
      } catch (err) {
        console.error(err);
        return done(err);
      }
    })
  );

  passport.serializeUser(function(user, done) {

    done(null, user.id);

  });

  passport.deserializeUser(async function(id, done) {

    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });
  
};
