const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home');
const controllerApi = require('../controllers/api');

router.get('/', controllerHome.get);

router.post('/api/saveNewUser', controllerApi.saveNewUser);

module.exports = router;
