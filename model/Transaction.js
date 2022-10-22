const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    note: String
}, {timestamps: true})


const Transacton = mongoose.model('Transaction', TransactionSchema)
module.exports = Transacton;