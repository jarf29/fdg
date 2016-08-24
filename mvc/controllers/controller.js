'use strict';

const router = require('express').Router();

let _registerRoutes = (routes, method) => {
    for (let key in routes){
    	if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array))
    		// Recursive function
    		_registerRoutes(routes[key], key);
    	else{
    		// Registering the routes
    		if (method === 'GET')
    			router.get(key, routes[key]);
    		else if (method === 'POST')
    			    router.post(key, routes[key]);
    			else
    				router.use(routes[key]);
    		}
    }
}

let route = routes => {
	_registerRoutes(routes);
	return router;
}

module.exports = {
    route
};