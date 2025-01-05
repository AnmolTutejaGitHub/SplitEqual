const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Scema({
    groupid: {
        type: string
    },
    amount: {
        type: Number,
        default: 0
    },
    paidBy: {
        type: String // id
    },
    paidFor: {
        type: String
    },
    paidOn: {
        type: Date
    },
    perPerson: {
        type: Number,
        default: 0
    }
})


const Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;