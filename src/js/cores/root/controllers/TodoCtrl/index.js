module.exports = angular.module('app').controller('TodoCtrl', controller);

function controller($scope, $timeout, User, Data) {
	// Init user model
	$scope.user = User;
	// Init empty todo model
	$scope.todoModel = {
		title: '',
		time: moment().format()
	}
	$scope.changeStatus = () => {
		Data.changeStatusTodo(User.todo).then((res) => {
			}, (err) => {
				console.log(err);
				alert('Ooops! Look at console.');
			});
	};
	$scope.checkField = () => {
		return ($scope.todoModel.title && $scope.todoModel.time); 
	}
	$scope.deleteTodo = (index, todo) => {
		console.log(todo);
		Data.deleteTodo(todo._id).then((res) => {
			User.todo.splice(index, 1);
		})
	}

	$scope.checkFinishTodo = () => {
		let flag = false;
		$scope.user.todo.forEach(function(item) {
			if (item.status === true) {flag = true; return;}
		});
		return flag;
	}
    // Add new todo (mutate user object)
	$scope.addTodo = () => {
		// Put new todo
		Data.saveTodo($scope.todoModel).then((res) => {
			// Push responced todo to User.todo array
			User.todo.unshift(res.data);
			// Reset todo model
			$scope.todoModel = {
				title: '',
				time: moment().format()
			}
		}, (err) => {
			console.log(err);
			alert('Ooops! Look at console.');
		});
	};
}