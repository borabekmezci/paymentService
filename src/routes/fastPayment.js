const express = require('express');
const route = express.Router();
const userDB = require('../models/user');
const paymentDB = require('../models/payment');
const { check, validationResult } = require('express-validator');
const makePayment = require('../services/iyzico');

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
            const paymentInfo = {
                paymentID: iyzicoResult.paymentId,
                status: iyzicoResult.status
            }
            if (iyzicoResult.status === 'success') {
                const payment = await paymentDB.findOneAndUpdate(filter, paymentInfo, { new: true });
                res.json({ payment });
            } else {
                const payment = await paymentDB.findOneAndUpdate(filter, paymentInfo, { new: true });
                res.json({ payment, iyzicoResult });
            }
        } catch (error) {
            res.send("There has been an error!");
        }

    });



module.exports = route;