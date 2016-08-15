module.exports = angular.module('app').controller('TodoCtrl', controller);

function controller($scope, User, Data) {
	$scope.user = User.me;
    $scope.dateNewTodo = '2016-08';
	$scope.saveTodo = () => {
		if ($scope.dateNewTodo && $scope.newTodo) {
			$scope.user.todo.push({deal: $scope.newTodo, date: $scope.dateNewTodo});
			Data.saveTodo($scope.user);
			// $scope.newTodo = '';
			// $scope.dateNewTodo = '';
			console.log('Новое дело добавлено');
			return;
		} else {
			console.log('Поля пустые!');
		}
	};
}
