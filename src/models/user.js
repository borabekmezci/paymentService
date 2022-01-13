const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userID: {
        type: String
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    cardNumber: {
        type: Number,
    },
    cardBinNumber: {
        type: Number,
    },
    cardExpirationMonth: {
        type: Number,
    },
    cardExpirationYear: {
        type: Number,
    },
    cardCVC: {
        type: Number,
    }
});
const userDB = mongoose.model('userDB', userSchema);

module.exports = userDB;