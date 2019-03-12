const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home');

router.get('/', controllerHome.get);

module.exports = router;
