const passport = require('passport')
const {resourceError} = require('./utils/error')

module.exports = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if(err) {
            console.log(info)
            console.log(err)
            return next(err)
        }

        if(!user) {
            // return resourceError(res, 'Authentication Failed')
            return res.status(400).json({
                message: "Authentication failed !!"
            })
        }

        req.user = user
        return next()
        
    })(req, res, next)
}