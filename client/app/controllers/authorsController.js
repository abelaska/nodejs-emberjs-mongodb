define([
	'lib/emberjs/load',
	'app/model/Author',
	'app/controllers/BaseController'
],function(
	em,
	Author,
	BaseController
){
	return BaseController.create({
	
	    resourceType: Author,
	
	    getAll: function(onDone, onFail) {
		this.clearAll();
		this.api.getAllAuthors(function(json) {
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
