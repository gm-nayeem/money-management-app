const router = require('express').Router()
const {
    registerController, 
    loginController, 
    getAllUser
} = require('../controllers/userController')

// Registration Route
router.post('/register', registerController)

// Login Route
router.post('/login', loginController)

// Get Users
router.get('/all', getAllUser)


module.exports = router;