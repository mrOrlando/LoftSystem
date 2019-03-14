const User = require('../models/userModel');

module.exports.addUser = function(data) {
  const user = new User({
    username: data.username,
    firstName: data.firstName,
    lastName: data.surName,
    middleName: data.middleName,
    image: data.img,
    permission: data.permission,
  });

  user.setPassword(data.password);

  return user.save();
};
