const cron = require("node-cron");
const dotenv = require("dotenv")
const userDB = require('../models/user');
const paymentDB = require('../models/payment');
const subscriptionDB = require('../models/subscription');
const makePayment = require("./iyzico");

dotenv.config({
    path: "config.env",
  });

const price = process.env.PRICE;

const scheduleSubscriptionPayment = () => {
  // Every day at 00:00:00
  cron.schedule("0 0 0 * * *", async() => {
    console.log("Running a task every day, date:", new Date());

    const subscriptions = await subscriptionDB.find({nextDate : {$lt : new Date()}});

        subscriptions.forEach(async (sub)  => {
            const user = await userDB.findOne({userID : sub.userID})
            const iyzicoResult = await makePayment( price , user);
            if (iyzicoResult.status === 'success'){//succesfull payments are recorded to subcriptionDB collection
                const subInfo = {
                    nextDate : new Date(sub.nextDate.getTime() + (parseInt(sub.interval)*parseInt(86400000)))
                }
                const subUpdated = await subscriptionDB.findOneAndUpdate({userID : sub.userID},subInfo, {new : true});
                console.log('Existing subscription is updated to : ',subUpdated);
            }
            const paymentDBInfo = {// every payment of subscriptions whether or not succesfull are recorded to paymentDB
                paymentID: iyzicoResult.paymentId,
                userID: sub.userID,
                status: iyzicoResult.status
            }
            paymentDB.create(paymentDBInfo)
            .then(payment => {
                console.log('Payment Result is Saved : ',payment);
            })
            .catch(err => {console.log('There has been error while updating paymnet result!')});
        }); 
    });  
};

module.exports = scheduleSubscriptionPayment;