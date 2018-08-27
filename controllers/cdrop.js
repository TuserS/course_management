// Declaration
var express = require('express');
var router = express.Router();
var enrollModel = require.main.require('./models/enroll-model');

// Request Handler
router.post('/', function(req, res){

    // console.log(req.body.cid);

    enrollModel.dropEnrollCourse(req.body.cid, req.session.loggedUser.userid, function(valid){
        if(valid)
		{
            req.session.sText = 'Course Drop Successfull';
            res.redirect('/home');
		}
		else
		{
            req.session.fText = 'Course Drop Failed';
            res.redirect('/home');
		}
    });
});


// Export (mandatory)
module.exports = router;
