const express = require('express');
const route = express.Router();
const userDB = require('../models/user');

route.post('/card/edit', async(req, res) => {
    const filter = { userID: req.body.userID };
    const update = {

        cardNumber: req.body.cardNumber,
        cardBinNumber: req.body.cardBinNumber,
        cardExpirationMonth: req.body.cardExpirationMonth,
        cardExpirationYear: req.body.cardExpirationYear,
        cardCVC: req.body.cardCVC

    }
    try {
        const updatedUser = await userDB.findOneAndUpdate(filter, update, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.send('There has been an error with updating the user with user id : ' + filter);
    }
});

module.exports = route;