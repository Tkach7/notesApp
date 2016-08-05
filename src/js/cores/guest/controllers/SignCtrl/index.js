module.exports = angular.module('app').controller('SignCtrl', controller);

function controller($scope, $window, Auth) {

    $scope.user = {
        name: '',
        password: ''
    }

    // Inputs validator
    // $scope.check = Check;

    // // Error cleaner
    // $scope.clean = function() {
    //     $scope.err = false;
    // }

    $scope.sign = (user) => {
        Auth.in($scope.user, function(err, res) {
            
            if (err) {
                $scope.err = true;
                return;
            }

            $window.location.href = '/';
        });
    }
}