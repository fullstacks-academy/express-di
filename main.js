require("dotenv").config();

const config = require("config");
const createApp = require("./app");
const log = require("./log");
const http = require("http");
const MongoService = require("./db");

const PORT = process.env.PORT || 3000;

const app = createApp(PORT);
const server = http.createServer(app);
const db = new MongoService(config.get("db"));

db.connect().then(() => {
  log("Connected to DB");
  server.listen(3000, log("Listening on port 3000"));
});
