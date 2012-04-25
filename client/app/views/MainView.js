define([
	'lib/emberjs/load',
	'app/model/Author',
	'app/model/Post',
	'app/controllers/authorsController',
	'app/controllers/postsController',
	'lib/requirejs/plugins/text!app/templates/Main.handlebars'
],function(
	em,
	Author,
	Post,
	authorsController,
	postsController,
	mainTemplateSource
){
	return em.View.extend({
	    template: em.Handlebars.compile(mainTemplateSource),

	    newAuthor: null,
	    newPost: null,

	    init: function() {
		this._super();
		authorsController.getAll();
		postsController.getAll();
		
		this.newAuthor = Author.create();
		this.newPost = Post.create();
	    },

	    createAuthor: function() {
		authorsController.api.createAuthor({
		    name: this.newAuthor.get('name')
		},function(data) {
		    this.newAuthor.set('_id', data.id);
		    authorsController.pushObject(this.newAuthor);

		    this.set('newAuthor', Author.create());
		    
		}.bind(this), function(err) {
		    console.log('error', err);
		}.bind(this));
	    }
	});
});
