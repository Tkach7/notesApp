module.exports = angular.module('app').service('User', function() {
	this.email = '';
	this.password = '';
	this.name = '';
	this.birthday = '';
	this.todo = [];
	this.me = {};
	
	this.init = (user) => {
		this.email = user.email;
		this.todo = user.todo;
		this.name = user.name;
		this.birthday = user.birthday;
		this.icon = user.icon;
		this.sessions = user.sessions

	}
});