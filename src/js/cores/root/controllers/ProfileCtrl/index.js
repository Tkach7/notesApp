module.exports = angular.module('app').controller('ProfileCtrl', controller);

function controller($scope, User, Data) {
	$scope.user = User;
	$scope.icon = User.me.icon;

	$scope.saveDate = () => {
		Date.save({
			name: User.name,
			birthday: User.birthday,
			icon: User.icon
		}, function(err, res) {
			if (err) { console.log('errorGetIcon'); return;}
			return;
		});
	};
}