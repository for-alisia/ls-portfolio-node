const path = require('path');
const fs = require('fs');

const pathToJson = path.join(__dirname, '..', 'data', 'skills.json');

class Skill {
  constructor({ age, concerts, cities, years }) {
    this.age = age;
    this.concerts = concerts;
    this.cities = cities;
    this.years = years;
  }

  async save() {
    const content = await Skill.readData();

    content.forEach((item) => {
      if (item.key === 'age' && item.number !== this.age) {
        item.number = this.age;
      }

      if (item.key === 'concerts' && item.number !== this.concerts) {
        item.number = this.concerts;
      }

      if (item.key === 'cities' && item.number !== this.cities) {
        item.number = this.cities;
      }

      if (item.key === 'years' && item.number !== this.years) {
        item.number = this.years;
      }
    });

    await Skill.writeData(content);
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

module.exports = Skill;
