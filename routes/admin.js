const express = require('express');

const adminController = require('../controllers/admin-controller');
const isAdminMdl = require('../middlewares/isAdmin');

const router = express.Router();

router.get('/', isAdminMdl, adminController.get);

router.post('/upload', isAdminMdl, adminController.upload);

router.post('/skills', isAdminMdl, adminController.skills);

module.exports = router;
