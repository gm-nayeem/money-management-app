const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const {serverError, resourceError} = require('../utils/error')

module.exports = {
    registerController(req, res) {
        const {name, email, password, confirmPassword} = req.body
        const validate = registerValidator({name, email, password, confirmPassword})

        if(!validate.isValid) {
            res.status(400).json(validate.errors)
        } else {
            User.findOne({email})
                .then(user => {
                    if(user) {
                        return resourceError(res, 'Email Already Exist') 
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if(err) {
                            return serverError(res, err)
                        }

                        let user = new User({
                            name,
                            email,
                            password: hash
                        })

                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                            })
                            .catch(err => serverError(res, err))

                    });

                    
                })
                .catch(err => serverError(res, err))
        }
    },

    loginController(req, res) {
        const {email, password} = req.body
        const validate = loginValidator({email, password})

        if(!validate.isValid) {
            return res.status(400).json(validate.errors)
        }

        User.findOne({email})
            .then(user => {
                if(!user) {
                    return resourceError(res, 'User Not Found')
                }

                bcrypt.compare(password, user.password, function(err, result) {
                    if(err) {
                        return serverError(res, err)
                    }
                    if(!result) {
                        return resourceError(res, "Password Doesn't Match")
                    }

                    var token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        balance: user.balance,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRETKEY', {expiresIn: '1h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                });
            })
            .catch(err => serverError(res, err))
    }
}