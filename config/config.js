'use strict';

if (process.env.NODE_ENV === 'production'){
    // Offer Production stage environment variables
    module.exports = {
        host: process.env.host || "",
        dbURI: process.env.dbURI
    }
}else{
    // Offer Development stage settings and data
    module.exports = require('./devEnv.json');
}