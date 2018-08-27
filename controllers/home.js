// Declaration
var express = require('express');
var router = express.Router();
var courseModel = require.main.require('./models/course-model');
// var enrollModel = require.main.require('./models/enroll-model');

// Request Handler
router.get('/', function(req, res) {
    req.session.sText = null;
    req.session.fText = null;

    var userid = req.session.loggedUser.userid;

    if( req.session.loggedUser.role == 'Teacher') {
        courseModel.getTeacherCourse(userid, function(result) {
            res.render('home/index', { course: result});
        });
    } else {
        courseModel.getStudentCourse(userid, function(result){
            res.render('home/index', {course : result});
        });
    }



});


// Export (mandatory)
module.exports = router;
