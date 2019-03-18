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

module.exports.getNews = function() {
  return News.find({});
};
