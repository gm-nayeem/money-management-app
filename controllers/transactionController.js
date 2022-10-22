const Transaction = require('../model/Transaction')
const User = require('../model/User')
const serverError = require('../utils/error')

module.exports = {
    create(req, res) {
        const {amount, type, note} = req.body
        let userId = req.user._id

        let transaction = new Transaction({
            amount, type, note, author: userId
        })

        transaction.save() 
            .then(trans => {
                let updatedUser = {...req.user}

                if(type === 'income') {
                    updatedUser.balance += amount
                    updatedUser.income += amount 
                } else if(type === 'expense') {
                    updatedUser.balance -= amount
                    updatedUser.expense += amount 
                }

                updatedUser.transaction.unshift(trans._id)

                User.findByIdAndUpdate(updatedUser._id, {$set: updatedUser})

                res.status(201).json({
                    message: 'Transaction Created Successfully', 
                    ...trans
                });

            })
            .catch(err => serverError(res, err));
    }
}