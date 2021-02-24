const express = require('express');
const app = express();

const authApi = require('./routes/auth');

// const UserService = require('./services/users');

const { config } = require('./config/index');

// const usersService = new UserService();

//body parser
app.use(express.json());

// routes
authApi(app);

// app.get('/', function (req, res) {
//   res.send('Hello world');
// });

// app.get('/json', function (req, res) {
//   res.json({ hello: 'world' });
// });

// app.get('/listParams', function (req, res) {
//   usersService.lisTest((listParam) => {
//     res.status(200).json({
//       data: listParam,
//       message: 'user created',
//     });
//   });
// });

app.listen(config.port, function () {
  console.log(`Listening http://lolcahost:${config.port}`);
});