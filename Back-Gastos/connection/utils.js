let connection = require('./base');

let query = 'CALL sps_parameter("KEY_TIPO", 0)';

connection.query(query, true, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results[0]);
});

connection.end();
