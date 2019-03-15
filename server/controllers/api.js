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

module.exports.getNews = async function(req, res) {
  try {
    const news = await db.getNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
