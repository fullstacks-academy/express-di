class User {
  constructor({ name, lastname, repo }) {
    this.repo = repo;
    this.name = name;
    this.lastname = lastname;
  }

  hasLongEnoughName() {
    return this.name.length >= 5;
  }

  async hasUniqueName() {
    const users = await this.repo.find(this.name, 5);
    return users.length === 0;
  }
}

module.exports.User = User;
