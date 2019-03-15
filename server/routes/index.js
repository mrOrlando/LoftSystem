const express = require('express');
const router = express.Router();

const controllerApi = require('../controllers/api');


router.post('/api/saveNewUser', controllerApi.saveNewUser);
router.post('/api/login', controllerApi.login);

module.exports = router;
