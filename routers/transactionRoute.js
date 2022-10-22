const router = require('express').Router()
const {
    getAllTransaction, 
    getSingleTransaction, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction
} = require('../controllers/transactionController')

router.get('/', getAllTransaction)

router.post('/', createTransaction)

router.get('/:transactionId', getSingleTransaction)

router.put('/:transactionId', updateTransaction)

router.delete('/:transactionId', deleteTransaction)


module.exports = router;