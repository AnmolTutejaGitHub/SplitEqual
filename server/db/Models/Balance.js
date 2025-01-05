const mongoose = require('mongoose');
// will keep track of money user own to another user in a group , will updaate if settled
const BalanceSchema = new mongoose.Schema({
    groupid: {
        type: String,
    },

    ownBy: {
        type: String,
    },
    ownTo: {
        type: String,
    },
    amount: {
        type: Number,
    }
});

const Balance = mongoose.model('Balance', BalanceSchema);
module.exports = Balance;