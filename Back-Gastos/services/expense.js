const mysqlLib = require('../connection/base');

class ExpenseServive {
  constructor() {
    this.mysqlDB = new mysqlLib();
  }

  async saveExpense(expense, callback) {
    var query = `CALL spi_create_expense(${expense.idExpense}, ${expense.idCoin}, ${expense.idCategory}, '${expense.dateExpense}', '${expense.description}', ${expense.amount}, ${expense.idUser})`;

    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res[0]);
    });
  }

  async listExpense(filter, callback) {
    var query = `CALL sps_list_expense(${filter.nid_user}, '${filter.dateStart}', '${filter.dateEnd}', ${filter.id_category}, '${filter.description}')`;
    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res);
    });
  }

  async deleteExpense(idExpense, callback) {
    var query = `CALL spu_delete_expense(${idExpense})`;
    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res[0]);
    });
  }
}

module.exports = ExpenseServive;
