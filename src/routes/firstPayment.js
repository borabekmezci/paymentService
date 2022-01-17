const express = require('express');
const route = express.Router();
const userDB = require('../models/user');
const paymentDB = require('../models/payment');
const { check, validationResult } = require('express-validator');
const makePayment = require('../services/iyzico');

//first payment of existing user!
route.post('/firstPayment/',
    check('price').notEmpty(),
    async(req, res) => {
        const error = validationResult(req);
        console.log(error);
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array()
            });
        }


        const price = req.body.price;
        //for test purposes
        console.log('Price is : ', price);
        const filter = {
            userID: req.body.userID
        };

        const userInfo = await userDB.findOne(filter);

        //!!for iyzico service!!
        const user = {
                cardHolderName: userInfo.cardHolderName,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                cardNumber: req.body.cardNumber,
                cardBinNumber: req.body.cardBinNumber,
                cardExpirationMonth: req.body.cardExpirationMonth,
                cardExpirationYear: req.body.cardExpirationYear,
                cardCVC: req.body.cardCVC
            }
            //!!for creating user card informaitions!!
        const update = {
            cardNumber: req.body.cardNumber,
            cardBinNumber: req.body.cardBinNumber,
            cardExpirationMonth: req.body.cardExpirationMonth,
            cardExpirationYear: req.body.cardExpirationYear,
            cardCVC: req.body.cardCVC
        }


        try {
            const iyzicoResult = await makePayment(price, user);
            if (iyzicoResult.status === 'success') {
                const updatedUser = await userDB.findOneAndUpdate(filter, update, { new: true });

                const paymentInfo = {
                    paymentID: iyzicoResult.paymentId,
                    status: iyzicoResult.status
                }
                const payment = await paymentDB.findOneAndUpdate(filter, paymentInfo, { new: true });

                res.json({ payment, updatedUser });
            } else {
                const paymentInfo = {
                    paymentID: iyzicoResult.paymentId,
                    status: iyzicoResult.status
                }
                const payment = await paymentDB.findOneAndUpdate(filter, paymentInfo, { new: true });
                console.log('Fail Payment : ', payment);
                res.json({ paymentResult, payment });
            }
        } catch (error) {
            res.send("There has been an error!");
        }



    });

module.exports = route;