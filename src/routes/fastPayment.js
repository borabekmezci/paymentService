const express = require('express');
const route = express.Router();
const userDB = require('../models/user');
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

        userDB.findOne(filter, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500);
                res.send("Error Has Occured");
            } else {
                const result = makePayment(price, user);
                res.json({ user }); //test purposes!

            }

        });

    });



module.exports = route;