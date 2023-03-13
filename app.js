const express = require("express");
const Users = require("./User");

function createApp(port) {
  const app = express();

  app.get("/api/users/", async (req, res) => {
    res.send(await Users.find());
  });

  function listen() {
    return new Promise((resolve) => {
      app.listen(port, () => {
        resolve(app);
      });
    });
  }

  return { listen };
}

module.exports = createApp;
