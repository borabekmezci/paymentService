const dotenv = require("dotenv"),
  connectDB = require("./db/connect"),
  { app } = require("./app");

dotenv.config({
  path: "config.env",
});
const PORT = process.env.PORT || 8080;

//MongoDB Connection
connectDB();

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
