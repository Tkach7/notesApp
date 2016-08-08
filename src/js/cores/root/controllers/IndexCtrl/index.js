module.exports = angular.module('app').controller('IndexCtrl', controller);

function controller($scope, $window, Auth) {
    $scope.out = function() {
        Auth.out(function(err) {
            $window.location.href = '/';
        })
    }
    $scope.navList = [
        {
            name: 'Профиль',
            src: 'profile',
            img: 'images/calendar.png'
        },
        {
            name: 'Дела',
            src: 'works',
            img: '/images/todolist.png'
        },
        {
            name: 'Календарь',
            src: 'calendar',
            img: '/images/calendar.png'
        }
    ]

    $scope.out = function() {
        Auth.out(function(err, res) {
            console.log(arguments);
            $window.location.href = '/';
        })
    }
    // // Socket and notify example
    // Socket.on('hi', function(err, data) {
    //     if(err) return Notify('Error', 'Check WS Connection', err);
    //     Notify('hi', 'hi', data.message);
    // });
}
