//this controller is for test usage!!!


const userDB = require('../models/user');
const paymentDB = require('../models/payment');


exports.find = (req, res) => {

    if (req.body.userID) {
        const userID = req.body.userID;

        userDB.findOne(userID)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found user with id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Erro retrieving user with id " + id })
            })

    } else {
        userDB.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }


}