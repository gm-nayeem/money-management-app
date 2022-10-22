const Transaction = require('../model/Transaction')
const User = require('../model/User')
const {serverError} = require('../utils/error')

module.exports = {
    createTransaction(req, res) {
        const {amount, type, note} = req.body
        let userId = req.user._id

        let transaction = new Transaction({
            amount, type, note, author: userId
        })

        transaction.save() 
            .then(trans => {
                let updatedUser = {...req.user._doc}

                if(type === 'income') {
                    updatedUser.balance += amount
                    updatedUser.income += amount 
                } else if(type === 'expense') {
                    updatedUser.balance -= amount
                    updatedUser.expense += amount 
                }

                updatedUser.transactions.unshift(trans._id)

                User.findByIdAndUpdate(updatedUser._id, {$set: updatedUser}, {new: true})
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction Created Successfully', 
                            ...trans._doc,
                            user: result
                        });
                    })   
                    .catch(err => serverError(res, err));            

            })
            .catch(err => serverError(res, err));
    },

    getAllTransaction(req, res) {
        Transaction.find()
            .then(transaction => {
                if(transaction.length === 0) {
                    res.status(200).json({
                        message: 'No Transaction Found'
                    })
                } else {
                    res.status(200).json(transaction)
                }
            })
            .catch(err => serverError(res, err));
    },

    getSingleTransaction(req, res) {
        const {transactionId} = req.params

        Transaction.findById(transactionId)
            .then(transaction => {
                if(!transaction) {
                    res.status(200).json({
                        message: 'No Transaction Found'
                    })
                } else {
                    res.status(200).json(transaction)
                }
            })
            .catch(err => serverError(res, err));
    },

    updateTransaction(req, res) {
        const {transactionId} = req.params

        Transaction.findByIdAndUpdate(transactionId, {$set: req.body})
            .then(result => {
                res.status(200).json({
                    message: 'Transaction Updated Successfully',
                    ...result
                })
            })
            .catch(err => serverError(res, err));

    }, 

    deleteTransaction(req, res) {
        const {transactionId} = req.params

        Transaction.findByIdAndRemove(transactionId)
            .then(result => {
                res.status(200).json({
                    message: 'Transaction Deleted Successfully',
                    ...result
                })
            })
            .catch(err => serverError(res, err));
    }
}