const bcrypt = require('bcryptjs');
const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    id: {
      type: String,
      default: uuidv1(),
    },
    username: {
      type: String,
      required: [true, 'Define the username'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Define the password'],
    },
    access_token: {
      type: String,
      default: uuidv1(),
    },
    firstName: String,
    surName: String,
    middleName: String,
    image: {
      type: String,
      default: '',
    },
    permissionId: {
      type: String,
      default: uuidv1(),
    },
    permission: {
      chat: {
        C: { type: Boolean },
        R: { type: Boolean },
        U: { type: Boolean },
        D: { type: Boolean },
      },
      news: {
        C: { type: Boolean },
        R: { type: Boolean },
        U: { type: Boolean },
        D: { type: Boolean },
      },
      setting: {
        C: { type: Boolean },
        R: { type: Boolean },
        U: { type: Boolean },
        D: { type: Boolean },
      },
    },
  },
  { versionKey: false }
);

userScheme.methods.setPassword = function(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  this.password = hash;
};

userScheme.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userScheme);

module.exports = User;
