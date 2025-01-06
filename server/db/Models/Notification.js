const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
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


const Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;