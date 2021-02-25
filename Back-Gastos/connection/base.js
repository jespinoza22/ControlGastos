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
          return results[0];
        }
      );
      return result;
    } catch (error) {
      return console.error('junior Error', error);
    } finally {
      configMySql.end();
    }
  }

  callProcedure(sprocedure, callback) {
    // const list =  this.connect(sprocedure);
    // console.log('listXD', list);
    // return list;
    configMySql.query(sprocedure, true, (error, results, fields) => {
      if (error) {
        return console.error(error.message, 'Errrorx');
      }
      // console.log(results[0]);
      return callback(results[0]);
      //return results[0];
    });
    configMySql.end();
    //console.log('resultado', resultado);
    //return resultado;
  }
}
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

module.exports = mysqlLib;
