// Declaration
var express = require('express');
var router = express.Router();
var courseModel = require.main.require('./models/course-model');
var enrollModel = require.main.require('./models/enroll-model');
var userModel = require.main.require('./models/user-model');

// Request Handler
router.get('/:courseid', function(req, res) {
    enrollModel.getStudentID(req.params.courseid, function(result){
        if(result.length > 0 ) {
            userModel.getStudents(result, function(cb){
                res.render('list/index', { students : cb});
            })
        } else {
            res.render('list/index', { students : {}});
        }
    });
});


// Export (mandatory)
module.exports = router;
