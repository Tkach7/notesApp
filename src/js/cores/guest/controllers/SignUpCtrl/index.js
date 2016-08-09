module.exports = angular.module('app').controller('SignUpCtrl', controller);

function controller($scope, $window, Auth) {

    $scope.user = {
        email: '',
        password: '',
        repeat: ''
    }
    $scope.diffirentPAssword = false;
    $scope.resetError = () => {
        $scope.diffirentPAssword = false;
    };

    $scope.signUp = (user) => {
        if ($scope.user.password === $scope.user.repeat) {
            Auth.up($scope.user, function(err, res) {
                if (err) {
                    $scope.err = true;
                    return;
                }

            $window.location.href = '/';
            });
        } else {
            $scope.diffirentPAssword = true;
        }

    };
}