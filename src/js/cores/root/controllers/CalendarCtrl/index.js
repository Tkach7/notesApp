module.exports = angular.module('app').controller('CalendarCtrl', controller);

function controller($scope, Calendar)  {
    $scope.month = Calendar.getMonth(0);
	$scope.counterMonth = 0;
	$scope.getPrevMonth = () => {
		$scope.month = Calendar.getMonth(--$scope.counterMonth);
	};
	$scope.nextMonth = () => {
		$scope.month = Calendar.getMonth(++$scope.counterMonth);		
	}
}


