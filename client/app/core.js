define([
	'lib/emberjs/load',
	"app/views/MainView",
	"app/controllers/postsController",
	"app/controllers/authorsController"
],function(
	em,
	MainView,
	postsController,
	authorsController
){
	em.App = em.Application.create({
	    mainView: MainView.create({}),
	    postsController: postsController,
	    authorsController: authorsController
	});

	em.App.mainView.appendTo('body');

	return em.App;
});
