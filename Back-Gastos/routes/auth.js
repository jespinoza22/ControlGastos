const express = require('express');
const passport = require('passport');
//const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const UserService = require('../services/users');
const config = require('../config/index');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);
  const userService = new UserService();

  router.post('/sign-in', async function (req, res, next) {
    const { body: user } = req;

    try {
      userService.login(user, (result) => {
        res.status(200).json({
          data: result,
          //message: 'user created',
        });
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req;

    try {
      userService.createUser(user, (userCreate) => {
        res.status(200).json({
          data: userCreate,
          //message: 'user created',
        });
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;
