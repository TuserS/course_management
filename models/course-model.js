var db = require('./db');

var createCourse = function(course, callback){
	var sql = "INSERT INTO course (code, name, teacher, userid) VALUES (?, ?, ?, ?)";
	var param = [course.code, course.name, course.teacher, course.userId];

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


var getTeacherCourse = function(userid, callback){
	var sql = "SELECT * FROM course WHERE userid=?";
	var param = [userid];

	db.getData(sql, param ,function(result){
		callback(result);
	});
}

var getStudentCourse = function(userid, callback){
	var sql = "SELECT * FROM course INNER JOIN enroll ON course.courseid = enroll.courseid and enroll.userid=?";
	var param = [userid];

	db.getData(sql, param ,function(result){
		callback(result);
	});
}

var getCourseID = function(userid, callback){
	var sql = "SELECT courseid FROM course WHERE courseid NOT IN (SELECT courseid FROM enroll WHERE userid=?)";
	var param = [userid];

	db.getData(sql, param ,function(result){
		callback(result);
	});
}

var getCourses = function(list, cb) {
	var ids = [];
	for (var i = 0; i < list.length; i++) {
		ids.push(list[i].courseid)
	}

    var courses = [];
    var pending = ids.length;

    for(var i in ids) {
		var sql = "SELECT * FROM course WHERE courseid=?";
		var param = [ ids[i] ];

        db.getData(sql, param, function(stu){
            courses.push(stu);
            if( 0 === --pending ) {
                cb(courses);
            }
        });
    }
}

var deleteCourse = function(courseid, callback){
	var sql = "DELETE FROM course WHERE courseid=?";
	var param = [ courseid ];

	db.getData(sql, param ,function(result){
		callback(true);
	});
}



module.exports.getTeacherCourse = getTeacherCourse;
module.exports.getStudentCourse = getStudentCourse;
module.exports.createCourse = createCourse;
module.exports.getCourseID = getCourseID;
module.exports.getCourses = getCourses;
module.exports.deleteCourse = deleteCourse;
