require("dotenv").config();
const config = require("config");
const createApp = require("./app");
const connectMongoDb = require("./db");
const log = require("./log");

process.on("uncaughtException", () => {
  log("An unhandeled error accrued");
  process.exit(1);
});
process.on("unhandledRejection", () => {
  log("an unhandeled promise rejection accrued");
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
const app = createApp(PORT);
connectMongoDb(config.get("db"))
  .then(() => {
    app.listen();
  })
  .then(() => {
    log("listening on port 3000");
  });
