module.exports = angular.module('app').filter('normData', function () {
	return function (item) {
		let year = moment(item).year();
		let month = moment(item).format('MMMM')[0].toUpperCase() + moment(item).format('MMMM').slice(1);
		return month + ' ' + year;
  	};
});