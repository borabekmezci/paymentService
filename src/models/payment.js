const mongoose = require('mongoose');

let paymentSchema = new mongoose.Schema({
    paymentID: {
        type: String
    },
    userID: {
        type: String
    }
});
const paymentDB = mongoose.model('paymentDB', paymentSchema);

module.exports = paymentDB;