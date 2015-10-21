var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
	topic_id: {type:ObjectId, required:true},
	user: {
		name: {type:String, required:true},
		email: {type:String, required:true}
	},
	content: {type:String, required:true},
	created_at: {type:Date, default:Date.now},
	updated_at: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Comment', CommentSchema);