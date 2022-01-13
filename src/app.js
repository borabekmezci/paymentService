const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const router = require('./routes/router')
const connectDB = require("./db/connect");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

//MongoDB Connection
connectDB();

app.use('/', router);

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));