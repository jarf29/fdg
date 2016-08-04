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

// Init App
var app = express();

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
