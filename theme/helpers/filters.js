var gravatar = require('gravatar'),
	moment = require('moment'),
	md = require('markdown-it'),
	pkg = require('../package');

moment.locale(pkg.locale);

module.exports = {
	get fromNow() {
		return function(date) {
			return moment(date).fromNow();
		};
	},
	get gravatar() {
		return gravatar.url;
	},
	get markdown() {
		return function(content) {
			return md.render(content);
		};
	}
};