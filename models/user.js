var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	UserSchema = new Schema({
		name: {type:String, required:true},
		email: {type:String, required:true},
		password: {type:String, required:true},
		gender: {type:String, required:true},
		signature: {type:String},
		cereated_at: {type:Date, default:Date.now},
		updated_at: {type: Date, default:Date.now}
	});

UserSchema.index({name: 1});

module.exports = mongoose.model('User', UserSchema);