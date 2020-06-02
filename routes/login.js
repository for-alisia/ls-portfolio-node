const express = require('express');

const loginController = require('../controllers/login-controller');

const router = express.Router();

router.get('/', loginController.get);

router.post('/', loginController.post);

module.exports = router;
