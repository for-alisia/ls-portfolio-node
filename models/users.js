const path = require('path');
const fs = require('fs');

const psw = require('../utils/password');

const pathToJson = path.join(__dirname, '..', 'data', 'users.json');

class User {
  constructor({ email, hash, salt }) {
    this.email = email;
    this.hash = hash;
    this.salt = salt;
  }

  async save() {
    const users = await User.readData();

    users.push({ email: this.email, hash: this.hash, salt: this.salt });

    await User.writeData(users);
  }

  static async findUser({ email, password }) {
    const users = await User.readData();

    return users.filter(
      (user) =>
        user.email === email &&
        psw.validPassword(password, user.hash, user.salt)
    );
  }

  static async readData() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToJson, 'utf-8', (err, content) =>
        err ? reject(err) : resolve(JSON.parse(content))
      );
    });
  }

  static async writeData(content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(pathToJson, JSON.stringify(content), (err) =>
        err ? reject(err) : resolve()
      );
    });
  }
}

module.exports = User;
