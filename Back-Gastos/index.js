const express = require('express');
const app = express();

const UserService = require('./services/users');

const { config } = require('./config/index');

const usersService = new UserService();

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.get('/json', function (req, res) {
  res.json({ hello: 'world' });
});

app.get('/listParams', function (req, res) {
  usersService.lisTest((listParam) => {
    res.status(200).json({
      data: listParam,
      message: 'user created',
    });
  });
});

app.listen(config.port, function () {
  console.log(`Listening http://lolcahost:${config.port}`);
});
