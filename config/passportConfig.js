var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../mvc/models/user');

if (process.env.NODE_ENV === 'production'){
    // Production passport config
}else{
    // Development passport config
    passport.use(new LocalStrategy(
    (username, password, done) =>{
    User.getUserByUsername(username, (err, user) =>{
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'El usuario ingresado no existe. Verifica nuevamente.'});
        }

        User.comparePassword(password, user.password,(err, isMatch) =>{
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Contraseña inválida. Verifica nuevamente.'});
            }
        });
    });
    }));    
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;