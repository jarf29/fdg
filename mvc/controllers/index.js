var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log("The user session is "+ req.session.id);
	res.redirect('/users/dashboard');	
});

// Admin Appointments
router.get('/admin/appointments', ensureAuthenticated,function(req, res){
	res.render('appointments', {layout: 'layout', userTypeAdmin: true});
});

// Customers->Cities
router.get('/admin/customers/cities', ensureAuthenticated,function(req, res){
	res.render('admin_customers_cities', {layout: 'layout', userTypeAdmin: true});
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
