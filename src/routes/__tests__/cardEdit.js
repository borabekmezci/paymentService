const request = require("supertest"),
  app = require("../../app"),
  unitTestHelper = require("../../test/unitTestHelper"),
  userDB = require("../../models/user");

const userID = "1234567";

beforeAll(async () => {
  await unitTestHelper.setup();

  userDB.create({
    userID,
    firstName: "test",
    lastName: "testLast",
    cardNumber: "1234123412341234",
    cardBinNumber: "555",
    cardExpirationMonth: "12",
    cardExpirationYear: "2022",
    cardCVC: "555",
  });
});

beforeEach(async () => {
  //
});

afterAll(async () => {
  await unitTestHelper.stop();
});

it("edits the card details successfully", async () => {
  const reqBody = {
    userID,
    cardNumber: 99999,
  };

  await request(app).post("/card/edit").send(reqBody).expect(200);

  let dbRecord = await userDB.findOne({ userID });
  return expect(dbRecord.cardNumber).toEqual(reqBody.cardNumber);
});
