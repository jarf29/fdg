var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

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
    }
});

var LocalStore = module.exports = mongoose.model('Store', LocalStoreSchema);