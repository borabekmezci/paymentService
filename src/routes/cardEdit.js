const express = require('express');
const route = express.Router();
const userDB = require('../models/user');

route.post('/card/edit/:userID', (req, res) => {
    let filter = { userID: req.params.userID };
    let update = {
        "$set": {
            cardNumber: req.body.cardNumber,
            cardBinNumber: req.body.cardBinNumber,
            cardExpirationMonth: req.body.cardExpirationMonth,
            cardExpirationYear: req.body.cardExpirationYear,
            cardCVC: req.body.cardCVC
        }
    }
    userDB.findOneAndUpdate(filter, update, { new: true }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            res.json(user); //for test purposes!
            console.log('User Informations Updated!!!');
        }

    });

});

module.exports = route;