const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');
require('dotenv').config();
require('./models');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'text/plain' })); // fix bug from frontent
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: true,
    saveUninitialized: false,
    ephemeral: true,
    rolling: true,
  })
);

require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`The app is listening on port ${port}!`);
});
