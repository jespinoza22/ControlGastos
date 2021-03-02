const mysqlLib = require('../connection/base');

class IncomeService {
  constructor() {
    this.mysqlDB = new mysqlLib();
  }

  async saveIncome(income, callback) {
    var query = `CALL spi_create_income(${income.idIncome}, ${income.idCoin}, ${income.idCategory}, '${income.dateIncome}', '${income.description}', ${income.amount}, ${income.idUser})`;

    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res[0]);
    });
  }

  async listIncome(filter, callback) {
    var query = `CALL sps_list_income(${filter.nid_user}, '${filter.dateStart}', '${filter.dateEnd}', ${filter.id_category}, '${filter.description}')`;
    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res);
    });
  }

  async deleteIncome(idincome, callback) {
    var query = `CALL spu_delete_income(${idincome})`;
    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res[0]);
    });
  }
}

module.exports = IncomeService;
