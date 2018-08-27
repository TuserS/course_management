var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node',
  port:3307
});

module.exports = {
	getData: function(sql, param, callback){
		if(param == null)
		{
			connection.query(sql, function(err, res){
				if(err)
				{
					console.log('Error db.js - ' + err);
					callback(null);
				}
				else
				{
					callback(res);
				}
			});
		}
		else
		{
			connection.query(sql, param, function(err, res){
				if(err)
				{
					console.log('Error db.js - ' + err);
					callback(null);
				}
				else
				{
					callback(res);
				}
			});
		}

	}
};
