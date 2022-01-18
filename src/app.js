const express = require("express"),
  firstPayment = require("./routes/firstPayment"),
  cardEdit = require("./routes/cardEdit"),
  fastPayment = require("./routes/fastPayment");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", firstPayment);
app.use("/", cardEdit);
app.use("/", fastPayment);

app.all("*", async (req, res) => {
  throw { error: "Not Found" };
});

module.exports = app;
