const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.static(__dirname + '/public'));

app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`The app is listening on port ${port}!`);
});
