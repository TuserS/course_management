// Declaration
var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

// Request Handler
router.get('/', function(req, res){
	res.render('signup/index');
});


router.post('/', function(req, res){

	var user = {
		name : req.body.name,
		email : req.body.email,
		gender : req.body.gender,
		password : req.body.password,
		conpassword : req.body.conpassword,
		role : req.body.role
	};

	userModel.addUser(user, function(valid){
		if(valid)
		{
			req.session.sText = 'Signup Successfull';
			res.redirect('/signin');
		}
		else
		{
			req.session.fText = 'Signup Failed';
			res.redirect('/signin');
		}
	});
});


// Export (mandatory)
module.exports = router;
