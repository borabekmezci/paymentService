const cron = require("node-cron");

const scheduleSubscriptionPayment = () => {
  // Every day at 00:00:00
  cron.schedule("0 0 0 * * *", () => {
    console.log("Running a task every day, date:", new Date());

    /**
     * TODO: Get records from Subscription collection
     * We should have a logic to understand payment is needed or not.
     * Then call makePayment service
     * Note: It is ok to change Subscription schema if needed.
     *
     * */
  });
};

module.exports = scheduleSubscriptionPayment;
