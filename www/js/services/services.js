angular.module('starter.services', [])

    .factory('locals', ['$window', function($window) {
        return {
            //存储单个属性
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            //读取单个属性
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            //存储对象，以JSON格式存储
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            //读取对象
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])

    //初始化接口
    .factory('initDataService', function($http, $util) {
        return {
            initData: function(data) {
                return $util.httpPostRequest($util.getHttpURL().initUrl, data);
            },
            initDataNew: function(data) {
                return $util.httpPostRequest($util.getHttpURL().initUrlNew, data);
            }

        };
    })

    //注册信息模态窗口
    .factory('getUserNameService', function($http, $util) {
        return {
            loginModal: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().getUserNameUrl + '?token=' + token, data);
            }
        };
    })

    //排列三投注
    .factory('BettingService', function($http, $util) {
        return {
            pl3Add: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl3AddUrl + '?token=' + token, data);
            },
            pl5Add: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl5AddUrl + '?token=' + token, data);
            },
            dltAdd: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().dltAddUrl + '?token=' + token, data);
            },
            pl3addAuto: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().pl3addAutoUrl + '?token=' + token, data);
            }




        };
    })

    //获取期号
    .factory('getWareIssueService', function($http, $util) {
        return {
            getWareIssue: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().getWareIssueUrl + '?token=' + token, data);
            },
            getWinamt: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().getWinamtUrl + '?token=' + token, data);
            }
        };
    })

    //往期开奖
    .factory('historyPastService', function($http, $util) {
        return {
            PastLottery: function(data, token) {
                return $util.httpPostRequest($util.getHttpURL().getHistoryUrl + '?token=' + token, data);
            }

        };
    })

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
                },
                timeout :30000
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
            console.log(addData);
            var d = $q.defer();
            $http({
                method: "POST",
                url: url + '?token=' + addData.data.token,
                data: {
                    // "realName": addData.data.user.realName,
                    // "phone": addData.data.user.phone,
                    "name": addData.data.user.name,
                    "idcard": addData.data.user.idcard,
                    "wechat": addData.data.user.wechat,
                    "bank": addData.data.user.bank,
                    "bankNo": addData.data.user.bankNo
                },
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                timeout :30000
            }).success(function(response) {
                d.resolve(response);
            }).error(function() {
                d.reject('error')
            });
            return d.promise
        };
        return info;
    }])


    //分割字符串
    .factory('splitCode', ['$http', function($http) {
        var code = {};
        code.split = function(obj) {
            var investCode = obj.split('*');
            console.log(investCode)
            var investCodeFormat = [];
            if (investCode.length == 2) {
                investCodeFormat[0] = investCode[0].split(',');
                investCodeFormat[1] = investCode[1].split(',');
            } else if (investCode.length == 3 || investCode.length == 5 ) {

                for (var i = 0; i < investCode.length; i++) {
                    investCode[i] = investCode[i]
                }
                investCodeFormat[0] = investCode;
            }
            else if (investCode.length == 1) {
                var noUse = [];
                noUse = investCode[0].split(',');
                for (var i = 0; i < noUse.length; i++) {
                    investCode[i] = '0' + noUse[i]
                }
                investCodeFormat[0] = investCode.concat();
            }
            console.log(investCodeFormat);
            return investCodeFormat;
        };

        return code;
    }])

    //allOrders.html的类型选择
    .factory('difOrders', ['$http', function($http) {
        var orders = {};
        orders.diff = function(obj) {
            var arr2 = []; //待开奖
            var arr3 = []; //已中奖奖
            var arr4 = []; //未中奖
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].lotteryID == 40) {
                    obj[i].lotteryID = '排列五'
                } else if (obj[i].lotteryID == 31) {
                    obj[i].lotteryID = '排列三'
                } else if (obj[i].lotteryID == 2) {
                    obj[i].lotteryID = '大乐透'
                }
                if (obj[i].status == 0 || obj[i].status == 1 || obj[i].status == 2) {

                    obj[i].whetherRed = true;
                    obj[i].status = '待开奖';
                    obj[i].whetherDate = true;
                    obj[i].LT = '开奖时间: ' + obj[i].drawTime;
                    if (obj[i].payType == 0 ) {
                        obj[i].RT = obj[i].channelName;
                    } else if (obj[i].payType == 1) {
                        obj[i].RT = '¥' + obj[i].money;
                    }
                    // console.log(obj[i])
                    // arr2.push(obj[i]);
                } else if (obj[i].status == 4) {

                    obj[i].whetherRed = true;
                    obj[i].status = '已中奖';
                    obj[i].whetherDate = false;

                    var winMoney2 = 0;
                    for (var j = 0; j < obj[i].lotteryList.length; j++) {
                        winMoney2 += obj[i].lotteryList[j].winamt;
                        console.log(winMoney2);
                    }


                    obj[i].LT = '¥' + winMoney2;
                    if (obj[i].payType == 0) {
                        obj[i].RT = obj[i].channelName;
                    } else if (obj[i].payType == 1) {
                        obj[i].RT = '¥' + obj[i].money;
                    }
                    // console.log(obj[i])
                    // arr3.push(obj[i]);
                } else if (obj[i].status == -1) {
                    obj[i].whetherRed = false;
                    obj[i].status = '兑换超时';
                    obj[i].whetherDate = false;
                    obj[i].LT = '  ';
                    if (obj[i].payType == 0) {
                        obj[i].RT = obj[i].channelName;
                    } else if (obj[i].payType == 1) {
                        obj[i].RT = '¥' + obj[i].money;
                    }
                } else if (obj[i].status == 3) {

                    obj[i].whetherRed = false;
                    obj[i].status = '未中奖';
                    obj[i].whetherDate = false;
                    obj[i].LT = '再接再厉哦~~~';
                    if (obj[i].payType == 0) {
                        obj[i].RT = obj[i].channelName;
                    } else if (obj[i].payType == 1) {
                        obj[i].RT = ' ¥' + obj[i].money;
                    }
                    // console.log(obj[i])
                    // arr4.push(obj[i]);
                }
            }
            // return [arr2, arr3, arr4]
            return obj;
        }
        return orders;
    }])


    .factory('timeRemain', ['$http', function($http) {
        return {
            stillHave: function(endDate) {
                var newEndDate = endDate.toString().split('');
                newEndDate.splice(10,1,'T')
                newEndDate.join('');
                newEndDate = newEndDate.join('');
                var nowTime = new Date().getTime();
                var endTime = new Date(newEndDate).getTime();
                console.log(endTime);
                var leftTime = endTime - nowTime;

                var d, h, m, s;
                if (leftTime >= 0) { //定义变量 d,h,m,s保存倒计时的时间
                    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                } else {
                    d = 0;
                    h = 0;
                }

                return { d: d, h: h };
            }
        }
    }])

    .constant('$ionicLoadingConfig', {
        hideOnStateChange: true,
        duration:10000,
        template: '<p class="spinner-icon"><ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner><span>加载中...'
    });
