var OpenUrl = require('openurl')
	.open;
var _ = require('underscore');
var urls = process.argv[2].split(", ");

_.each(urls, function (url) {
	OpenUrl(url);
});