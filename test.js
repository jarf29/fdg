// var mongoose = require('mongoose').Schema.Types;
// console.log("Running");
// console.log(mongoose);

var userType = require('./mvc/models/userType');
var sysAdmin = new userType({ userTitle: "systemAdmin"}); 
var storeAdmin = new userType({ userTitle: "storeAdmin"}); 
var storeEmployee = new userType({ userTitle: "storeEmployee"}); 