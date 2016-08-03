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
        ref: 'companyLocalStore',
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    purchaseDate: {
        type: Date
    },
    comments: {
        type: String
    },
    factoryWarnings: {
        type: String
    },
    images: {
        type: Array
    }
});

var Asset = module.exports = mongoose.model('Asset', AssetSchema);