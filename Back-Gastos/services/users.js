const bcrypt = require('bcrypt');
const mysqlLib = require('../connection/base');

class UserService {
  constructor() {
    this.mysqlDB = new mysqlLib();
  }

  async lisTest(callback) {
    let lista = null;
    await this.mysqlDB.callProcedure(
      'CALL sps_parameter("KEY_TIPO", 0)',
      (res) => {
        callback(res);
      }
    );
    console.log('lista', lista);
    return lista;
  }
}

module.exports = UserService;
