const path = require('path');
const fs = require('fs');
const passport = require('passport');
const uuidv1 = require('uuid/v1');
const formidable = require('formidable');
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

module.exports.saveUserImage = async function(req, res) {
  try {
    const userId = req.params.id;
    const form = new formidable.IncomingForm();
    const upload = path.join(process.cwd(), 'server', 'public', 'upload');

    if (!fs.existsSync(upload)) {
      fs.mkdirSync(upload);
    }

    form.uploadDir = path.join(upload);

    form.parse(req, async function(err, fields, files) {
      if (err) {
        if (fs.existsSync(files.photo.path)) {
          fs.unlinkSync(files.photo.path);
        }
        console.error(err);
        return res.status(400).json({ error: 'Возникла ошибка при обработке' });
      }

      const { name, size, path: filePath } = files[userId];
      if (name === '' || size === 0) {
        if (fs.existsSync(files.photo.path)) {
          fs.unlinkSync(files.photo.path);
        }
        console.error(err);
        return res.status(400).json({ error: 'Не загружена картинка' });
      }

      const fileName = path.join(upload, name);
      fs.renameSync(filePath, fileName);

      const dir = path.join('/', 'upload', name);
      res.json({ path: dir });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.login = function(req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }

    if (!user) {
      return res.status(401).json({ error: 'Неверный логин или пароль!' });
    }

    req.logIn(user, async err => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
      }

      if (req.body.remembered) {
        const token = uuidv1();
        user.setToken(token);
        await db.updateUser(user);
        res.cookie('access_token', token, {
          maxAge: 7 * 60 * 60 * 1000,
          path: '/',
          httpOnly: false,
        });
      }

      res.json(user);
    });
  })(req, res, next);
};

module.exports.authFromToken = async function(req, res) {
  try {
    const user = await db.getUserByToken(req.body.access_token);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateUser = async function(req, res) {
  try {
    const user = await db.updateUser(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.deleteUser = async function(req, res) {
  try {
    const user = await db.deleteUser(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports.updatePermissions = async function(req, res) {
  try {
    const permissionId = req.params.id;
    const permission = await db.updatePermissions(
      permissionId,
      req.body.permission
    );
    res.json({ permissionId, permission });
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
