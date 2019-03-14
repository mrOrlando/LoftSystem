const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = getDbConnectionString();
mongoose.connect(url, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection is opened', url);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose was disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection was disconnected, app terminated');
    process.exit(0);
  });
});

function getDbConnectionString() {
  return (
    'mongodb+srv://' +
    process.env.DB_USER +
    ':' +
    process.env.DB_PASSWORD +
    '@mongocluster01-eubml.mongodb.net/test?retryWrites=true'
  );
}
