const express = require('express');
const passport = require('passport');
const ExpenseServive = require('../services/expense');
const { params } = require('../utils/params');

//JWT strategy
require('../utils/auth/jwt');

function expenseApi(app) {
  const router = express.Router();
  app.use(`${params.urlAPi}api/expense`, router);
  const expenseService = new ExpenseServive();

  router.post(
    '/save',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { body: expense } = req;
      try {
        expenseService.saveExpense(expense, (result) => {
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
        expenseService.listExpense(filter, (result) => {
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
    '/delete/:id_expense',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { id_expense } = req.params;
      try {
        await expenseService.deleteExpense(id_expense, (result) => {
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

module.exports = expenseApi;
