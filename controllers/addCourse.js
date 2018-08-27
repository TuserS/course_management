// Declaration
var express = require('express');
var router = express.Router();
var courseModel = require.main.require('./models/course-model');
var enrollModel = require.main.require('./models/enroll-model');

// Request Handler
router.get('/', function(req, res){
	courseModel.getCourseID(req.session.loggedUser.userid, function(result){
        // console.log(result);
        if(result.length > 0 ) {
            courseModel.getCourses(result, function(cb){
				// console.log(cb);
                res.render('addCourse/index', { courses : cb});
            })
        } else {
            res.render('addCourse/index', { courses : {}});
        }
    });
});

router.post('/', function(req, res){
	clist = req.body.cbox;

	enrollModel.addCourse(clist, req.session.loggedUser.userid, function(valid){
		if(valid)
		{
            req.session.sText = 'Add Course Successfull';
			res.redirect('/home');
		}
		else
		{
            req.session.fText = 'Add Course Failed';
			res.redirect('/home');
		}
	});
});


// Export (mandatory)
module.exports = router;
