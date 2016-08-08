module.exports = angular.module('app').component('logout', {
	template: require('./view.html'),
	controller: controller
});

function controller($scope, $window, Auth) {
	$scope.out = function() {
        Auth.out(function(err, res) {
            $window.location.href = '/';
        });
    };
}

require("../../factories/auth");
require("../../factories/rest");
require("../../factories/session");