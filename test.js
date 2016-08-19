//    Creating new MongoDBObjects
var db = require('./db/setdb');

/*var LocalStoreSchema = {
    storeName: "Default",
    companyId: "57a3c291f9ac294015f05aaa"
};
var localStore = require('./mvc/models/store');
var store = new localStore(LocalStoreSchema);

store.save();
console.log(store);*/


/*var userType = require('./mvc/models/userType');
var systemAdmin = new userType({userTitle: "systemAdmin"});
var storeAdmin = new userType({userTitle: "storeAdmin"});
var storeEmployee = new userType({userTitle: "storeEmployee"});
systemAdmin.save();
storeAdmin.save();
storeEmployee.save();
console.log(systemAdmin);
console.log(storeAdmin);
console.log(storeEmployee);*/


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

// Callback into Async functions.
/*
var cny = require("./mvc/models/company"); 
var usrParams = {s:1};
var usrtype = "storeAdmin";


function getParms (usrParams, usrtype, callback) {
  if (usrtype === "systemAdmin")
    usrParams.pin = 9999;
  else if (usrtype === "storeAdmin"){
    cny.findOne({companyName: "Test"}, function(err, c) {
      usrParams.company = c._id;
    });
    callback(null, null, usrParams);
  }
}

getParms(usrParams, usrtype, function(err, compa){
  if (err) console.log(err)
  console.log(compa);
});
var p = parameters(usrParams, usrtype);
*/

// Creating Cities
/*var cny = require("./mvc/models/city"); 
var mainCity = new cny({city: "Barranquilla", image: "https://s3-us-west-2.amazonaws.com/fdg-ingenieria/images/Ciudades/BA.jpg"});
mainCity.save();*/

// Creating Companies
/*var cny = require("./mvc/models/company"); 
var mainCity = new cny(
  {    nit: "123456789",
    companyName: "Default company",
    city: "57b5e0c54ab963680f8372ee"}
  );
mainCity.save();*/

// Creating Stores
/*var store= require("./mvc/models/store"); 
var st = new store(
  {
    storeName: "Default Store",
    companyId: "57b5e6118fc445a60fbdd8d4"
  }
  );
st.save();*/

// Creating Tickets
/*var tkt = require("./mvc/models/ticket");
var moment = require('moment');
var date =  new Date('Thu Aug 18 2016 18:22:56 GMT-0600 (CST)')
var newtkt = new tkt(
  {
    title: "Default ticket",
    description: "Test",
    status: "Pendiente",
    store_id: "57b5e98f0a940f3010662762",
    storeEmployeeId: "57b5ea7d8a84be5110014276",
    openningDate: moment(date).format('YYYY-DD-MM')
  }
);
newtkt.save(function(err, tk){
  if (err) console.log(err)
  else console.log(tk)
}
  );*/
const tickets = require("./mvc/models/ticket");
var populateQuery = [{path:'storeEmployee_id', select:'username'}];
tickets.find({}).populate(populateQuery).exec(function(err, tkt){
  console.log(tkt);
});
  
  
  