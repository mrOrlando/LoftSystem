const uuidv1 = require('uuid/v1');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsScheme = new Schema(
  {
    id: {
      type: String,
      default: uuidv1(),
    },
    date: String,
    text: String,
    theme: String,
    user: Object,
  },
  { versionKey: false }
);

const News = mongoose.model('news', newsScheme);

module.exports = News;
