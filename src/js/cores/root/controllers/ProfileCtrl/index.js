import settings from '../../../../../conf/settings.json';

module.exports = angular.module('app').controller('ProfileCtrl', controller);

function controller($scope, User, Data, $window) {
	$scope.user = User;
	$scope.icon = User.icon;
	$scope.sessions = User.me.sessions;
	$scope.getSessionsInfo = (session) => {
		return session.device + ', ' + session.os + ', ' + session.browser;
	}
	$scope.checkField = () => {
		return ($scope.user.name && $scope.user.birthday);
	}
	$scope.deleteSession = (index, session) => {
		Data.deleteSession(session._id).then((res) => {
			User.sessions.splice(index, 1);
			if ($scope.checkCurrentSession(session)) {
				localStorage.removeItem("session");
				$window.location.href = '/';
			}
		})
	}
	$scope.checkCurrentSession = (session) => {
		return session.token === localStorage.getItem(settings.auth.sessionName);
	}
	$scope.saveDate = () => {
		Data.savePersonalInfo($scope.user);
		console.log('Данные добавлены');
		return;
	};
}