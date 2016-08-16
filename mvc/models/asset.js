var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var AssetSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    brand: {
        type: ObjectId,
        ref: 'assetBrand',
        required: true
    },
    model: {
        type: ObjectId,
        ref: 'assetModel',
        required: true
    },
    reference: {
        type: ObjectId,
        ref: 'assetReference',
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'store',
        required: true
    },
    marketPrice: {
        type: Number,
        min: 0
    },
    registryDate: {
        type: Date
    },
    factoryWarnings: {
        type: String
    },
    images: {
        type: String
    },
    comments: {
        type: String
    }    
});

var Asset = module.exports = mongoose.model('Asset', AssetSchema);