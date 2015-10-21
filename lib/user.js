var User = require('../models').User;

exports.addUser = function (data) {
	return User.create(data);
};

exports.getUserById = function(id) {
	return User.findbyId(id).exec();
}

exports.getUserByName = function(name) {
	return User.findOne({name: name}).exec();
}