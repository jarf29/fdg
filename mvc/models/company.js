var mongoose = require('mongoose');

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
    city: {
        type: Integer,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    representative: {
        type: String
    }
});

var Company = module.exports = mongoose.model('Company', CompanySchema);