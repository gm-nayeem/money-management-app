const router = require('express').Router()
const {registerController, loginController} = require('../controllers/userController')

// Registration Route
router.post('/register', registerController)

// Login Route
router.post('/login', loginController)

module.exports = router;