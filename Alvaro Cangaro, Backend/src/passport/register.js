const User = require('../models/users.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { logger } = require('../logger/index.js');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
const registerStrategy = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return done(null, null, { message: 'El usuario ya existe' });
            }

            const newUser = {
                username,
                password: hashPassword(password),
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };

            const createdUser = await User.create(newUser);

            done(null, createdUser);
        } catch (err) {
            logger.error('Error in user register', err);
            done('Error en registro', null);
        }
    }
);

module.exports = registerStrategy;