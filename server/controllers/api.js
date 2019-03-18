const db = require('../models/db');

module.exports.saveNewUser = async function(req, res) {
  try {
    const user = await db.addUser(req.body);
    console.log(`User ${user.username} is saved with id ${user.id}`);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.login = async function(req, res) {
  try {
    const user = await db.getUserByName(req.body.username);
    if (user.isValidPassword(req.body.password)) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Неверный логин или пароль!' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.getUsers = async function(req, res) {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.getNews = async function(req, res) {
  try {
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.newNews = async function(req, res) {
  try {
    const user = await db.getUserById(req.body.userId);
    await db.addNews({ ...req.body, user });
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateNews = async function(req, res) {
  try {
    const newsOwnerId = await db.getNewsOwnerId(req.body.id);
    if (newsOwnerId !== req.body.userId) {
      return res
        .status(403)
        .json({ error: 'У вас нет прав на редактирование этой новости!' });
    }

    await db.updateNews(req.body);
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteNews = async function(req, res) {
  try {
    await db.deleteNews(req.params.id);
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
