define([
	'lib/emberjs/load',
	'app/model/Post',
	'app/controllers/BaseController'
],function(
	em,
	Post,
	BaseController
){
	return BaseController.create({
	
	    resourceType: Post,
	
	    getAll: function(onDone, onFail) {
		this.clearAll();
		this.api.getAllPosts(function(json) {
		    this.loadAll(json);
		    if (onDone) {
			onDone();
		    }
		}.bind(this), function(err) {
		    if (onFail) {
			onFail(err);
		    }
		}.bind(this));
	    }
	});
});
