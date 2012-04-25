define([
    'server/model/Author'
],function(
    Author
){
    return {
	get: function(req, res) {
	    Author.findById(req.params.id, function (err, author) {
		if (err) {
		    res.json(500,{
			error: err
		    });
		    console.log('Failed to get author id ' + req.params.id + ', ' + err);
		} else {
		    if (author === null) {
			res.send(404,'');
			console.log('Author ' + req.params.id + ' not found');
		    } else {
			res.json(200, author);
			console.log('Found author ' + JSON.stringify(author));
		    }
		}
	    });
	},

	getAll: function(req, res) {
	    Author.find({}, function (err, authors) {
		if (err) {
		    res.json(500,{
			error: err
		    });
		    console.log('Failed to get authors, ' + err);
		} else {
		    res.json(200, authors);
		    console.log('Found authors ' + JSON.stringify(authors));
		}
	    });
	},

	create: function(req, res) {
	    var author = new Author({
		name: req.body.name
	    });
	    author.save(function (err) {
		if (err) {
		    res.json(500,{
			error: err
		    });
		    console.log('Failed to create author ' + JSON.stringify(req.body) + ', ' + err);
		} else {
		    res.json(200,{
			id : author.id
		    });
		    console.log('Created author ' + JSON.stringify(req.body));
		}
	    });
	}
    };
});
