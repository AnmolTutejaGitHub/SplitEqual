const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    groupid: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    paidBy: {
        type: String // emailid
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