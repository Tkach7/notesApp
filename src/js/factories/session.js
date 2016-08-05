module.exports = angular.module('app').factory('Session', function(__settings) {
    return {
        get: function() {
            return localStorage.getItem(__settings.auth.sessionName);
        },
        set: function(token) {
            localStorage.setItem(__settings.auth.sessionName, token);
        },
        destroy: function() {
            localStorage.removeItem(__settings.auth.sessionName);
        }
    }
});
