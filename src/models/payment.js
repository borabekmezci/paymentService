const mongoose = require('mongoose');

let paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String
    },
    userID: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'fail'],
        default: 'pending'
    }
});
const paymentDB = mongoose.model('paymentDB', paymentSchema);

module.exports = paymentDB;