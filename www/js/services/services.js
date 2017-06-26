angular.module('starter.services', [])

    .factory('locals', ['$window', function ($window) {
        return {
            //存储单个属性
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    //初始化接口
    .factory('initDataService', function ($http, $util) {
        return {
            initData: function (data) {
                return $util.httpPostRequest($util.getHttpURL().initUrl, data);
            },
            initDataNew: function (data) {
                return $util.httpPostRequest($util.getHttpURL().initUrlNew, data);
            }

        };
    })

    //注册信息模态窗口
    .factory('getUserNameService', function ($http, $util) {
        return {
            loginModal: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getUserNameUrl + '?token=' + token, data);
            }
        };
    })

    //排列三投注
    .factory('BettingService', function ($http, $util) {
        return {
            pl3Add: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl3AddUrl + '?token=' + token, data);
            },
            pl5Add: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl5AddUrl + '?token=' + token, data);
            },
            dltAdd: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().dltAddUrl + '?token=' + token, data);
            }

        };
    })

    //获取期号
    .factory('getWareIssueService', function ($http, $util) {
        return {
            getWareIssue: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getWareIssueUrl + '?token=' + token, data);
            }
        };
    })

    //往期开奖
    .factory('historyPastService', function ($http, $util) {
        return {
            PastLottery: function (data, token) {
                return $util.httpPostRequest($util.getHttpURL().getHistoryUrl + '?token=' + token, data);
            }

        };
    })

    //获取信息的http请求
    .factory('getUser', ['$http', '$q', function ($http, $q) {
        var info = {};
        info.getInfo = function (url) {
            var d = $q.defer();
            $http({
                method: "post",
                url: url,
                headers: {
                    // "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function () {
                d.reject('error')
            });
            return d.promise
        };
        return info;
    }])
    
    //上传数据的http请求
    .factory('postData', ['$http', '$q', function ($http, $q) {
        var info = {};
        info.getInfo = function (url, addData) {
            var d = $q.defer();
            $http({
                method: "POST",
                url: url + '?token=' + addData.data.token,
                data: {
                    "realName": addData.data.user.realName,
                    "phone": addData.data.user.phone,
                    "idcard": addData.data.user.idcard,
                    "wechat": addData.data.user.wechat,
                    "alipay": addData.data.user.alipay,
                    "bankNo": addData.data.user.bankNo
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).success(function (response) {
                d.resolve(response);
            }).error(function () {
                d.reject('error')
            });
            return d.promise
        };
        return info;
    }])

    .factory('postWidthdraw', ['$http', '$q', function ($http, $q) {
    var info = {};
    info.postMoney = function (url, postData) {
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
        }).success(function (response) {
            d.resolve(response);
        }).error(function () {
            d.reject('error')
        });
        return d.promise
    };
    return info;
}])
    
    .factory('splitCode',['$http',function ($http) {
        var code={};
        code.split=function (obj) {
            var investCode = obj.split ('@');
            var investCodeFormat = [];
            if (investCode.length == 2) {
                investCodeFormat[0] = investCode[0].split (',');
                investCodeFormat[1] = investCode[1].split (',');
            }
            else if (investCode.length == 1) {
                investCodeFormat[0] = investCode[0].split (',');
            }
            return investCodeFormat;
        };
        return code;
    }])
    
    .constant('$ionicLoadingConfig', {
        hideOnStateChange: true
    });
