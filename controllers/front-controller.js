const Product = require('../models/products');

module.exports.get = async (req, res) => {
  const products = await Product.readData();
  res.render('index', { title: 'Личная страница Архипова', products });
};

module.exports.post = function (req, res) {
  res.redirect('/');
};
