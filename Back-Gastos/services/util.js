const mysqlLib = require('../connection/base');

class UtilService {
  constructor() {
    this.mysqlDB = new mysqlLib();
  }

  async listParameters(key, callback) {
    //let lista = null;

    var query = `CALL sps_parameter("${key}", 0)`;

    await this.mysqlDB.callProcedure(query, (res) => {
      return callback(res);
    });
  }

  async listCategories(id_type, callback) {
    var query = `CALL sps_cetegory(${id_type})`;
    await this.mysqlDB.callProcedure(query, (res) => {
      return callback(res);
    });
  }
}

module.exports = UtilService;
