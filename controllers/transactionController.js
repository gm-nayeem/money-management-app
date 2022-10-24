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
                    updatedUser.balance = (updatedUser.balance + Number(amount))
                    updatedUser.income = (updatedUser.income + Number(amount ))
                } else if(type === 'expense') {
                    updatedUser.balance = (updatedUser.balance - Number(amount))
                    updatedUser.expense = (updatedUser.expense + Number(amount))
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
        let {_id} = req.user
        Transaction.find({author: _id})
            .then(transaction => {
                // if(transaction.length === 0) {
                //     res.status(200).json({
                //         message: 'No Transaction Found'
                //     })
                // } 
                res.status(200).json(transaction)
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

        Transaction.findOneAndUpdate({_id: transactionId}, {$set: req.body}, {new: true})
            .then(result => {
                res.status(200).json({
                    message: 'Transaction Updated Successfully',
                    transaction: result
                })
            })
            .catch(err => serverError(res, err));

    }, 

    deleteTransaction(req, res) {
        const {transactionId} = req.params

        Transaction.findOneAndDelete({_id: transactionId})
            .then(result => {
                res.status(200).json({
                    message: 'Transaction Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(err => serverError(res, err));
    }
}