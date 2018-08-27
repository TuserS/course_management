// Declaration
var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

// Request Handler
router.get('/', function(req, res){
	res.render('editProfile/index');
});

router.post('/', function(req, res){
	var user = {
        name : req.body.name,
		email : req.body.email,
		gender : req.body.gender,
        userid : req.session.loggedUser.userid
	};

	userModel.updateUser(user, function(valid){
		if(valid)
		{
			req.session.loggedUser.name = user.name;
			req.session.loggedUser.email = user.email;
			req.session.loggedUser.gender = user.gender;

            req.session.sText = 'Profile Update Successfull';
			res.redirect('/home');
		}
		else
		{
            req.session.fText = 'Profile Update Failed';
			res.redirect('/home');
		}
	});
});


// Export (mandatory)
module.exports = router;
