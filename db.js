const mongoose = require("mongoose");

class MongoService {
  constructor(connectionURL) {
    this.connectionURL = connectionURL;
    this.connection = null;
  }

  connect = async () => {
    this.connection = await mongoose.connect(this.connectionURL);
    return this.connection;
  };

  disconnect() {
    return this.connection?.disconnect();
  }

  dropDb() {
    return mongoose.connection.db.dropDatabase();
  }
}

module.exports = MongoService;
