const mongoose = require('mongoose');

let subscriptionSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    interval: {
        type: Number
    },
    lastDate: {
        type: Date
    }
});
const subscriptionDB = mongoose.model('subscriptionDB', subscriptionSchema);

module.exports = subscriptionDB;