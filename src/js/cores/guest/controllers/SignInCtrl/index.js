module.exports = angular.module('app').controller('SignInCtrl', controller);

function controller($scope, $window, $location, Auth, User) {

    $scope.user = User;

    //check valid requred
    $scope.errorRequiredEmail = false;
    $scope.errorRequiredPasswd = false;
    $scope.placeholderEmail = 'Введите логин'
    $scope.placeholderPassw = 'Введите пароль';

    $scope.checkInputs = () => {
        if ($scope.user.email === '' || $scope.user.password === '' ) {
            if ($scope.user.email === '') {
                $scope.placeholderEmail = 'Заполните поле';
                $scope.errorRequiredEmail = true;
            }
            if ($scope.user.password === '') {
                $scope.placeholderPassw = 'Заполните поле';
                $scope.errorRequiredPasswd = true;
            }
            return false;
        }
        return true;
    }
    $scope.resetError = (item) => {
        if (item === 'email') {
            $scope.errorRequiredEmail = false;
            $scope.placeholderEmail = '';
        } else {
            $scope.placeholderPassw = '';
            $scope.errorRequiredPasswd = false; 
        }
    }

    $scope.signIn = (user) => {
        if ($scope.checkInputs()) {
            Auth.in($scope.user, function(err, res) {
                
                if (err && err.status != 404) {
                    $scope.user.password = '';
                    $scope.placeholderPassw = 'Неверный пароль';
                    $scope.errorRequiredPasswd = true;
                    return;
                }

                if (err && err.status === 404) {
                    $location.path('/signup');
                    return;
                }

                $window.location.href = '/';
            });
        } else return;
    }
}