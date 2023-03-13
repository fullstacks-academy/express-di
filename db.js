const log = require("./log");
const mongoose = require("mongoose");

async function connectMongoDb(DB) {
  try {
    await mongoose.connect(DB);
    log(`Connected to ${DB}`);
  } catch (error) {
    log(error);
  }
}

module.exports = connectMongoDb;
