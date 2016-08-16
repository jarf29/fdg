var mongoose = require('mongoose');

var AssetRefSchema = mongoose.Schema({
    RefName: {
        type: String, 
        required: true, 
        unique: true
    }
});

var AssetRef = module.exports = mongoose.model('AssetRef', AssetRefSchema);