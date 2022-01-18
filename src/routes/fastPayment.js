const express = require('express');
const route = express.Router();
const userDB = require('../models/user');
const paymentDB = require('../models/payment');
const { check, validationResult } = require('express-validator');
const makePayment = require('../services/iyzico');
const { db } = require('../models/user');

//payment of existing user!!
route.post('/fastPayment',
    check('price').notEmpty(),
    async(req, res) => {

        const error = validationResult(req);
        console.log(error);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const price = req.body.price;
        const filter = { userID: req.body.userID };

        const user = await userDB.findOne(filter);

        try {
            const iyzicoResult = await makePayment(price, user);
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