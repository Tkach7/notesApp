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
            img: './img/calendar@2x.png'
        },
        {
            name: 'Дела',
            src: 'works',
            img: 'img/calendar.png'
        },
        {
            name: 'Календарь',
            src: 'calendar',
            img: 'img/calendar@2x.png'
        }
    ]
    console.log('hello, from root/c');
    // // Socket and notify example
    // Socket.on('hi', function(err, data) {
    //     if(err) return Notify('Error', 'Check WS Connection', err);
    //     Notify('hi', 'hi', data.message);
    // });
}
