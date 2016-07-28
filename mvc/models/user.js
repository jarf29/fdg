var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// User Schema
var UserSchema = mongoose.Schema({
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
		type: String
/*		ref: 'userType',
		required: true*/
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

var User = module.exports = mongoose.model('User', UserSchema);

//System Administrator
var UserSystemAdminSchema = mongoose.Schema({
    pin: {
        type: Number,
        min: 1000,
        max: 9999,
        required: true
    }
});
var UserSystemAdmin = module.exports = User.discriminator('UserSystemAdmin', UserSystemAdminSchema);
/*
//Store Administrator
var UserStoreAdminSchema = mongoose.Schema({
	company:{
		type: ObjectId,
		ref: 'company',
		required:true
	},
	userApproval:{
		type: Boolean,
		default: false,
		required:true
	}
});
var UserStoreAdmin = module.exports = User.discriminator('UserStoreAdmin', UserStoreAdminSchema);

//Employee
var userStoreEmployeeSchema = mongoose.Schema({
	store:{
		type: ObjectId,
		ref: 'companyLocalStore',
		required:true
	},
	userApproval:{
		type: Boolean,
		default: false,
		required:true
	},
	ApprovedBy: String, //UserName
});
var userStoreEmployee = module.exports = User.discriminator('userStoreEmployee', userStoreEmployeeSchema)
*/
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
