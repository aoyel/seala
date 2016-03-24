var mysql = require('mysql');
var config = require('../config/config');


var connection = mysql.createConnection(config.database);

connection.connect(function(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});


module.exports = connection;