var validator = require('validator'),
	crypto = require('crypto');

module.exports = {
	"(GET|POST) /signup" :{
		"request" : {
			"session" : checkNotLogin
		}
	},
	"POST /signup" :{
		"request" : {
			"body": checkSignupBody
		}
	},
	"(GET|POST) /signin" :{
		"request": {
			"session": checkNotLogin
		}
	},
	"POST /signin" :{
		"request" :{
			"body": checkSigninBody
		}
	}
};

function checkNotLogin() {
	if(this.session && this.session.user) {
		this.flash = {error: '已登录！'};
		this.redirect('back');
		return false;
	}
	return true;
}

function checkLogin() {
	if(!this.session && !this.session.user) {
		this.flash = {error: '未登录！'};
		this.redirect('/signin');
		return false;
	}
	return true;
}

function checkSignupBody() {
	var body = this.request.body,
		flash;

	if(!body || !body.name) {
		flash = {error: '请填写用户名！'};
	}
	else if(!body.email || !validator.isEmail(body.email)) {
		flash = {error: '请填写正确的邮箱地址！'};
	}
	else if(!body.password) {
		flash = {error: '请填写密码！'};
	}
	else if(body.password !== body.re_password) {
		flash = {errror: '两次密码不匹配！'}
	}
	else if (!body.gender || !~['男', '女'].indexOf(body.gender)) {
		flash = {error: '请选择性别！'};
	}
	else if(body.signature.length > 50) {
		flash = {error: '个性签名不能超过50个字！'};
	}
	if(flash) {
		this.flash = flash;
		this.redirect('back');
		return false;
	}
	body.name = validator.trim(body.name);
	body.email = validator.trim(body.email);
	body.password = md5(validator.trim(body.password));
	return true;
}

function checkSigninBody() {
	var body = this.request.body,
		flash;

	if(!body || !body.name) {
		flash = {error: '请填写用户名！'};
	}
	else if(!body.password) {
		flash = {error: '请填写密码！'};
	}

	if(flash) {
		this.flash = flash;
		this.redirect('back');
		return false;
	}
	body.name = validator.trim(body.name);
	body.password = md5(validator.trim(body.password));
	return true;
}