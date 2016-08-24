'use strict';
const router = require('express').Router();
const passport = require('../../config/passportConfig');

module.exports = () => {
    let routes = {
    	'GET': {
			// GENERAL PORPOUSE ROUTES
    		'/': (req, res, next) => {
    			if (!req.user)
    				res.render('login', {layout: 'auth', login: false});
    			else{
    				res.redirect('/dashboard');
    			}
    		},
    		'/dashboard': (req, res, next) => {
				if(userAdmin(req.user)){
					res.redirect('/admin/dashboard');
				}else{
					res.redirect('/users/dashboard');
				}
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
			},
			'/users/forgotpassword': (req, res, next) => {
				
			}
    	},
    	'POST': {
			'/login': (req, res, next) => {
				passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/',failureFlash: true}),
				(req, res) => {res.redirect('/');}
			},
			'/logout': (req, res, next) => {
				req.logout();
				req.flash('success_msg', 'Ha cerrado sesión exitosamente.');
				res.redirect('/');			
			},			
    		'/register': (req, res, next) => {
				let User = require('../models/user');
				let store = require("../models/store");
				let userType = require('../models/userType');
				let company = require("../models/company");
				
				let username = req.body.username;
				let email = req.body.email;
				let password = req.body.password;
				let password2 = req.body.password2;
				let name = req.body.name;
				let lastname = req.body.lastname;
				let userTypebody = req.body.userType;
			
				// Validation
				req.checkBody('name', 'Name is required').notEmpty();
				req.checkBody('lastname', 'Lastname is required').notEmpty();
				req.checkBody('email', 'Email is required').notEmpty();
				req.checkBody('email', 'Email is not valid').isEmail();
				req.checkBody('username', 'Username is required').notEmpty();
				req.checkBody('password', 'Password is required').notEmpty();
				req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

				var errors = req.validationErrors();
				var newUser;
				var usrParams = {username: username, email:email, password: password, name: name, lastname: lastname};
				
				if(errors){
					res.render('register',{layout: 'auth',
						errors:errors
					});
				}else{
					
				userType.findOne({userTitle: userTypebody}, (err, usrt) =>{
				
				//Assigning User Type
					if (err) throw err;
						usrParams.userType_id = usrt._id;

					//Assigning User Params
					if (userTypebody === "systemAdmin"){
						usrParams.pin = 9999;
						newUser = new User.systemAdmin(usrParams);
						User.createUser(newUser, (err, user) =>{
							if(err) throw err;
						});          
					}else 
					if (userTypebody === "storeAdmin"){
						
						company.findOne({companyName: "Default company"}, (err, cny) => {
							if (err) throw err;
							usrParams.company_id = cny._id;
							newUser = new User.storeAdmin(usrParams);
							User.createUser(newUser, (err, user) =>{
								if(err) throw err;
							});
						});
					}else{
						store.findOne({storeName: "Default store"}, (err, st) => {
							if (err) throw err;
							usrParams.store_id = st._id;
							newUser = new User.storeEmployee(usrParams);
							User.createUser(newUser, (err, user) =>{
								if(err) throw err;
							});
						});
					}
				});					
					req.flash('success_msg', 'Has sido registrado satisfactoriamente. Te llegará un correo de confirmación una vez el administrador autorice tu cuenta');
					res.redirect('/');
				}				
			}
    	},
    	'NA': (req, res, next) => {
    		res.status(404).sendFile(__dirname + '/views/layouts/notFound')
    	}
    }
    
    let registerRoutes = (routes, method) => {
    	for (let key in routes){
    		if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array))
    			// Recursive function
    			registerRoutes(routes[key], key);
    		else{
    			// Registering the routes
    			if (method === 'GET')
    				router.get(key, routes[key]);
    			else if (method === 'POST')
    				router.post(key, routes[key]);
    				else
    					router.post(key, routes[key]);
    			console.log(key);
    		}
    	}
    }
    
    registerRoutes(routes);
    return router;
}

const userAdmin = (user) => {
	let userType = require('../models/userType');
	userType.findOne({_id: user.userType_id}, (err, usr) => {
		if(err) console.log(err);
		if(usr.userTitle === "SystemAdmin"){
			return true;
		}else{
			return false;
		}
	});
}