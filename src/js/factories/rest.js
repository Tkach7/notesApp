module.exports = angular.module('app').factory('Rest', function($http, __settings) {
    return {
        get: function(uri) {
            return $http.get(__settings.server + uri);
        },
        delete: function(uri) {
            return $http.delete(__settings.server + uri);
        },
        post: function(uri, data) {
            return $http.post(__settings.server + uri, data);
        },
        put: function(uri, data) {
            return $http.put(__settings.server + uri, data);
        },
        patch: function(uri, data) {
            return $http.patch(__settings.server + uri, data);
        }
    }
});
