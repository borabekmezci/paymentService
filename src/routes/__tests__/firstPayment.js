const request = require("supertest"),
  app = require("../../app"),
  unitTestHelper = require("../../test/unitTestHelper"),
  userDB = require("../../models/user"),
  paymentDB = require("../../models/payment");


const price = 15;
const userID1 = "1234567";
const userID2 = "1234";

beforeAll(async () => {
  await unitTestHelper.setup();

  userDB.create({
    userID : "1234567",
    cardHolderName: "success success",
    firstName: "success",
    lastName: "success",
    cardNumber: null,
    cardBinNumber: null,
    cardExpirationMonth: null,
    cardExpirationYear: null,
    cardCVC: null,
  },{
    userID:"1234",
    cardHolderName: "fail fail",
    firstName: "fail",
    lastName: "fail",
    cardNumber: "4111111111111129",
    cardBinNumber: "411111",
    cardExpirationMonth: "12",
    cardExpirationYear: "2022",
    cardCVC: "555"
  });
  userDB.create();
});

beforeEach(async () => {
  //
});

afterAll(async () => {
  await unitTestHelper.stop();
});

it("payment done successfully", async () => {
  const reqBody = {
    userID : userID1,
    price,
    cardNumber: "5890040000000016",
    cardBinNumber: "555",
    cardExpirationMonth: "12",
    cardExpirationYear: "2022",
    cardCVC: "555",
  };
  const update = {
    cardNumber: "5890040000000016",
    cardBinNumber: "555",
    cardExpirationMonth: "12",
    cardExpirationYear: "2022",
    cardCVC: "555",
  }

  const response = await request(app).post("/firstPayment").send(reqBody).expect(200);
  
  let updateResponse = await userDB.findOneAndUpdate({userID : userID1}, update);
  let dbRecord = await paymentDB.findOne({ userID:'1234567' });
  return expect(dbRecord.status).toEqual('success');
});
it("payment done successfully!!FAILLLL", async () => {
    const reqBody = {
        userID: userID2,
        price,
        cardNumber: "4111111111111129",
        cardBinNumber: "411111",
        cardExpirationMonth: "12",
        cardExpirationYear: "2022",
        cardCVC: "555", 
    };
    const response = await request(app).post("/firstPayment").send(reqBody).expect(200);
    console.log(response.status);
    let dbRecord = await paymentDB.findOne({ userID : userID2 });
    return expect(dbRecord.status).toEqual('failure');
  });