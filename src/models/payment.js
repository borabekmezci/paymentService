const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String
    },
    userID: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failure'],
        default: 'pending'
    }
});
const paymentDB = mongoose.model('paymentDB', paymentSchema);

module.exports = paymentDB;