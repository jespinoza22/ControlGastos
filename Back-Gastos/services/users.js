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

  async login(user, callback) {
    //const hashedPassword = await bcrypt.hash(user.spassword, 10);

    //console.log(hashedPassword, user.spassword);

    var query = `CALL sps_login('${user.suser}')`;

    await this.mysqlDB.callProcedure(query, (res) => {
      console.log(res[0].idrespuesta, 'resultado');

      if (res[0].idrespuesta === 0) {
        const objectUser = {
          idrespuesta: '',
          message: '',
          suser: res[0].suser,
          snames: res[0].snames,
          slastname: res[0].slastname,
          slastname2: res[0].slastname2,
          semail: res[0].semail,
        };

        bcrypt.compare(user.spassword, res[0].spassword, function (err, res) {
          if (res) {
            objectUser.idrespuesta = 0;
            objectUser.message = 'Inicio Exitoso';
            callback(objectUser);
          } else {
            objectUser.idrespuesta = -1;
            objectUser.message = 'Ocurrio un error al iniciar sesión';
            objectUser.suser = '';
            objectUser.snames = '';
            objectUser.slastname = '';
            objectUser.slastname2 = '';
            objectUser.semail = '';
            callback(objectUser);
          }
        });
      }
    });
  }
}

module.exports = UserService;
