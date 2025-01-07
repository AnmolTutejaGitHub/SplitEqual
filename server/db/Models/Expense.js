const mongoose = require('mongoose');


const ExpenseSchema = new mongoose.Schema({
    to: {
        type: String, // userid
    },
    text: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
})


const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;