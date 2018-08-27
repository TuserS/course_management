// Declaration
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var signin = require('./controllers/signin');
var signup = require('./controllers/signup');
var home = require('./controllers/home');
var editProfile = require('./controllers/editProfile');
var changePassword = require('./controllers/changePassword');
var signout = require('./controllers/signout');
var createCourse = require('./controllers/createCourse');
var addCourse = require('./controllers/addCourse');
var list = require('./controllers/list');
var cdelete = require('./controllers/cdelete');
var cdrop = require('./controllers/cdrop');

var port = 3000;

// Configure
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'My top secret key', saveUninitialized: true, resave: false}));
app.use(cookieParser('secret'));

// Static
app.use(express.static(path.join(__dirname, 'asset')));


// Route
app.use(function(req, res, next) {
  res.locals.sText = req.session.sText;
  res.locals.fText = req.session.fText;
  res.locals.loggedUser = req.session.loggedUser;
  res.locals.report = req.session.report;
  next();
})


app.get('/', function(req, res){
	res.redirect('/signin');
});

app.use('/signin', signin);
app.use('/signup', signup);
app.use('/home', home);
app.use('/editProfile', editProfile);
app.use('/changePassword', changePassword);
app.use('/signout', signout);
app.use('/createCourse', createCourse);
app.use('/addCourse', addCourse);
app.use('/list', list);
app.use('/cdelete', cdelete);
app.use('/cdrop', cdrop);


// Server startup
app.listen(port, function(){
	console.log('Server started at port ' + port);
});
