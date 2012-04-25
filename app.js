
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
    'server/api/posts',
    'server/api/authors'
], function(
    express,
    mongoose,
    api_posts,
    api_authors
){

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
	app.use(express.static(__dirname + '/client'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });

    app.get('/api/posts', api_posts.getAll);
    app.get('/api/posts/:id', api_posts.get);
    app.post('/api/posts', api_posts.create);

    app.get('/api/authors', api_authors.getAll);
    app.get('/api/authors/:id', api_authors.get);
    app.post('/api/authors', api_authors.create);

    var port = process.env.PORT || 3000;
    app.listen(port);

    console.log("Http server listening on port 3000");
});
