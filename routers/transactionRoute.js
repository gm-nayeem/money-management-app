const router = require('express').Router()
const {
    getAllTransaction, 
    getSingleTransaction, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction
} = require('../controllers/transactionController')

const authenticate = require('../authenticate')

router.get('/', authenticate, getAllTransaction)

router.post('/', authenticate, createTransaction)

router.get('/:transactionId', authenticate, getSingleTransaction)

router.put('/:transactionId', authenticate, updateTransaction)

router.delete('/:transactionId', authenticate, deleteTransaction)


module.exports = router;