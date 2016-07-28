var mongoose = require('mongoose');

var BrandSchema = mongoose.Schema({
    brandName: {
        type: String, 
        required: true, 
        unique: true
    }
});

var Brand = module.exports = mongoose.model('Brand', BrandSchema);