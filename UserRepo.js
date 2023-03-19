const mongoose = require("mongoose");

class UserRepo {
  find(_name, _limit) {}

  create(_name) {}
}

const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({ name: String })
);

class MongooseUserRepo {
  find(name, limit) {
    return UserModel.find({ name }, {}, { limit });
  }

  create(name) {
    const user = new UserModel({ name });
    return user.save();
  }
}

class PostgresUserRepo {
  find(_name, _limit) {
    return [];
  }
}

module.exports = {
  UserRepo,
  MongooseUserRepo,
  PostgresUserRepo,
};
