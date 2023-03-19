const { User } = require("./User");

class UserController {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }

  getUsers = async (req, res) => {
    try {
      const userDto = {
        name: req.query.name,
        lastname: req.query.lastname,
      };

      if (userDto.name == null) {
        res.status(400).send({ error: "Name required" });
        return;
      }

      const user = new User({
        name: userDto.name,
        lastname: userDto.lastname,
        repo: this.userRepo,
      });

      if (!user.hasLongEnoughName()) {
        res.status(400).send({ error: "Too short" });
        return;
      }

      if (!(await user.hasUniqueName())) {
        res.status(400).send({ error: "Username is not unique" });
        return;
      }

      const users = await this.userRepo.find();
      res.send(users);
    } catch (e) {
      return res.status(500);
    }
  };
}

module.exports.UserController = UserController;
