const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    interval: {
        type: Number
    },
    nextDate: {
        type: Date
    }
});
const subscriptionDB = mongoose.model('subscriptionDB', subscriptionSchema);

module.exports = subscriptionDB;