module.exports = angular.module('app').service('User', function() {
	this.email = '';
	this.password = '';
	this.todo = [];
	this.me = {};
	this.init = (user) => {
		this.me = user;
	}
});