var db = require('./db');

var validateUser = function(user, callback){
	var sql = "SELECT * FROM user WHERE email=? AND password=?";
	var param = [user.email, user.password];
	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			callback(result);
		}

	});
}

var addUser = function(user, callback){
	var sql = "INSERT INTO user (name, email, gender, password, role) VALUES (?, ?, ?, ?, ?)";
	var param = [user.name, user.email, user.gender, user.password, user.role];

	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			callback(true);
		}
	});
}


var updateUser = function(user, callback){

	var sql = "UPDATE user SET name=?, email=?, gender=? WHERE userid=?";
	var param = [user.name, user.email, user.gender, user.userid];

	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			callback(true);
		}
	});
}

var changePasswordUser = function(user, callback){

	var sql = "UPDATE user SET password=? WHERE userid=?";
	var param = [user.new, user.userid];

	db.getData(sql, param ,function(result){
		if(result == null || result.length == 0)
		{
			callback(false);
		}
		else
		{
			callback(true);
		}
	});
}

var getStudents = function(list, cb) {
	var ids = [];
	for (var i = 0; i < list.length; i++) {
		ids.push(list[i].userid)
	}

    var students = [];
    var pending = ids.length;

    for(var i in ids) {
		var sql = "SELECT * FROM user WHERE userid=?";
		var param = [ ids[i] ];

        db.getData(sql, param, function(stu){
            students.push(stu);
            if( 0 === --pending ) {
                cb(students);
            }
        });
    }
}

var getReport = function(cb) {
	var ids = [1, 2, 3, 4, 5, 6];

    var report = [];
    var pending = ids.length;

    for(var i in ids) {
		// console.log(ids[i]);

		if(ids[i] == 1){
			// console.log('1 - '+ ids[i]);
			var sql = "SELECT COUNT(*) AS t FROM user WHERE role=?";
			var param = [ 'Teacher' ];
		} else if(ids[i] == 2){
			// console.log('2 - '+ ids[i]);
			var sql = "SELECT COUNT(*) AS tm FROM user WHERE role=? AND gender=?";
			var param = [ 'Teacher', 'Male' ];
		}else if(ids[i] == 3){
			// console.log('3 - '+ ids[i]);
			var sql = "SELECT COUNT(*) AS tf FROM user WHERE role=? AND gender=?";
			var param = [ 'Teacher', 'Female' ];
		}else if(ids[i] == 4){
			// console.log('4 - '+ ids[i]);
			var sql = "SELECT COUNT(*) AS s FROM user WHERE role=?";
			var param = [ 'Student' ];
		}else if(ids[i] == 5){
			// console.log('4 - '+ ids[i]);
			var sql = "SELECT COUNT(*) AS sm FROM user WHERE role=? AND gender=?";
			var param = [ 'Student', 'Male' ];
		}else if(ids[i] == 6){
			// console.log('4 - '+ ids[i]);
			var sql = "SELECT COUNT(*) AS sf FROM user WHERE role=? AND gender=?";
			var param = [ 'Student', 'Female' ];
		}

        db.getData(sql, param, function(res){
			// console.log(res);
            report.push(res);
            if( 0 === --pending ) {
                cb(report);
            }
        });
    }
}




module.exports.validateUser = validateUser;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
module.exports.changePasswordUser = changePasswordUser;
module.exports.getStudents = getStudents;
module.exports.getReport = getReport;
