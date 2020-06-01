const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.redirect('/');
});

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
