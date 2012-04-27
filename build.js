// Based on https://gist.github.com/1509135

//Load the requirejs optimizer
var requirejs = require('requirejs'),
	fs = require('fs'),
	crypto = require('crypto');

//Set up basic config, include config that is
//common to all the requirejs.optimize() calls.
var baseConfig = {
	baseUrl: "client",
	outputDir: 'client-build',
	optimize: "uglify",
//	optimize: "none", // For debugging built versions
	wrap: true,
	inlineText: true,
	preserveLicenseComments: false
};

//Create an array of build configs, the baseConfig will
//be mixed in to each one of these below.

var configs = [
{
	include: ['lib/requirejs/require', 'main'],
	out: 'main.js'
},
{
	cssIn: baseConfig.baseUrl + '/css/main.css',
	out: 'css/main.css'
},
{
	appDir: [baseConfig.baseUrl + '/img'],
	dir: baseConfig.outputDir + '/img'
}
]; 

// Function used to mix in baseConfig to a new config target
function mix(target) {
	for (var prop in baseConfig) {
		if (baseConfig.hasOwnProperty(prop)) {
			target[prop] = baseConfig[prop];
		}
	}
	if (target.out !== undefined) {
		target.out = baseConfig.outputDir + '/' + target.out;
	}
	return target;
}

// Function used to calculate MD5 checksum of file
function md5file(filename) {
	return crypto.createHash('md5').update(fs.readFileSync(filename, 'utf8')).digest("hex");
}

//Create a runner that will run a separate build for each item
//in the configs array. Thanks to @jwhitley for this cleverness
var runner = configs.reduceRight(function(prev, currentConfig) {
	return function (buildReportText) { 
		if (buildReportText === undefined) {
			console.log('Optimizing...');
		} else {
			console.log(buildReportText);
		}
		requirejs.optimize(mix(currentConfig), prev);
	};
}, function(buildReportText) {
	console.log(buildReportText);
});

//Run the builds
runner();

// set in index.html parameter to css and js url, forcing client to download new versions
console.log('Optimized, modifying index.html...');

var cssVersion = md5file(baseConfig.outputDir + '/css/main.css');
var jsVersion = md5file(baseConfig.outputDir + '/main.js');

var content = fs.readFileSync(baseConfig.baseUrl + '/index.html', 'utf8');

content = content.replace('main.css', 'main.css?v=' + cssVersion)
				.replace('lib/requirejs/require.js', 'main.js?v=' + jsVersion)
				.replace('data-main="main"', '');

fs.writeFileSync(baseConfig.outputDir + '/index.html', content, 'utf8');

// remove empty file img/build.txt
fs.unlinkSync(baseConfig.outputDir + '/img/build.txt');

console.log('Done');
