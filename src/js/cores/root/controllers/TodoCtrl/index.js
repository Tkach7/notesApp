module.exports = angular.module('app').controller('TodoCtrl', controller);

function controller($scope, User, Data) {

	// Init user model
	$scope.user = User;

	// Init empty todo model
	$scope.todoModel = {
		title: '',
		time: moment().format()
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
			alert('Ooops! Look at console.')
		});
	};
}