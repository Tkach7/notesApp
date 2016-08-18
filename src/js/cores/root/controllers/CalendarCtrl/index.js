module.exports = angular.module('app').controller('CalendarCtrl', controller);

function controller($scope, Calendar, User, Data)  {
	// Init user
	$scope.user = User;
	// Load calendar
    $scope.month = Calendar.getMonth(0);
    // Load events in calendar
	(function() {
		User.todo.forEach((todo) => {
			$scope.month.days.forEach((day) => {
				if (day.value <= todo.time
					&& todo.time <= moment(day.value).endOf('day').format()
					&& todo.status === false) {
						day.events.push(todo);
				}
			})
		})
	})();
	// Month counter
	$scope.counterMonth = 0;
	// Move to previous month
	$scope.getPrevMonth = () => {
		$scope.month = Calendar.getMonth(--$scope.counterMonth);
	};
	// Move to next month
	$scope.nextMonth = () => {
		$scope.month = Calendar.getMonth(++$scope.counterMonth);		
	}
	//  Todo timer
	$scope.todoTime = {
		hours: '',
		minutes: ''
	};
	// Valid time
	$scope.checkTime = () => {
		return $scope.todoTime.hours >= 0
			&& $scope.todoTime.hours
			&& $scope.todoTime.minutes
			&& $scope.todoTime.hours < 24
			&& $scope.todoTime.minutes >= 0
			&& $scope.todoTime.minutes <= 60
	}
	// Save new todo time
	$scope.saveTime = (todo) => {
		todo.time = moment(todo.time).hour($scope.todoTime.hours).minute($scope.todoTime.minutes).format();
		Data.changeTimeTodo(todo).then((res) => {
			// Push responced todo to User.todo array
			User.todo[index] = todo;
			// Reset todo model
			}, (err) => {
				console.log(err);
				alert('Ooops! Look at console.');
			});
	}
	// Display full info
	$scope.statusFullInfo = false;
	$scope.changeStatusFullInfo = () => {
		$scope.statusFullInfo = !$scope.statusFullInfo;
	}
}



