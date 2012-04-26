/*global console:false */

define([
	'server/model/Author'
],function(
	Author
){
	"use strict";
	
	return {
		remove: function(req, res) {
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
						author.remove(function (err) {
							if (err) {
								res.json(500,{
									error: err
								});
								console.log('Failed to remove author id ' + req.params.id + ', ' + err);
							} else {
								res.json(200,'');
								console.log('Deleted author ' + JSON.stringify(author));
							}
						});
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
