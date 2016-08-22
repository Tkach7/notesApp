module.exports = angular.module('app').controller('CalendarCtrl', controller);

function controller($scope, Calendar, User, Data)  {
	// Init user
	$scope.user = User;
	// Load calendar
    $scope.month = Calendar.getMonth(0);
    // Load events in calendar
	function reloadEvents() {
		User.todo.forEach((todo) => {
			todo.show = false;
			$scope.month.days.forEach((day) => {
				if (day.value <= todo.time
					&& todo.time <= moment(day.value).endOf('day').format()
					&& todo.status === false) {
						day.events.push(todo);
				}
			})
		})
	};
	reloadEvents();
	// Month counter
	$scope.counterMonth = 0;
	// Move to previous month
	$scope.getPrevMonth = () => {
		$scope.month = Calendar.getMonth(--$scope.counterMonth);
		reloadEvents();
	};
	// Move to next month
	$scope.nextMonth = () => {
		$scope.month = Calendar.getMonth(++$scope.counterMonth);
		reloadEvents();	
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
			User.todo.forEach((elem) => {
				if (elem.title === todo.title) {
					elem.time = todo.time;
					return;
				}
			});
			// Reset todo model
			}, (err) => {
				console.log(err);
				alert('Ooops! Look at console.');
			});
	}
	// Display full info
	$scope.statusFullInfo = false;
	$scope.changeStatusFullInfo = (event) => {
		event.show = !event.show;
		$scope.todoTime.hours = moment(event.time).hours();
		$scope.todoTime.minutes = moment(event.time).minutes();
	}
	$scope.movedDragElem = (event, item) => {
		let month = event.toElement.innerText.slice(3,5);
		let day = event.toElement.innerText.slice(0,2);
		let time = moment(item.time).month(month).date(day).format();
		item.time = time;
		Data.changeTimeTodo(item).then((res) => {
			User.todo.forEach((elem) => {
				if (elem.title === item.title) {
					elem.time = time;
					return;
				}
			});

		}, (err) => {
			console.log(err);
			alert('Ooops! Look at console.');
		});

		return item;
	}
}



