var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var exphbs = require('express-handlebars');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fdg');
var db = mongoose.connection;
var routes = require('./mvc/controllers/index');
var users = require('./mvc/controllers/users');
var User = require('./mvc/models/user');
//var userSystemAdmin = User.
//console.log(User);
//console.log(User.systemAdmin);
// Creating new usertypes
// var userType = require('./mvc/models/userType');
// var systemAdmin = new userType({userTitle: "systemAdmin"});
// var storeAdmin = new userType({userTitle: "storeAdmin"});
// var storeEmployee = new userType({userTitle: "storeEmployee"});
// systemAdmin.save();
// storeAdmin.save();
// storeEmployee.save();
// console.log(systemAdmin);
// console.log(storeAdmin);
// console.log(storeEmployee);

// Init App
var app = express();

//Handlebars Helpers
 var hbs = exphbs.create({
     // Specify helpers which are only registered on this instance.
     helpers: {
         userTypeAdmin: function (userType){ 
 			if(userType === 'Admin'){
 				return true; 
 			}else{
 				return false;
 			}			
 		}		
     }
 });

/*hbhprs.registerHelper('if_eq', function(a, b, opts) {
    if(a === b)
        return opts.fn(this);
    else
        return opts.inverse(this);
}); */

/*var hbs = exphbs.registerHelper('if_userType', function(userType, options) {
  if(userType === "systemAdmin") {
    return true;
  } else {
    return false;
  }
});*/

// View Engine
var viewsPath = path.join(__dirname, 'mvc', 'views');
app.set('views', viewsPath);
app.engine('handlebars', exphbs({defaultLayout:'layout', layoutsDir: path.join(viewsPath, 'layouts')}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    duration: 1 * 60 * 1000,
    activeDuration: 1 * 60 * 1000,
    cookie:{
      maxAge: 60*60*1000
    },
    ephemeral: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(function(req, res, next) {
  if (req.session && req.session.passport) {
    User.user.findOne({ _id: req.session.passport.user }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
