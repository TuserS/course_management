var db = require('./db');

var getStudentID = function(courseid, callback){
	var sql = "SELECT userid FROM enroll WHERE courseid=?";
	var param = [courseid];

	db.getData(sql, param ,function(result){
		callback(result);
	});
}


var addCourse = function(ids, uid, cb) {
    var pending = ids.length;

    for(var i in ids) {
		var sql = "INSERT INTO enroll (userid, courseid ) VALUES (?, ?)";
		var param = [ uid, ids[i] ];

        db.getData(sql, param, function(result){
            if( 0 === --pending ) {
				cb(true);
            }
        });
    }
}


var dropEnrollCourse = function(courseid, userid, callback){
	var sql = "DELETE FROM enroll WHERE userid=? and courseid=?";
	var param = [userid, courseid];

	db.getData(sql, param ,function(result){
		callback(true);
	});
}




module.exports.getStudentID = getStudentID;
module.exports.addCourse = addCourse;
module.exports.dropEnrollCourse = dropEnrollCourse;
