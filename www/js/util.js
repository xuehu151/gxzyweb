/*
 * 创建人：
 * 类描述：服务器地址访问类
 */
angular.module ('starter.util', [])
    .factory ('$util', function ($http, $q, $ionicLoading) {
        //Might use a resource here that returns a JSON array
        var ipUrl = 'http://114.215.70.179:8088';       //服务器ip地址或者域名
        //var ipUrl = 'http://192.168.1.118:8080';      //本地ip地址或者域名

        /* 接口地址  */
        var httpURL = {
            initUrl: ipUrl + '/service/common/index1',   //初始化
            initUrlNew: ipUrl + '/service/common/index',    //新用户
            getUserNameUrl: ipUrl + '/service/customer/add',    //注册框
            pl3AddUrl: ipUrl + '/service/lottery/pl3add', //排列3投注
            pl5AddUrl: ipUrl + '/service/lottery/pl5add', //排列5投注
            dltAddUrl: ipUrl + '/service/lottery/dltadd', //大乐透投注
            getWareIssueUrl: ipUrl + '/service/lottery/getWareIssue',   //获取期号
            getHistoryUrl: ipUrl + '/service/lottery/getHistoryList'      //往期开奖
        };
        return {
            /* 返回httpURL  */
            getHttpURL: function () {
                return httpURL;
            },

            /* 保存用户信息  */
            setUserInfo: function (userInfo) {
                window.localStorage.setItem ("userInfo", JSON.stringify (userInfo));
            },

            /* 获取用户信息  */
            getUserInfo: function () {
                var localUserInfo = window.localStorage.getItem ("userInfo");
                try {
                    userInfo = JSON.parse (localUserInfo);
                } catch (error) {
                    userInfo = null;
                }
                return userInfo;
            },

            /* 格式化日期  */
            formatDate: function (date) {
                var y = date.getFullYear ();
                var m = date.getMonth () + 1;
                m = m < 10 ? '0' + m : m;
                var d = date.getDate ();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },

            /*验证密码
             * 密码由数字 字母 特殊字符的其中两种组成 6到24位
             checkPassword: function (text) {
             var myreg = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[.#@!~%^&*])|(?=.*\d)(?=.*[.#@!~%^&*]))[a-z\d.#@!~%^&*]{6,24}/i;
             return myreg.test (text);
             },*/

            /*验证手机号*/
            checkPhone: function (text) {
                var myreg = /^1[34578]\d{9}$/;
                return myreg.test (text);
            },

            /* HTTP请求  */
            httpPostRequest: function (url, data) {
                $ionicLoading.show ();
                var deferred = $q.defer ();
                var promise = deferred.promise;
                $http ({
                    method: 'POST',
                    url: url,
                    params: data,
                    headers: {"content-type": "application/json;charset=UTF-8"},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                        }
                        return str.join ("&");
                    },
                    timeout: 3000
                }).success (function (response) {
                    //return success
                    $ionicLoading.hide ();
                    deferred.resolve (response);
                }).error (function (response) {
                    //return error
                    $ionicLoading.hide ();
                    deferred.reject (response);
                    //$cordovaToast.showLongBottom ('网络访问超时');
                });
                return promise;
            }
        };
    });
