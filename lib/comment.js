var Comment = require('../models').Comment;

exports.addComment = function(data) {
	return Comment.create(data);
};

exports.getCommentsByTopicId = function(id) {
	return Comment.find({topic_id:id}).sort('updated_at').exec();
};