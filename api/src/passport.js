const { Users } = require("./models/index.js");
const PassportLocal = require('passport-local').Strategy;


module.exports = function(passport) {
    passport.use(new PassportLocal({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        Users.findOne({
                where: {
                    email: username,
                }
            })
            .then((user) => {
                if (user === null) {
                    return done(null, false, { message: "O usuário nao existe" })
                }
                if (user.password !== password) {
                    return done(null, false, { message: "Senha incorreta" })
                }
                return done(null, user);
            })
            .catch(err => {
                done(err);
            })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.idUser);
});

passport.deserializeUser(function(idUser, done) {
    Users.findByPk(idUser)
        .then(user => {
            done(null, user)

        })
        .catch(err => {
            done(err);
        })

});

};
