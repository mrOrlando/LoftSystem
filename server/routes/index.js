const express = require('express');
const router = express.Router();

const controllerHome = require('../controllers/home');
const controllerApi = require('../controllers/api');

router.get('/', controllerHome.get);

router.post('/api/saveNewUser', controllerApi.saveNewUser);
router.post('/api/login', controllerApi.login);

module.exports = router;
