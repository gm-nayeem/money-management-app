const validator = require('validator')

const validate = (user) => {
    let errors = {}

    if(!user.email) {
        errors.email = 'Please Provide Your Email'
    } else if(!validator.isEmail(user.email)) {
        errors.email = 'Please Provide A Valid Email'
    }

    if(!user.password) {
        errors.password = 'Please Provide Your Password'
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}

module.exports = validate;