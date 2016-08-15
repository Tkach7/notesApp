module.exports = angular.module('app').filter('todoStatus', function() {
    return function (items, status) {
        return items.filter(function (item) {
            return item.status === status;
        })
    };
});