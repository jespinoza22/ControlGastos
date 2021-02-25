const mysqlLib = require('../connection/base');

class UtilService {
  constructor() {
    this.mysqlDB = new mysqlLib();
  }

  async listParameters(key, callback) {
    //let lista = null;

    var query = `CALL sps_parameter("${key}", 0)`;

    await this.mysqlDB.callProcedure(query, (res) => {
      console.log('result', res);
      return callback(res[0]);
    });
    //console.log('lista', lista);
    //return lista;
  }
}

module.exports = UtilService;
