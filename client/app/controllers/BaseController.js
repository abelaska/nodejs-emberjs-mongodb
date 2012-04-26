define([
	'lib/emberjs/load',
	'app/api/api'
],function(
	em,
	api
){
	"use strict";

	return em.ArrayController.extend({

		resourceType: em.required(),

		api: api,

		load: function(json) {
			var resource = this.get('resourceType').create(json);
			this.pushObject(resource);
		},

		loadAll: function(json) {
			for (var i=0; i < json.length; i++) {
				this.load(json[i]);
			}
		},

		clearAll: function() {
			this.set('content', []);
		}
	});
});
