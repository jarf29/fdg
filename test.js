
//    Creating new usertypes
/*
var userType = require('./mvc/models/userType');
var systemAdmin = new userType({userTitle: "systemAdmin"});
var storeAdmin = new userType({userTitle: "storeAdmin"});
var storeEmployee = new userType({userTitle: "storeEmployee"});
systemAdmin.save();
storeAdmin.save();
storeEmployee.save();
console.log(systemAdmin);
console.log(storeAdmin);
console.log(storeEmployee);
*/

// Adding new elements to an object
/*
    var usrParams = {      
      username: "andreslt90",
			email:"a",
			password: "b",
      name: "c",
      lastname: "lastname",
      userType_id: "usrTId"
    };
    console.log(usrParams);
    usrParams.pin = 9999
    console.log(usrParams);
*/

// Handlebars RegisterHelper
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
});

Handlebars Helpers
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
*/

// Schedule
/*
  var dateExpiration = new Date(Date.now() + 10000);
      var j = schedule.scheduleJob(dateExpiration, function(){
        console.log('Cookie expired');
        // How can I redirect to login page after cookie session expires?
        //redirect('/login')
    });
*/

// Seed Data: Creating companies and cities
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fdg');
var db = mongoose.connection;

var city = require('./mvc/models/city');
var thecity = new city({city: "Barranquilla"});
thecity.save();
console.log(thecity);
var company = require('./mvc/models/company');
var params ={
    nit: 123456789,
    companyName: "Test",
    city: "57a3c1af33ae8fcf14683e12"
}
var thecompany = new company(params);
thecompany.save();
*/