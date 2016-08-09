module.exports = angular.module('app').controller('SignInCtrl', controller);

function controller($scope, $window, Auth) {

    $scope.user = {
        email: '',
        password: ''
    }

    //check valid requred
    $scope.errorRequiredEmail = false;
    $scope.errorRequiredPasswd = false;
    $scope.checkInputs = () => {
        if ($scope.user.email === '' || $scope.user.password === '' ) {
            if ($scope.user.email === '') {
                $scope.errorRequiredEmail = true;
            }
            if ($scope.user.password === '') {
                $scope.errorRequiredPasswd = true;
            }
            return false;
        }
        return true;
    }
    $scope.resetError = (item) => {
        if (item === 'email') {
            $scope.errorRequiredEmail = false;
        } else {
           $scope.errorRequiredPasswd = false; 
        }
    }

    $scope.signIn = (user) => {
        if ($scope.checkInputs()) {
            Auth.in($scope.user, function(err, res) {
                
                if (err && err.status != 404) {
                    $scope.errorRequiredPasswd = true;
                    return;
                }
                if (err && err.status === 404) {
                    $window.location.href = '/signup';
                    return;
                }

                $window.location.href = '/';
            });
        } else return;
    }
}