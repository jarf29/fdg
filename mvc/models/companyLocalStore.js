var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LocalStoreSchema = mongoose.Schema({
    storeName: {
        type: String, 
        required: true, 
        unique: true
    },
    companyId:{
        type: ObjectId,
        ref: 'company',
        required: true
    },
    address:{
        type: String
    },
    phone:{
        type: String
    },
    email: {
        type: String
    },
    administrator:{
        type: ObjectId,
        ref: 'user',
        required: true
    }
});

var LocalStore = module.exports = mongoose.model('LocalStore', LocalStoreSchema);