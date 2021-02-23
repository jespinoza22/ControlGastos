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

  async createUser(user, callback) {
    const hashedPassword = await bcrypt.hash(user.spassword, 10);

    var query = `CALL spi_create_user('${user.suser}', '${hashedPassword}', '${user.snames}', '${user.slastname}', 
                '${user.slastname2}', '${user.semail}', '${user.sphone}', '${user.saddress}', ${user.nid_user_register})`;

    await this.mysqlDB.callProcedure(query, (res) => {
      callback(res);
    });
  }
}

module.exports = UserService;
