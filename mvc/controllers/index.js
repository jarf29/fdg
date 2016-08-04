var express = require('express');
var router = express.Router();

var userType = require('../models/userType');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log("The user session is "+ req.session.id);
	res.redirect('/users/dashboard');	
});

// Admin Dashboard
router.get('/admin/dashboard', function(req, res){
	if(!req.user){
		res.redirect('/');
	}else{
	    userType.findOne({ userTitle: "systemAdmin"}, function(err, usert) {
	        if (usert._id.toString() == req.user.userType_id)
	            res.render('dashboard', {userTypeAdmin: true});
    	    else
    	        res.render('dashboard', {userTypeAdmin: false});
	    });
	}
});

// Admin Manage Users
router.get('/admin/manage_users', function(req, res){
	if (!req.user)
		res.redirect('/');
	else
		res.render('admin_users', {layout: 'layout', userTypeAdmin: true});
});

// Admin Appointments
router.get('/admin/appointments', function(req, res){
	if (!req.user)
		res.redirect('/');
	else	
		res.render('appointments', {layout: 'layout', userTypeAdmin: true});
});

// Customers->Companies
router.get('/admin/customers/companies', ensureAuthenticated,function(req, res){
	res.render('admin_customers_companies', {layout: 'layout', userTypeAdmin: true});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.render('login', {layout: 'auth', login: true});
	}
}

module.exports = router;
