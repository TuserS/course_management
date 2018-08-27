// Declaration
var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

// Request Handler
router.get('/', function(req, res){
	req.session.sText = null;
	req.session.fText = null;
	res.render('signin/index');

});

router.post('/', function(req, res){
	var user = {
		email: req.body.email,
		password: req.body.password
	};

	userModel.validateUser(user, function(valid){
		if(valid != false)
		{
			var now = {
				userid : valid[0].userid,
				name : valid[0].name,
				email : valid[0].email,
				gender : valid[0].gender,
				password : valid[0].password,
				role : valid[0].role
			}
			req.session.loggedUser = now;

			userModel.getReport(function(rp){

				var report = {
					t : rp[0][0].t,
					tm : rp[1][0].tm,
					tf : rp[2][0].tf,
					s : rp[3][0].s,
					sm : rp[4][0].sm,
					sf : rp[5][0].sf,
				}

				req.session.report = report;

				res.redirect('/home');
			});

		}
		else
		{
			req.session.fText = 'Invalid username or password';
			res.redirect('/signin');
		}
	});
});


// Export (mandatory)
module.exports = router;
