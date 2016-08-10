module.exports = angular.module('app').controller('SignUpCtrl', controller);

function controller($scope, $window, Auth, User) {

    $scope.user = User;
    $scope.repeatPassw = '';
    $scope.diffirentPassword = false;
    $scope.resetError = () => {
        $scope.diffirentPassword = false;
    };

    $scope.signUp = (user) => {
        if ($scope.user.password === $scope.repeatPassw) {
            Auth.up($scope.user, function(err, res) {
                if (err) {
                    $scope.err = true;
                    return;
                }

            $window.location.href = '/';
            });
        } else {
            $scope.diffirentPassword = true;
        }

    };
}