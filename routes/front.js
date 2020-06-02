const express = require('express');

const frontController = require('../controllers/front-controller');

const router = express.Router();

router.post('/', frontController.post);

router.get('/', frontController.get);

module.exports = router;
