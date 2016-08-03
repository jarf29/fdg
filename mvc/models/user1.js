var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');
var ObjectId = Schema.ObjectId;
var bcrypt = require('bcryptjs');

function UserSchema() {
  Schema.apply(this, arguments);

  this.add({
	username: {
		type: String,
		index:true,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},	
	name: {
		type: String,
		required: true
	},
	lastname:{
		type: String,
		required: true
	},
	userType:{
		type: ObjectId,
		ref: 'userType',
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	},
	ApprovedOn: {
		type: Date,
		default: Date.now		
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date
  });
}
util.inherits(UserSchema, Schema);
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
