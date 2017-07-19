/**
 * Created by admin on 2017/6/14.
 */

//兑换  大乐透不追加详情
angular.module ('starter.bettingDetailCtrl', ['starter.services']).controller ('bettingDetailCtrl', function ($scope, $ionicPopup, $timeout, $state, $http, $stateParams, $ionicLoading, $rootScope, $ionicModal, $util, BettingService, getWareIssueService) {
//        console.log($rootScope.newStatus);
    $scope.flag3 = $stateParams.flag3;
    $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap); //反解析
    // console.log ($scope.sessionJsonWarp);
    $scope.countMoney = '2';
    //设置表单初始值
    $scope.totalMoney = $scope.sessionJsonWarp.length; //设置倍数及金额
    $scope.isDisabled = true;
    $scope.multiple = '1';
    if ($rootScope.newStatus == '1') {
        $scope.countMoney = '2';
    }
    else {
        $scope.countMoney = '3';
    }
    disabledBtnBigBitting ();

    var PayTypeBig = null;

    function disabledBtnBigBitting () {
        //判断用户要用什么来兑换彩票    余额 || 抵用券
        if (type == 0) {
            if (PayType == 0) {
                PayTypeBig = userInfo.data.voucher.money
            }
            else if (PayType == 1) {
                PayTypeBig = userInfo.data.user.money
            }
        }
        else if (type == 1) {
            if (PayType == 0) {
                for (var k = 0; k < userInfo.data.vouchers.length; k++) {
                    PayTypeBig = userInfo.data.vouchers[k].money;
//                        console.info(userInfo.data.vouchers[k]);
                }
            }
            else if (PayType == 1) {
                PayTypeBig = userInfo.data.user.money
            }
        }
        if ($scope.totalMoney >= PayTypeBig) {
            $scope.isDisabled = true;
            var alertPopup = $ionicPopup.alert ({
                title : '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>',
                template : '<div class="alert-left">' + '<p style="text-align: center;">余额不足,请充值或删除多余的投注</p>' + '</div>',
                okText : '确 定',
                okType : 'button-light'
            }).then (function () {

            });
        }
        else {
            $scope.isDisabled = false;
        }
    }

    //手动添加一组，返回大乐透选中页面
    $scope.manualAdd = function () {
        $state.go ('BigLotto-2');
        sessionStorage.editThisOrderData = ''; //清除点击修改后保存在session.editThisOrderData中的数据
    };
    //店家点击机选，添加机选一注
    $scope.autoAdd = function () {
        $scope.arrRed = [];
        $scope.arrBlue = [];
        addJson = {
            red : $scope.arrRed,
            blue : $scope.arrBlue
        };
        //店主点击随机产生5个红号
        var randomRed = []; //原数组
        for (var i = 1; i <= 35; i++) {
            randomRed[i] = i;
        }
        randomRed.sort (function () { //排序
            return 0.5 - Math.random ();
        });
        //随机打撒
        for (var j = 0; j < 5; j++) {
            var itemsRed = {
                num : randomRed[j],
                check : false
            };
            if (itemsRed.num < 10) {
                itemsRed.num = '0' + randomRed[j]
            }
            else {
                itemsRed.num = randomRed[j]
            }
            $scope.arrRed.push (itemsRed);
        }
        //店主点击随机产生2个蓝号
        var randomBlue = []; //原数组
        for (var i = 1; i <= 12; i++) {
            randomBlue[i] = i;
        }
        randomBlue.sort (function () { //排序
            return 0.5 - Math.random ();
        });
        //随机打撒
        for (var j = 0; j < 2; j++) {
            var itemsBlue = {
                num : randomBlue[j],
                check : false
            };
            if (itemsBlue.num < 10) {
                itemsBlue.num = '0' + randomBlue[j]
            }
            else {
                itemsBlue.num = randomBlue[j]
            }
            $scope.arrBlue.push (itemsBlue);
        }
        //由于路由的切换,需本地保存session
        sessionStorage.saveStr = JSON.stringify (addJson);
        var addObject = JSON.parse (sessionStorage.saveStr);
        $scope.sessionJsonWarp.push (addObject);
        sessionStorage.jsonWrap = JSON.stringify ($scope.sessionJsonWarp);
        $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);
        $scope.totalMoney = $scope.sessionJsonWarp.length;
        disabledBtnBigBitting ();
    };
    //点击删除一组
    $scope.deleteRow = function ($index) {
        $scope.sessionJsonWarp.splice ($index, 1); //点击删除本行
        //删除本行后的数据保存到sessionStorage
        var changeToStr = JSON.stringify ($scope.sessionJsonWarp);
        sessionStorage.jsonWrap = changeToStr;
        //             console.log(sessionStorage.jsonWrap);
        $scope.totalMoney -= 1;
        disabledBtnBigBitting ();
    };
    $scope.editThisOrder = function ($index) {
        /**
         * 1.先转成数组
         * 2.数组中获取当前修改的一组
         * 3.sessionStorage保存当前修改的一组
         */
        var changeToArr = JSON.parse (sessionStorage.jsonWrap);
        var thisIndexOrder = changeToArr[$index];
        var changeToArr1 = JSON.stringify (thisIndexOrder);
        sessionStorage.editThisOrderData = changeToArr1;
        // console.log(thisIndexOrder);
        $state.go ('BigLotto-2');
        $scope.deleteRow ($index);
    };
    // 确认提交按钮
    $scope.showOrderAlertCms = function () {
        $ionicLoading.show ();
        if ($scope.multiple == 0) { //投注倍数限制
            alert ('请重新设置投注倍数');
            return
        }
        //获取大乐透期号
        var reques = {};
        var userInfo = $util.getUserInfo ();
//            console.log(userInfo);
        /*$http({
         method: "POST",
         url: ipUrl + '/lottery/getWareIssue?token=' + userInfo.data.token,
         params: {
         lotteryID: 51
         },
         headers: {
         "Content-Type": "application/json"
         }
         })*/
        var data = {
            lotteryID : 2
        };
        getWareIssueService.getWareIssue (data, userInfo.data.token)
            .then (function (response) {
                $ionicLoading.hide ();
                reques = response.data;
//             console.log (reques);
                getdltadd ();
            }, function (response) {
                console.log ("获取列表失败");
            });
        // 大乐透投注接口信息
        function getdltadd () {
            $ionicLoading.show ();
            var userInfo = $util.getUserInfo ();
            var dataArrayBig = [];
            for (var i in $scope.sessionJsonWarp) {
                var dataObj = {
                    investCode : "", //"investCode":"01,03,05,07,09*06,08"
                    multiple : 1
                };
                var investCode = '';
                for (var j in $scope.sessionJsonWarp[i]) {
                    for (var k in $scope.sessionJsonWarp[i][j]) {
                        if (typeof $scope.sessionJsonWarp[i][j][k] === 'object') {

                            investCode += ',' + $scope.sessionJsonWarp[i][j][k].num;

                            if (investCode.substr (0, 1) == ',') investCode = investCode.substr (1); //截取第一位逗号
                            investCode = (investCode.substring (investCode.length - 1) == ',') ? investCode.substring (0, investCode.length - 1) : investCode; //截取最后一位逗号
                            var get_array = investCode.split ('');
                            get_array.splice (-6, 1, '*');
                            var investCodeStr = get_array.join ('');
                        }
                    }
                }
                //console.log (investCodeStr);
                dataObj.investCode = investCodeStr;
                dataArrayBig.push (dataObj);
                // console.log (dataArrayBig);
            }

            var vid = '';
            if (type == 0) {
                if (userInfo.data.voucher == undefined) {
                    vid = '';
                }
                else {
                    vid = userInfo.data.voucher.vid;
                }
            }
            else if (type == 1) {
                for (var k = 0; k < userInfo.data.vouchers.length; k++) {
                    if (userInfo.data.vouchers == undefined) {
                        vid = '';
                    }
                    else {
                        vid = userInfo.data.vouchers[k].vid;
                    }
                }
            }

            var data = {
//              "lotteryID": "2",
                wareIssue : reques.wareIssue,
                payType : PayType,
                vid : vid,
                addFlag : "0",
                data : dataArrayBig
            };
            $http ({
                method : "POST",
                url : ipUrl + '/lottery/dltadd?token=' + userInfo.data.token,
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                }
            })
                .then (function (response) {
                    $ionicLoading.hide ();
//                        console.log(data);
                    /*var alertPopup = $ionicPopup.alert ({
                        title : '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>',
                        template : '<div class="alert-left">' + '<p style="text-align: center;">' + response.data.info + '</p>' + '</div>',
                        okText : '确 定',
                        okType : 'button-light'
                    })
                        .then (function () {
                            $state.go ('tab.account');
                        });*/

                    //提交成功窗口配置
                    $ionicModal.fromTemplateUrl ('submission.html', {
                        scope: $scope,
                        backdropClickToClose:true
                    })
                        .then (function (modal) {
                            modal.show ();
                            $scope.info = response.data.info;
                            $scope.realName = userInfo.data.user.realName;
                            $scope.phones = userInfo.data.user.phone;
//                                $scope.receive = receive; //获赠时间
                            $scope.draw_time = reques.draw_time.split('T').join(' ');//开奖时间

                            $scope.receiveNum = [];
                            var receiveNumArr = data.data;//获赠号码
                            for(var i in receiveNumArr){
                                var receiveNumWarp = [];
                                var receiveNum = receiveNumArr[i].investCode;
                                var receiveNumArray = receiveNum.split('*');
                                var receiveStr1 = receiveNumArray[0].split(',');
                                var receiveStr2 = receiveNumArray[1].split(',');

                                receiveNumWarp.push(receiveStr1, receiveStr2);
                                $scope.receiveNum.push(receiveNumWarp);
                                // console.info($scope.receiveNum);
                            }
//                            $scope.modal3 = modal;
                            $scope.makeSure = function () {
                                modal.hide ();
                                $state.go ('tab.account');
                            }
                        });
                }, function (response) {
                    //扫码后，所获赠注数的限制提示。
                    var confirmPopup = $ionicPopup.confirm ({
                        title : '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                        template : '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                        okText : '确认',
                        okType : 'button-darkBlue'
                    })
                        .then (function () {
                            $state.go ('tab.account');
                        });
                });
        }
    }
});

