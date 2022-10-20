const validator = require('validator')

const validate = (user) => {
    let errors = {}

    if(!user.name) {
        errors.name = 'Please Provide Your Name'
    }

    if(!user.email) {
        errors.email = 'Please Provide Your Email'
    } else if(!validator.isEmail(user.email)) {
        errors.email = 'Please Provide A Valid Email'
    }

    if(!user.password) {
        errors.password = 'Please Provide Your Password'
    } else if(user.password.length < 6) {
        errors.password = "Password Must be Greater or Equal 6 Character"
    }

    if(!user.confirmPassword) {
        errors.confirmPassword = 'Please Provide Confirmation Password'
    } else if(user.password !== user.confirmPassword) {
        errors.confirmPassword = "Password Doesn't Match"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}

module.exports = validate;