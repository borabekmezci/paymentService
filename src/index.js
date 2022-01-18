const dotenv = require("dotenv"),
  connectDB = require("./db/connect"),
  app = require("./app"),
  scheduleSubscriptionPayment = require("./services/cron");

dotenv.config({
  path: "config.env",
});
const PORT = process.env.PORT || 8080;

//MongoDB Connection
connectDB();

scheduleSubscriptionPayment();

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
