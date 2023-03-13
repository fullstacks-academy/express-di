require("dotenv").config();
const config = require("config");
const mongoose = require("mongoose");

const log = console.log;
const express = require("express");

const app = express();

process.on("uncaughtException", () => {
  log("An unhandeled error accrued");
  process.exit(1);
});
process.on("unhandledRejection", () => {
  log("an unhandeled promise rejection accrued");
  process.exit(1);
});

connectMongoDb(config.get("db"));

const Users = mongoose.model(
  "users",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

app.get("/api/someValue/", async (req, res) => {
  res.send(await Users.find());
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => log(`listening on port ${PORT}`));

module.exports = server;

async function connectMongoDb(DB) {
  try {
    await mongoose.connect(DB);
    log(`Connected to ${DB}`);
  } catch (error) {
    log(error);
  }
}
