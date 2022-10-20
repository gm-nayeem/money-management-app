const bcrypt = require('bcrypt');
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')

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
                        return res.status(400).json({
                            message: 'Email Already Exist'
                        })
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if(err) {
                            return res.status(500).json({
                                message: 'Server Error Occurred'
                            })
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
                            .catch(err => {
                                res.status(500).json({
                                    message: 'Server Error Occurred'
                                })
                            })

                    });

                    
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Server Error Occurred'
                    })
                })
        }



    },

    loginController(req, res) {
        const {email, password} = req.body
        const validate = loginValidator({email, password})

        if(!validate.isValid) {
            return res.status(400).json(validate,errors)
        }

        
    }
}