const User = require('../models/users.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const isValidPassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

const loginStrategy = new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });

        if (!user || !isValidPassword(password, user.password)) {
            return done(null, null, { message: 'Credenciales incorrectas' });
        }

        done(null, user);
    } catch (err) {
        console.log('Error en inicio de sesion', err);
        done('Error en login', null);
    }
});

module.exports = loginStrategy;