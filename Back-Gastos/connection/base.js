var mysql = require('mysql');

var configMySql = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  database: 'ControlGastos',
  user: 'root',
  password: 'root',
});

class mysqlLib {
  connect(sprocedure) {
    try {
      const result = configMySql.query(
        sprocedure,
        true,
        (error, results, fields) => {
          if (error) {
            return console.error(error.message);
          }
          //console.log(results[0]);
          configMySql.end();
          return results[0];
        }
      );
      return result;
    } catch (error) {
      configMySql.end();
      return console.error('junior Error', error);
    }
  }

  callProcedure(sprocedure, callback) {
    // const list =  this.connect(sprocedure);
    // console.log('listXD', list);
    // return list;
    configMySql.query(sprocedure, true, (error, results, fields) => {
      if (error) {
        console.log(error, 'error call procedure');
        return callback(null);
      }
      return callback(results[0]);
    });
  }
}

module.exports = mysqlLib;
