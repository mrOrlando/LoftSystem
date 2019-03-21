const User = require('../models/userModel');
const News = require('../models/newsModel');

module.exports.addUser = function(data) {
  const user = new User({
    username: data.username,
    firstName: data.firstName,
    surName: data.surName,
    middleName: data.middleName,
    image: data.img,
    permission: data.permission,
  });

  user.setPassword(data.password);

  return user.save();
};

module.exports.getUserByName = function(username) {
  return User.findOne({ username });
};

module.exports.getUserById = function(id) {
  return User.findOne({ id });
};

module.exports.updateUser = async function(data) {
  const { password = '', oldPassword = '' } = data;
  delete data.password;

  const user = await User.findOneAndUpdate({ id: data.id }, data);
  if (password && oldPassword && user.isValidPassword(oldPassword)) {
    user.setPassword(password);
    await user.save();
  }

  return user;
};

module.exports.deleteUser = async function(id) {
  const user = await User.findOneAndDelete({ id });
  return user;
};

module.exports.updatePermissions = async function(permissionId, permission) {
  const user = await User.findOne({ permissionId });
  const { news, chat, setting } = user.get('permission');
  const permissions = {
    news: { ...news, ...permission.news },
    chat: { ...chat, ...permission.chat },
    setting: { ...setting, ...permission.setting },
  };
  await User.findOneAndUpdate({ permissionId }, { permission: permissions });
  return permissions;
};

module.exports.getUsers = function() {
  return User.find({});
};

module.exports.getNews = function() {
  return News.find({});
};

module.exports.getNewsById = function(id) {
  return News.findOne({ id });
};

module.exports.getNewsOwnerId = async function(newsId) {
  const newsItem = await this.getNewsById(newsId);
  return newsItem.get('user').id;
};

module.exports.addNews = function(news) {
  const newsItem = new News({
    date: news.date,
    text: news.text,
    theme: news.theme,
    user: news.user,
  });

  return newsItem.save();
};

module.exports.updateNews = function(news) {
  return News.findOneAndUpdate(
    { id: news.id },
    {
      date: news.date,
      text: news.text,
      theme: news.theme,
    }
  );
};

module.exports.deleteNews = function(id) {
  return News.findOneAndDelete({ id });
};
