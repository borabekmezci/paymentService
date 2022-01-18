const express = require('express');
const route = express.Router();
const userDB = require('../models/user');
const paymentDB = require('../models/payment');
const { check, validationResult } = require('express-validator');
const makePayment = require('../services/iyzico');
const { db } = require('../models/user');

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
            //!!for creating user card informations!!
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
            }
            const paymentDBInfo = {
                paymentID: iyzicoResult.paymentId,
                userID: req.body.userID,
                status: iyzicoResult.status
            }
            const payment = await paymentDB(paymentDBInfo);
            db.collection('paymentdbs').insertOne(payment);
            res.json({ iyzicoResult });

        } catch (error) {
            res.json({ error: 'There has been an Error!!' });
        }
    });

module.exports = route;