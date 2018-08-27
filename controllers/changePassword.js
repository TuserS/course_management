// Declaration
var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');

// Request Handler
router.get('/', function(req, res){
    req.session.fText = null;
	res.render('changePassword/index');
});

router.post('/', function(req, res){
	var user = {
        current : req.body.current,
		new : req.body.new,
		retype : req.body.retype,
        userid : req.session.loggedUser.userid
	};

    if(user.current == req.session.loggedUser.password && user.new == user.retype) {
        console.log('here ---- ');
        userModel.changePasswordUser(user, function(valid){
    		if(valid)
    		{
    			req.session.loggedUser.password = user.new;

                req.session.sText = 'Password changePassword Successfull';
    			res.redirect('/home');
    		}
    		else
    		{
                req.session.fText = 'Password changePassword Failed';
    			res.redirect('/home');
    		}
    	});
    } else {
        req.session.fText = 'Invalid current password or new and retype password don\'t match';
        res.redirect('/changePassword');

    }
});


// Export (mandatory)
module.exports = router;
