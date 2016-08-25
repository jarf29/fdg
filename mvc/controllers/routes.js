'use strict';
const controller = require('./controller');
// const passport = require('../../config/passportConfig');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user').user;

module.exports = () => {
    let routes = {
    	'GET': {
			// General purposes routes
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
			// Admin routes
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
			// Users routes
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
    			console.log("Entró en login Ja");
				passport.use(new LocalStrategy(
				  function(username, password, done) {
				   User.getUserByUsername(username, function(err, user){
				   	if(err) throw err;
				   	if(!user){
				   		return done(null, false, {message: 'El usuario ingresado no existe. Verifica nuevamente.'});
				   	}
				
				   	User.comparePassword(password, user.password, function(err, isMatch){
				   		if(err) throw err;
				   		if(isMatch){
				   			return done(null, user);
				   		} else {
				   			return done(null, false, {message: 'Contraseña inválida. Verifica nuevamente.'});
				   		}
				   	});
				   });
				  }));
					passport.serializeUser(function(user, done) {
					  done(null, user.id);
					});
					
					passport.deserializeUser(function(id, done) {
					  User.getUserById(id, function(err, user) {
					    done(err, user);
					  });
					});
		    
				  passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/',failureFlash: true}),
				  function(req, res) {
				    res.redirect('/');}
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