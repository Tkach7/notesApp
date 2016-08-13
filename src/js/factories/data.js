module.exports = angular.module('app').factory('Data', function(Rest, Session, __api) {
    return {
        save: function(sign) {
            Rest.patch(__api.user.data + '/' + sign.email, {
                email: sign.email,
                name: sign.name,
                birthday: sign.birthday
            });
        }
    };
});