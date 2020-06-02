const path = require('path');
const fs = require('fs');

const uuid = require('uuid').v4;

const pathToJson = path.join(__dirname, '..', 'data', 'products.json');

class Product {
  constructor({ price, name, src }) {
    this.price = price;
    this.name = name;
    this.src = src;
    this.id = uuid();
  }

  async save() {
    const content = await Product.readData();

    content.push({
      name: this.name,
      price: this.price,
      src: this.src,
    });

    await Product.writeData(content);
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

module.exports = Product;
