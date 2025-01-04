const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Scema({
    groupid: {
        type: string
    },
    amount: {
        type: Number,
        default: 0
    },
    sender: {
        type: String // id
    },
    paidFor: {
        type: String
    }
})


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;