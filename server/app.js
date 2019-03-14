const express = require('express');
require('dotenv').config();
require('./models');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'text/plain' })); // fix bug from frontent
app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`The app is listening on port ${port}!`);
});
