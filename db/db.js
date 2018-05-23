var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.1.106",
  user: "root",
  password: "root",
  database : 'socket-chat'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = {
    query: (text, params, callback) => {
        return con.query(text, params, function (err, result) {
		    callback(err, result);
		});
    }
};
