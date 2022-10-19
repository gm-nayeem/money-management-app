const router = require('express').Router()

// Registration Route
router.post('/register', (req, res) => {
    res.json({
        msg: 'Thanks for visiting'
    })
})

// Login Route
router.post('/login', (req, res) => {
    
})

module.exports = router;