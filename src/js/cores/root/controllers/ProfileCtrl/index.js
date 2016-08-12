module.exports = angular.module('app').controller('ProfileCtrl', controller);

function controller($scope, User, Data) {
	$scope.user = User.me;
	$scope.icon = User.me.icon;
	$scope.sessions = User.me.sessions;
	$scope.getSessionsInfo = (session) => {
		return session.device + ', ' + session.os + ', ' + session.browser;
	} 
	$scope.saveDate = () => {
		if ($scope.user.name || $scope.user.birthday) {
			Data.save($scope.user);
			console.log('Данные добавлены');
			return;
		} else {
			console.log('Поля пустые!');
		}
	};
}