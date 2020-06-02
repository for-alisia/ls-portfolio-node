const express = require('express');

const adminController = require('../controllers/admin-controller');

const router = express.Router();

router.get('/', adminController.get);

router.post('/upload', adminController.upload);

router.post('/skills', adminController.skills);

module.exports = router;
