const { MongoMemoryServer } = require("mongodb-memory-server"),
  mongoose = require("mongoose");

let mongo;

const unitTestHelper = {
  setup: async () => {
    mongo = new MongoMemoryServer();
    await mongo.start();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },
  stop: async () => {
    await mongo.stop();
    if(mongoose.connection.readyState === 1){
        await mongoose.connection.close();
    }    
  },
  clear: async () => {
    // Delete all existing collections, it is not needed for now.
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  },
};

module.exports = unitTestHelper;
