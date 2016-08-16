var mongoose = require('mongoose');

var AssetModelSchema = mongoose.Schema({
    modelName: {
        type: String, 
        required: true
    },
    year: String
});

var AssetModel  = module.exports = mongoose.model('AssetModel ', AssetModelSchema);