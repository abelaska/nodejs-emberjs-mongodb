/*global console:false, __dirname:false, process:false */

/**
 * Module dependencies.
 */
	
var requirejs = require('requirejs');

requirejs.config({
	nodeRequire: require
});

requirejs([
	'express',
	'mongoose',
	'server/api/authors'
], function(
	express,
	mongoose,
	api_authors
){
	"use strict";

	// connect to MongoDB
	mongoose.connect('mongodb://localhost/example');

	var app = express();

	app.configure(function(){
		app.use(express.favicon());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
	});

	app.configure('development', function(){
		app.use(express.logger('dev'));
		app.use(express['static'](__dirname + '/client'));
		app.use(express.errorHandler({
			dumpExceptions: true, 
			showStack: true
		}));
	});

	app.configure('production', function(){
		
		// build client if directory client-build not found
		var path = require('path');
		if (!path.existsSync("client-build")) {
			require('./build');
		}
		
		app.use(express['static'](__dirname + '/client-build'));
	});

	// ROUTES
	app.get('/api/authors', api_authors.getAll);
	app.del('/api/authors/:id', api_authors.remove);
	app.post('/api/authors', api_authors.create);

	// HTTP
	var port = process.env.PORT || 3000;
	app.listen(port);

	console.log("Http server listening on port 3000");
});
