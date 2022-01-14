const express = require('express');
const route = express.Router();
const userDB = require('../models/user');
const { check, validationResult } = require('express-validator');
const makePayment = require('../services/iyzico');

//first payment of existing user!
route.post('/firstPayment/:userID',
    check('price').notEmpty(),
    (req, res) => {
        const error = validationResult(req);
        console.log(error);
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            });
        }


        let price = req.body.price;
        //for test purposes
        console.log('Price is : ', price);
        let filter = {
            userID: req.params.userID
        };
        let update = {
            "$set": {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cardNumber: req.body.cardNumber,
                cardBinNumber: req.body.cardBinNumber,
                cardExpirationMonth: req.body.cardExpirationMonth,
                cardExpirationYear: req.body.cardExpirationYear,
                cardCVC: req.body.cardCVC
            }
        }
        userDB.findOneAndUpdate(filter, update, {
            new: true
        }, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                res.json(user); //for test purposes!!
                console.log('User Card Created!');
                makePayment(price);
            }

        });

    });

module.exports = route;