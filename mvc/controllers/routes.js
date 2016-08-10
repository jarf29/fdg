const router = require('express').express.Router();

module.exports = () => {
    let routes = {
    	'GET': {
    		'/': (req, res, next) => {
    			if (!req.user)
    				res.render('register', {layout: 'auth', login: false});
    			else{
    				res.redirect('/users/dashboard');
    			}
    		},
    		'/dashboard': (req, res, next) => {
    			// Define
    		}
    	},
    	'POST': {
    		
    	}
    }
    
    let registerRoutes = (routes, method) => {
    	for (let key in routes){
    		if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array))
    			// Recursive function
    			registerRoutes(routes[key], key);
    		else{
    			// Registering the routes
    			if (method === 'GET')
    				router.get(key, routes[key]);
    			else
    				router.post(key, routes[key]);
    		}
    	}
    }
    
    registerRoutes(routes);
    return router;
}