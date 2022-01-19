const cron = require("node-cron");
const dotenv = require("dotenv")
const userDB = require('../models/user');
const paymentDB = require('../models/payment');
const subscriptionDB = require('../models/subscription');
const { db } = require('../models/user');
const makePayment = require("./iyzico");

dotenv.config({
    path: "config.env",
  });

const price = process.env.PRICE;
const interval = parseInt(process.env.INTERVAL);// 1 day of Interval for every succesfull subscriptions

const scheduleSubscriptionPayment = () => {
  // Every day at 00:00:00
  cron.schedule("0 * * * * *", async() => {//checking every minute for test purpose!
    console.log("Running a task every day, date:", new Date());
    const sub = await subscriptionDB.find();

    if(sub){
        for (let i = 0;sub[i].nextDate<=new Date();i++){//if sub[0].nextdate > sub[1].nextdate ==>not working!
            const user = await userDB.findOne({userID : sub[i].userID});
            const iyzicoResult = await makePayment(price , user);
            
            if (iyzicoResult.status === 'success'){//succesfull payments recording to subcriptionDB collection
                const subInfo = {
                    nextDate : new Date(sub[i].nextDate.getTime() + interval)
                }
                const subUpdated = await subscriptionDB.findOneAndUpdate({userID : sub[i].userID},subInfo, {new : true});
                console.log(subUpdated);
            }
            const paymentDBInfo = {// every payment of subscriptions whether or not succesfull are recording to paymentDB
                paymentID: iyzicoResult.paymentId,
                userID: sub[i].userID,
                status: iyzicoResult.status
            }
            const payment = await paymentDB(paymentDBInfo);
            db.collection('paymentdbs').insertOne(payment);
            console.log(payment);
        }
    }
  });
};

module.exports = scheduleSubscriptionPayment;