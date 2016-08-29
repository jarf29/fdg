var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CompanySchema = mongoose.Schema({
    nit: {
        type: String, 
        required: true, 
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    email: String,
    representative: String,
    image: String
});

var Company = module.exports = mongoose.model('Company', CompanySchema);