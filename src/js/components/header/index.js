module.exports = angular.module('app').component('header', {
	template: require('./view.html'),
	controller: controller
});

function controller($scope, $window, Auth, $location) {
	$scope.out = function() {
        Auth.out(function(err, res) {
            $window.location.href = '/';
        });
    };
    console.log(location.pathname);
    $scope.checkPath = () => {
    	return location.pathname != '/';
    };

}

require("../../factories/auth");
require("../../factories/rest");
require("../../factories/session");