const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    members: [String], // email
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    transactions: [String],
    createdBy: {
        type: String // email
    }
})


const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;