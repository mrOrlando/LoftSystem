const express = require('express');
const router = express.Router();

const controllerApi = require('../controllers/api');

// users
router.post('/api/saveNewUser', controllerApi.saveNewUser);
router.post('/api/login', controllerApi.login);
router.get('/api/getUsers', controllerApi.getUsers);
router.put('/api/updateUser/:id', controllerApi.updateUser);
router.put('/api/updateUserPermission/:id', controllerApi.updatePermissions);

// news
router.get('/api/getNews', controllerApi.getNews);
router.post('/api/newNews', controllerApi.newNews);
router.put('/api/updateNews/:id', controllerApi.updateNews);
router.delete('/api/deleteNews/:id', controllerApi.deleteNews);

module.exports = router;
