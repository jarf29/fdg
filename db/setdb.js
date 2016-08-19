'use strict';
const dbconfig = require('../config/config.js');
const mongoose = require('mongoose').connect(dbconfig.dbURI);

mongoose.connection.on('error', error =>{
    console.log("MongoDB Error: ", error);
});

module.exports = mongoose