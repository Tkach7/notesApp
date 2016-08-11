module.exports = angular.module('app').service('User', function() {
	this.email = '';
	this.password = '';
	this.me = {};
	this.init = (user) => {
		this.me = user;
	}
});