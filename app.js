const express = require("express");
const { UserController } = require("./UserController");
const { MongooseUserRepo } = require("./UserRepo");

function createApp() {
  const app = express();
  const repo = new MongooseUserRepo();
  const userController = new UserController(repo);

  app.get("/api/users/", userController.getUsers);

  return app;
}

module.exports = createApp;
