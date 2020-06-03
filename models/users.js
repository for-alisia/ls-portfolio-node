const path = require('path');
const fs = require('fs');

const pathToJson = path.join(__dirname, '..', 'data', 'users.json');

class User {
  static async findUser({ email, password }) {
    const users = await User.readData();

    return users.filter(
      (user) => user.email === email && user.password === password
    );
  }

  static async readData() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToJson, 'utf-8', (err, content) =>
        err ? reject(err) : resolve(JSON.parse(content))
      );
    });
  }
}

module.exports = User;
