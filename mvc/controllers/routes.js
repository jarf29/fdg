'use strict';
const controller = require('./controller');
const passport = require('../../config/passportConfig');

module.exports = () => {
    let routes = {
    	'GET': {
			// GENERAL PORPOUSE ROUTES
    		'/': (req, res, next) => {
    			if (!req.user)
    				res.render('login', {layout: 'auth', login: false});
    			else
    				res.redirect('/dashboard');
    		},
    		'/login': (req, res, next) => {
    			res.render('login', {layout: 'auth', login: true});
    		},
    		'/logout': (req, res, next) => {
				req.logout();
				req.flash('success_msg', 'Ha cerrado sesión exitosamente.');
				res.redirect('/');
    		},    		
    		'/register': (req, res, next) => {
    			res.render('register', {layout: 'auth', login: false});
    		},
    		'/dashboard': (req, res, next) => {
    			if (req.user){
					if(userAdmin(req.user)){
						res.redirect('/admin/dashboard');
					}else{
						res.redirect('/users/dashboard');
					}    				
    			}else
    					res.redirect('/');
    		},
			// ADMIN ROUTES
			'/admin/dashboard': (req, res, next) => {
				let tickets = require("../models/ticket");
				tickets.find({}).populate('store_id').populate('storeEmployee_id').exec((err, tkts) => {
					res.render('admin_tickets', {userTypeAdmin: true, tkts});
				});
			},
			'/admin/manage_users': (req, res, next) => {
				if (!req.user)
					res.redirect('/');
				else
					res.render('admin_users', {layout: 'layout', userTypeAdmin: true});				
			},
			// USERS ROUTES
			'/users/register': (req, res, next) => {

			},
			'/users/dashboard': (req, res, next) => {
				if (req.user.userApproval)
					res.render('custom_dashboard', {userTypeAdmin: false});
				else
					res.render('unauthorized', {layout: 'accessDenied'});				
			}
    	},
    	'POST': {
    		'/login': (req, res, next) => {
			  passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/',failureFlash: true}),
				(req, res) => {res.redirect('/');}
    		}
    	},
    	'NA': (req, res, next) => {
    		let path = process.cwd() + '/mvc/views/layouts/notFound.handlebars';
    		res.status(404).sendFile(path);
    	}
    }
    
    return controller.route(routes);
}

const userAdmin = (user) => {
	if(user){
		let userType = require('../models/userType');
		userType.findOne({_id: user.userType_id}, (err, usr) => {
			if(err) console.log(err);
			if(usr.userTitle === "SystemAdmin"){
				return true;
			}else{
				return false;
			}
		});
	}else
		return false;
}