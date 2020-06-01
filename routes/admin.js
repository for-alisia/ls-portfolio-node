const express = require('express');

const products = require('../models/products');
const skills = require('../models/skills');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin');
});

router.post('/upload', (req, res) => {
  const { name, price } = req.body;
  products.push({ name, price });
  res.redirect('/admin');
});

router.post('/skills', (req, res) => {
  const { age, concerts, cities, years } = req.body;
  skills.age = age;
  skills.concerts = concerts;
  skills.cities = cities;
  skills.years = years;
  res.redirect('/admin');
});

module.exports = router;
