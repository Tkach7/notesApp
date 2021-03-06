module.exports = function(settings) {

	var app = angular.module('app', ['ngRoute'])
        .constant('__settings', settings)
        .constant('__api', require('!json!../../../conf/rest.json'))
        .constant('__routing', require('!json!./routing.json'))
        .config(config);

    function config($routeProvider, $locationProvider, __routing) {
        // Enable HTML5 location mode
        $locationProvider.html5Mode(true);
        // Build routes by routing.json
        __routing.forEach(function(route) {
            $routeProvider.when(route.uri, {
                controller: route.controller,
                template: require('./controllers/' + route.controller + '/view.html'),
                resolve: {
                    factory: function($rootScope, $q) {
                        return $q(function(resolve) {
                            // Init app environment
                            $rootScope.title = route.title;
                            resolve(true);
                        });
                    }
                }
            });
        });  

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }

    var files = require.context('./', true, /\/(?!index).*\.js$/);
    files.keys().forEach(function(element) {
        files(element);
    });    

    // Bootstrap dependencies

    require('../../factories/auth');
    require('../../factories/rest');
    require('../../factories/session');

    require('../../models/user');

}