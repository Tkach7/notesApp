import settings from '../../../../../conf/settings.json';
import api from '../../../../../conf/rest.json';

module.exports = angular.module('app').controller('ProfileCtrl', controller);

function controller($scope, User, Data, $window) {
	// Init User
	$scope.user = User;
	$scope.icon = User.icon;
	// Init sessions
	$scope.sessions = User.me.sessions;
	// Get Sessions
	$scope.getSessionsInfo = (session) => {
		return session.device + ', ' + session.os + ', ' + session.browser;
	}
	// Valid data
	$scope.checkField = () => {
		return ($scope.user.name && $scope.user.birthday);
	}
	// Delete sessions
	$scope.deleteSession = (index, session) => {
		Data.deleteSession(session._id).then((res) => {
			User.sessions.splice(index, 1);
			if ($scope.checkCurrentSession(session)) {
				localStorage.removeItem("session");
				$window.location.href = '/';
			}
		})
	}
	// Define current session
	$scope.checkCurrentSession = (session) => {
		return session.token === localStorage.getItem(settings.auth.sessionName);
	}
	// Save name and b-day information
	$scope.saveDate = () => {
		Data.savePersonalInfo($scope.user);
		console.log('Данные добавлены');
		return;
	};
	// Define cropper
    $scope.cropper = {};
    $scope.cropper.sourceImage = null;
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0;
	// Select Icon
    $scope.selectIcon = () => {
        setTimeout(function() {
            document.getElementById('icon').click();
        }, 0);
    }
    // Select icon
    $scope.select = () => {
        $scope.cropIcon = true;
    }
    // Get url icon
    $scope.getSrcIcon = (icon) => {
    	return settings.backend + icon;
    }
    // Apply Icon
    $scope.applyIcon = () => {
        $scope.cropIcon = false;
        Data.savePic($scope.icon).then((res) => {
            $scope.icon = res.data;
        }, (err) => {
            // TODO: handle error
        });
    }
}