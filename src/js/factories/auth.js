module.exports = angular.module('app').factory('Auth', function(Rest, Session, __api) {
    return {
        in: function(sign, callback) {
            var promise = CryptoJS.lib.WordArray.random(256 / 16).toString();
            
            async.waterfall([
                function(callback) {
                    Rest.get(__api.auth.key + '/' + promise).then(function(res) {
                        callback(null, res.data);
                    }, callback);
                },
                function(key, callback) {
                    Rest.post(__api.auth.in, {
                        password: CryptoJS.AES.encrypt(sign.password, key).toString(),
                        email: sign.email,
                        promise: promise
                    }).then(function(res) {
                        Session.set(res.data.token);
                        callback(null, res.data);
                    }, callback);
                }
            ], callback);
        },
        out: function(callback) {
            Rest.post(__api.auth.out).then(function(res) {
                Session.destroy();
                callback(null, true);
            }, callback);
        },
        check: function(callback) {
            Rest.get(__api.auth.check).then(function(res) {
                callback(null, res.data);
            }, callback);
        }
    }
});
