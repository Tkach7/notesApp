module.exports = function(settings) {

	let app = angular.module('app', [])
		.constant('__settings', settings)
		.run((__settings) => {
			console.log('Settings from angular', __settings);
		});
}