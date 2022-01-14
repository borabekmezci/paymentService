const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const firstPayment = require("./routes/firstPayment");
const cardEdit = require("./routes/cardEdit");
const fastPayment = require("./routes/fastPayment");
const connectDB = require("./db/connect");

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

dotenv.config({
    path: "config.env",
});
const PORT = process.env.PORT || 8080;

//MongoDB Connection
connectDB();


app.use("/", firstPayment);
app.use("/", cardEdit);
app.use("/", fastPayment);
app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));