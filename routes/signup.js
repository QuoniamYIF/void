var Models = require('../lib/core'),
	$User = Models.$User;

exports.get = function* () {
	yield this.render('signup');
};

exports.post = function*() {
	var data = this.request.body,
		userExist = yield $User.getUserByName(data.name);
	if(userExist) {
		this.flash = {error: '用户名已存在！'};
		return this.redirect('/');
	}
	yield $User.addUser(data);

	this.session.user = {
		name: data.name,
		email: data.email
	};

	this.flash = {success: '注册成功！'};
	this.direct('/');
};

