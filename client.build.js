{
	baseUrl: "client",
	dir: "client-build",
	optimize: "uglify",

	inlineText: true,

	paths: {
	    "jquery": "lib/requirejs/require-jquery",
	},

	modules: [
	    {
	        name: "app",
	        exclude: ["jquery"]
	    }
	],

	preserveLicenseComments: false
}
