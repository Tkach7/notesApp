module.exports = angular.module('app').factory('Data', function(Rest, Session, __api) {
    return {
        getImage: function(email, callback) {
            Rest.get(__api.user.data + '/' + email).then(function(res) {
                callback(null, res.data[0].icon);
            }, callback);
        },
        save: function(date, callback) {
            Rest.patch(__api.user.data + '/' + email, {
                name: date.name,
                birthday: date.birthday,
                icon: date.icon
            }).then(function(res) {
                callback(null, res);
            }, callback);
        }
    }
});
