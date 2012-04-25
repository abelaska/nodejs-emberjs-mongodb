define([
    'server/model/Post'
],function(
    Post
){
    return {
	get: function(req, res) {
	    Post.findById(req.params.id, function (err, post) {
		if (err) {
		    res.json(500,{
			error: err
		    });
		    console.log('Failed to get post id ' + req.params.id + ', ' + err);
		} else {
		    if (post === null) {
			res.send(404, '');
			console.log('Post '+req.params.id+' not found');
		    } else {
			res.json(200, post);
			console.log('Found post ' + JSON.stringify(post));
		    }
		}
	    });
	},

	getAll: function(req, res) {
	    Post.find({}, function (err, posts) {
		if (err) {
		    res.json(500,{
			error: err
		    });
		    console.log('Failed to get posts, ' + err);
		} else {
		    res.json(200, posts);
		    console.log('Found posts ' + JSON.stringify(posts));
		}
	    });
	},

	create: function(req, res) {
	    var post = new Post({
		author: req.body.author,
		title: req.body.title,
		body: req.body.body
	    });
	    post.save(function (err) {
		if (err) {
		    res.json(500,{
			error: err
		    });
		    console.log('Failed to create post ' + JSON.stringify(req.body) + ', ' + err);
		} else {
		    res.json(200,{
			id : post.id
		    });
		    console.log('Created post ' + JSON.stringify(req.body));
		}
	    });
	}
    };
});
