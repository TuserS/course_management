// Declaration
var express = require('express');
var router = express.Router();
var courseModel = require.main.require('./models/course-model');

// Request Handler
router.post('/', function(req, res){

    courseModel.deleteCourse(req.body.cid, function(valid){
        if(valid)
		{
            req.session.sText = 'Course Delete Successfull';
            res.redirect('/home');
		}
		else
		{
            req.session.fText = 'Course Delete Failed';
            res.redirect('/home');
		}
    });
});


// Export (mandatory)
module.exports = router;
