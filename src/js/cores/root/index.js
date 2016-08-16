module.exports = function(settings, user) {
    // Init Application
    var app = angular.module('app', ['ngRoute'])
        .constant('__settings', settings)
        .constant('__api', require('!json!../../../conf/rest.json'))
        .constant('__routing', require('!json!./routing.json'))
        .config(config)
        .run((User) => {
            User.init(user);
        });

    function config($routeProvider, $locationProvider, $httpProvider, __routing) {

        // Enable HTML5 location mode
        $locationProvider.html5Mode(true);

        // Build routes by routing.json
        __routing.forEach(function(route) {
            $routeProvider.when(route.uri, {
                controller: route.controller,
                template: require('./controllers/' + route.controller + '/view.html'),
                resolve: {
                    factory: function($rootScope, $q, $window, Auth) {
                        return $q(function(resolve) {
                            Auth.check(function(err, user) {

                                // Init user
                                $rootScope.user = user;

                                // Wrong session token exception
                                if (err) {
                                    $window.location.href = '/';
                                    return;
                                }

                                // Init app environment
                                $rootScope.title = route.title;
                                resolve(true);
                            });
                        });
                    }
                }
            });
        });

        // Set unresolved(otherwise) route
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        // Set Http Interceptor
        $httpProvider.interceptors.push('HttpInterceptor');
    }

    // function run(Socket, ExampleWorker) {
    //     // Do something ...
    // }

    // Bootstrap controllers
    var files = require.context('./', true, /\/(?!index).*\.js$/);
    files.keys().forEach(function(element) {
        files(element);
    });

    // Bootstrap dependencies
    require('../../factories/auth');
    // require('../../factories/notify');
    require('../../factories/http');
    require('../../factories/rest');
    require('../../factories/session');
    // require('../../factories/socket');
    require('../../factories/data.js');
    require('../../components/header');
    require('../../services/calendar.js');
    require('../../models/user');
}
