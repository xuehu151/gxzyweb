angular.module('starter.services', [])
    //封装localStorage
    .factory('locals', ['$window', function($window) {
        return { //存储单个属性
            set: function(key, value) {
                $window.localStorage[key] = value;
            }, //读取单个属性
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            }, //存储对象，以JSON格式存储
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            }, //读取对象
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    //获取信息的http请求
    .factory('getUser', ['$http', '$q', function($http, $q) {
        var info = {};
        info.getInfo = function(url) {
            var d = $q.defer();
            $http({
                method: "post",
                url: url,
                headers: {
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).success(function(response) {
                d.resolve(response);
            }).error(function() {
                d.reject('error')
            });
            return d.promise
        };
        return info;
    }])
    //上传数据的http请求
    .factory('postData', ['$http', '$q', function($http, $q) {
        var info = {};
        info.getInfo = function(url, addData) {
            var d = $q.defer();
            $http({
                method: "POST",
                url: url + '?token=' + addData.token,
                data: {
                    "realName": addData.user.realName,
                    "phone": addData.user.phone,
                    "idcard": addData.user.idcard,
                    "wechat": addData.user.wechat,
                    "alipay": addData.user.alipay,
                    "bankNo": addData.user.bankNo
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).success(function(response) {
                d.resolve(response);
            }).error(function() {
                d.reject('error')
            });
            return d.promise
        };
        return info;
    }]).factory('postWidthdraw', ['$http', '$q', function($http, $q) {
        var info = {};
        info.postMoney = function(url, postData) {
            var d = $q.defer();
            $http({
                method: "POST",
                url: url + '?token=' + addData.toke,
                data: {
                    "realName": addData.user.realName,
                    "phone": addData.user.phone,
                    "idcard": addData.user.idcard,
                    "wechat": addData.user.wechat,
                    "alipay": addData.user.alipay,
                    "bankNo": addData.user.bankNo
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).success(function(response) {
                d.resolve(response);
            }).error(function() {
                d.reject('error')
            });
            return d.promise
        };
        return info;
    }]);
