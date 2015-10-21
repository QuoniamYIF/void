var Comment = require('./comment'),
	Topic = require('./topic'),
	User = require('./user');

module.exports = {
	get $User() {
		return User;
	},

	get $Comment() {
		return Comment;
	},

	get $Topic() {
		return Topic;
	}
};