// Declaration
var express = require('express');
var router = express.Router();
var courseModel = require.main.require('./models/course-model');

// Request Handler
router.get('/', function(req, res){
	res.render('createCourse/index');
});


router.post('/', function(req, res){
	var course = {
		code : req.body.code,
		name: req.body.name,
		teacher : req.session.loggedUser.name,
		userId : req.session.loggedUser.userid
	};
	courseModel.createCourse(course, function(valid){
		if(valid)
		{
			req.session.sText = 'New Course added Successfully';
			res.redirect('/home');
		}
		else
		{
			req.session.fText = 'Failed to create new course';
			res.redirect('/home');
		}
	});
});


// Export (mandatory)
module.exports = router;
