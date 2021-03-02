const express = require('express');
const passport = require('passport');
const IncomeService = require('../services/income');

//JWT strategy
require('../utils/auth/jwt');

function incomeApi(app) {
  const router = express.Router();
  app.use('/api/income', router);
  const incomeService = new IncomeService();

  router.post(
    '/save',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { body: income } = req;
      try {
        incomeService.saveIncome(income, (result) => {
          res.status(200).json({
            data: result,
            //message: 'user created',
          });
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/search',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { body: filter } = req;
      try {
        incomeService.listIncome(filter, (result) => {
          res.status(200).json({
            data: result,
            //message: 'user created',
          });
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/delete/:id_income',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { id_income } = req.params;
      try {
        await incomeService.deleteIncome(id_income, (result) => {
          res.status(200).json({
            data: result,
          });
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = incomeApi;
