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

    .directive('slideScroll', function($window, $timeout) {
        return {
            restrict : 'AE',
            link : function (scope, element, attr) {
                var itsWatch = scope.$watch ("its", function (newvalue, oldvalue) {
                    itsWatch ();
                    var i = 1;    //element是ul
                    var length = element[0].children.length;
                    var widthwindow = $window.innerWidth - 20;
                    var firstwidth = element[0].children[0].children[0].offsetWidth;
                    setInterval (function () {
                        if (i == length) {
                            i = 0;//初始位置
                            element[0].style.top = "0px";
                        }
                        var topscorll = -(i * 25);
                        var widthself = element[0].children[i].children[0].offsetWidth;  //widthself：292

                        feeltoTop (topscorll);
                        i++;
                    }, 3000);
                    //向上滚动
                    function feeltoTop (topscorll) {  //console.log(topscorll):topscorll是top值
                        var buchang = -10;
                        var feelTimer = setInterval (function () {
                            element[0].style.top = parseInt (element[0].style.top) + buchang + "px";
                            if (parseInt (element[0].style.top) <= topscorll) {
                                element[0].style.top = topscorll + "px";
                                window.clearInterval (feelTimer);
                            }
                        }, 100);
                    }
                })
            }
        }
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
            console.log(addData);
            var d = $q.defer();
            $http({
                method: "POST",
                url: url + '?token=' + addData.data.token,
                data: {
                    // "realName": addData.data.user.realName,
                    // "phone": addData.data.user.phone,
                    "idcard": addData.data.user.idcard,
                    "wechat": addData.data.user.wechat,
                    "bank": addData.data.user.bank,
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


    //分割字符串
    .factory('splitCode',['$http',function ($http) {
        var code={};
        code.split=function (obj) {
            var investCode = obj.split ('*');
            console.log(investCode)
            var investCodeFormat = [];
            if (investCode.length == 2) {
                investCodeFormat[0] = investCode[0].split (',');
                investCodeFormat[1] = investCode[1].split (',');
            }
            else if (investCode.length == 3 || investCode.length == 5) {

                for (var i = 0; i < investCode.length; i++) {
                    investCode[i]='0'+investCode[i]
                }
                investCodeFormat[0] = investCode;
            }
            console.log(investCodeFormat);
            return investCodeFormat;
        };
        return code;
    }])

    //allOrders.html的类型选择
    .factory('difOrders',['$http',function ($http) {
        var orders={};
        orders.diff=function (obj)
        {
            var arr2=[];                //待开奖
            var arr3=[];                //已中奖奖
            var arr4=[];                //未中奖
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].lotteryID == 40) {
                    obj[i].lotteryID = '排列五'
                }
                else if (obj[i].lotteryID == 31) {
                    obj[i].lotteryID = '排列三'
                }
                else if (obj[i].lotteryID == 2) {
                    obj[i].lotteryID = '大乐透'
                }
                if (obj[i].status == 0 || obj[i].status == 1 || obj[i].status == 2) {

                    obj[i].whetherRed = true;
                    obj[i].status = '待开奖';
                    obj[i].whetherDate = true;
                    obj[i].LT = '开奖时间: ' + obj[i].drawTime;
                    if (obj[i].payType == 0) {
                        obj[i].RT = '扫码兑换';
                    }
                    else if (obj[i].payType == 1) {
                        obj[i].RT = '¥' + obj[i].money;
                    }
                    else if (obj[i].payType == 2) {
                        obj[i].RT = '***';
                    }
                    // console.log(obj[i])
                    arr2.push(obj[i]);
                }
                else if (obj[i].status == 4) {

                    obj[i].whetherRed = true;
                    obj[i].status = '已中奖';
                    obj[i].whetherDate = false;
                    obj[i].LT = '¥' + obj[i].lotteryList[0].winamt;
                    if (obj[i].payType == 0) {
                        obj[i].RT = '扫码兑换';
                    }
                    else if (obj[i].payType == 1) {
                        obj[i].RT = '¥' + obj[i].money;
                    }
                    else if (obj[i].payType == 2) {
                        obj[i].RT = '***';
                    }
                    // console.log(obj[i])
                    arr3.push(obj[i]);
                }
                else if (obj[i].status == -1) {
                    obj[i].whetherRed = false;
                    obj[i].status = '兑换超时';
                    obj[i].whetherDate = false;
                    obj[i].LT = '  ';
                    if (obj[i].payType == 0) {
                        obj[i].RT = '扫码兑换';
                    }
                    else if (obj[i].payType == 1) {
                        obj[i].RT = '¥' + obj[i].money;
                    }
                    else if (obj[i].payType == 2) {
                        obj[i].RT = '***';
                    }
                }
                else if (obj[i].status == 3) {

                    obj[i].whetherRed = false;
                    obj[i].status = '未中奖';
                    obj[i].whetherDate = false;
                    obj[i].LT = '再接再厉哦~~~';
                    if (obj[i].payType == 0) {
                        obj[i].RT = '扫码兑换';
                    }
                    else if (obj[i].payType == 1) {
                        obj[i].RT = ' ¥' + obj[i].money;
                    }
                    else if (obj[i].payType == 2) {
                        obj[i].RT = '***';
                    }
                    // console.log(obj[i])
                    arr4.push(obj[i]);
                }
            }
            return [arr2,arr3,arr4]
        }
        return orders;
    }])
    .constant('$ionicLoadingConfig', {
        hideOnStateChange: true,
        template:  '<p class="spinner-icon"><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner><span>加载中...'
    });
