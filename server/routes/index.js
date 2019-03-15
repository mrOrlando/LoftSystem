const express = require('express');
const router = express.Router();

const controllerApi = require('../controllers/api');

// users
router.post('/api/saveNewUser', controllerApi.saveNewUser);
router.post('/api/login', controllerApi.login);

// news
router.get('/api/getNews', controllerApi.getNews);

module.exports = router;
