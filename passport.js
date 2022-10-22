//const passport = require('passport');

let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./model/User')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRETKEY';

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        User.findOne({_id: payload._id})
            .then(user => {
                if(!user) {
                    return done(null, false)
                } else {
                    return done(null, user)
                }
            })
            .catch(err => {
                console.log(err)
                return done(err)
            });
        
    }));
}