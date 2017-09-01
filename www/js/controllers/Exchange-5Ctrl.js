/**
 * Created by admin on 2017/6/14.
 */
var ipUrl = 'http://lottery.zhenlong.wang';
//var ipUrl = 'http://103.235.237.134';      //本地ip地址或者域名

//兑换 排列5
angular.module ('starter.Exchange-5Ctrl', ['starter.services'])

    .controller ('Exchange-5Ctrl', function ($scope, $state, $interval, $ionicModal, $ionicLoading, $http, $rootScope, $util, $ionicPopup, getWareIssueService, $timeout) {
        //设置排列3球万位号码
        $scope.numDataBit10000 = [];
        var filterBit10000 = [];
        //设置排列3球千位号码
        $scope.numDataBit1000 = [];
        var filterBit1000 = [];
        //设置排列3球百位号码
        $scope.numDataBit100 = [];
        var filterBit100 = [];
        //设置排列3球十位号码
        $scope.numDataBit10 = [];
        var filterBit10 = [];
        //设置排列3球个位号码
        $scope.numDataBit1 = [];
        var filterBit1 = [];
        //初始化选中的值
        $scope.generate10000 = '';
        $scope.generate1000 = '';
        $scope.generate100 = '';
        $scope.generate10 = '';
        $scope.generate1 = '';
        // Create the ball items   万位
        for (var j = 0; j < 10; j++) {
            var itemsBit10000 = {
                num: j,
                check: false
            };
            $scope.numDataBit10000.push (itemsBit10000);
        }
        //给万位添加点击事件
        $scope.addBit10000Click = function (item) {
            $scope.numDataBit10000 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit10000 = {
                        num: j,
                        check: true
                    };
                    filterBit10000[0] = item;
                    $scope.numDataBit10000.push (itemsBit10000);
                }
                else {
                    var itemsBit10000 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit10000.push (itemsBit10000);
                }
            }
            //判断filterBit10000的长度确定generate10000值
            filterBit10000Data ();
        };
        // Create the ball items   千位
        for (var j = 0; j < 10; j++) {
            var itemsBit1000 = {
                num: j,
                check: false
            };
            $scope.numDataBit1000.push (itemsBit1000);
        }
        //给千位添加点击事件
        $scope.addBit1000Click = function (item) {
            $scope.numDataBit1000 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1000 = {
                        num: j,
                        check: true
                    };
                    filterBit1000[0] = item;
                    $scope.numDataBit1000.push (itemsBit1000);
                }
                else {
                    var itemsBit1000 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit1000.push (itemsBit1000);
                }
            }
            //判断filterBit1000的长度确定generate1000值
            filterBit1000Data ();
        };
        // Create the ball items   百位
        for (var j = 0; j < 10; j++) {
            var itemsBit100 = {
                num: j,
                check: false
            };
            $scope.numDataBit100.push (itemsBit100);
        }
        //给百位添加点击事件
        $scope.addBit100Click = function (item) {
            $scope.numDataBit100 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit100 = {
                        num: j,
                        check: true
                    };
                    filterBit100[0] = item;
                    $scope.numDataBit100.push (itemsBit100);
                }
                else {
                    var itemsBit100 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit100.push (itemsBit100);
                }
            }
            //判断filterBit100的长度确定generate100值
            filterBit100Data ();
        };
        // Create the ball items   十位
        for (var j = 0; j < 10; j++) {
            var itemsBit10 = {
                num: j,
                check: false
            };
            $scope.numDataBit10.push (itemsBit10);
        }
        //给十位添加点击事件
        $scope.addBit10Click = function (item) {
            $scope.numDataBit10 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit10 = {
                        num: j,
                        check: true
                    };
                    filterBit10[0] = item;
                    $scope.numDataBit10.push (itemsBit10);
                }
                else {
                    var itemsBit10 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit10.push (itemsBit10);
                }
            }
            //判断filterBit10的长度确定generate10值
            filterBit10Data ();
        };
        // Create the ball items   个位
        for (var j = 0; j < 10; j++) {
            var itemsBit1 = {
                num: j,
                check: false
            };
            $scope.numDataBit1.push (itemsBit1);
        }
        //给个位添加点击事件
        $scope.addBit1Click = function (item) {
            $scope.numDataBit1 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1 = {
                        num: j,
                        check: true
                    };
                    filterBit1[0] = item;
                    $scope.numDataBit1.push (itemsBit1);
                }
                else {
                    var itemsBit1 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit1.push (itemsBit1);
                }
            }
            //判断filterBit1的长度确定generate1值
            filterBit1Data ();
        };

        function filterBit10000Data () {
            if (filterBit10000.length == 0) {
                $scope.generate10000 = 0;
            }
            else {
                $scope.generate10000 = filterBit10000[0].num;
            }
        }

        function filterBit1000Data () {
            if (filterBit1000.length == 0) {
                $scope.generate1000 = 0;
            }
            else {
                $scope.generate1000 = filterBit1000[0].num;
            }
        }

        function filterBit100Data () {
            if (filterBit100.length == 0) {
                $scope.generate100 = 0;
            }
            else {
                $scope.generate100 = filterBit100[0].num;
            }
        }

        function filterBit10Data () {
            if (filterBit10.length == 0) {
                $scope.generate10 = 0;
            }
            else {
                $scope.generate10 = filterBit10[0].num;
            }
        }

        function filterBit1Data () {
            if (filterBit1.length == 0) {
                $scope.generate1 = 0;
            }
            else {
                $scope.generate1 = filterBit1[0].num;
            }
        }

        //随机选取号码
        var randomBall = []; //原数组
        $scope.randomBallExchage5D = function () {
            randomBall = []; //一进来清空数组
            //给原数组randomBall赋值
            for (var i = 0; i < 5; i++) {
                var randomExchage = parseInt (Math.random () * 10);
                randomBall.push (randomExchage);
            }
            //            console.log (randomBall);
            randomBall.sort (function () {
                return Math.random ();
            });
            for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                $scope.numDataBit10000[i].check = false;
                $scope.numDataBit1000[i].check = false;
                $scope.numDataBit100[i].check = false;
                $scope.numDataBit10[i].check = false;
                $scope.numDataBit1[i].check = false;
                filterBit10000 = [];
                filterBit1000 = [];
                filterBit100 = [];
                filterBit10 = [];
                filterBit1 = [];
            }
            //随机打撒
            $scope.numDataBit10000[randomBall[4]].check = true;
            filterBit10000.push ($scope.numDataBit10000[randomBall[4]]);
            filterBit10000Data ();
            $scope.numDataBit1000[randomBall[3]].check = true;
            filterBit1000.push ($scope.numDataBit1000[randomBall[3]]);
            filterBit1000Data ();
            $scope.numDataBit100[randomBall[2]].check = true;
            filterBit100.push ($scope.numDataBit100[randomBall[2]]);
            filterBit100Data ();
            $scope.numDataBit10[randomBall[1]].check = true;
            filterBit10.push ($scope.numDataBit10[randomBall[1]]);
            filterBit10Data ();
            $scope.numDataBit1[randomBall[0]].check = true;
            filterBit1.push ($scope.numDataBit1[randomBall[0]]);
            filterBit1Data ();
        };
        /**
         * 1.此if是用来判断是不是在投注详情页面点击修改后跳转过来的
         * 2.如果是点击修改后跳转过来的需要渲染红篮球
         */
        if (sessionStorage.editThisOrderData5D) {
            var changeToArray5D = JSON.parse (sessionStorage.editThisOrderData5D);
            console.log (changeToArray5D);

            filterBit10000 = changeToArray5D.W_Bit;
            filterBit1000 = changeToArray5D.Q_Bit;
            filterBit100 = changeToArray5D.B_Bit;
            filterBit10 = changeToArray5D.S_Bit;
            filterBit1 = changeToArray5D.G_Bit;
            $scope.numDataBit10000[changeToArray5D.W_Bit[0].num].check = true;
            $scope.numDataBit1000[changeToArray5D.Q_Bit[0].num].check = true;
            $scope.numDataBit100[changeToArray5D.B_Bit[0].num].check = true;
            $scope.numDataBit10[changeToArray5D.S_Bit[0].num].check = true;
            $scope.numDataBit1[changeToArray5D.G_Bit[0].num].check = true;

            $scope.generate10000 = changeToArray5D.W_Bit[0].num;
            $scope.generate1000 = changeToArray5D.Q_Bit[0].num;
            $scope.generate100 = changeToArray5D.B_Bit[0].num;
            $scope.generate10 = changeToArray5D.S_Bit[0].num;
            $scope.generate1 = changeToArray5D.G_Bit[0].num;
        }

        if(type == 0 || type == undefined){
            if (PayType == 0) {
                $scope.saveBallSelect5D = function () {
                    joinMenu5 ();
                }
            }else {
                //加入选单
                $scope.saveBallSelect5D = function ($index) {
                    var json5D = {
                        W_Bit: filterBit10000,
                        Q_Bit: filterBit1000,
                        B_Bit: filterBit100,
                        S_Bit: filterBit10,
                        G_Bit: filterBit1
                    };
                    if (sessionStorage.jsonWrap5D) { //判断是否第一次点击确定 并且对进行完删除后赋值
                        var changeToArray5D = JSON.parse (sessionStorage.jsonWrap5D);
                        //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                        jsonWrapBit5D = changeToArray5D;
                    }
                    if (filterBit10000.length != 0 && filterBit1000.length != 0 && filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                        jsonWrapBit5D.push (json5D);
                        //console.log($rootScope.jsonWrapBit3D);
                        var sessionJsonWarp5D = JSON.stringify (jsonWrapBit5D); //解析数组
                        //console.log (sessionJsonWarp3D);
                        sessionStorage.jsonWrap5D = sessionJsonWarp5D; //session保存数据
                        //console.log(sessionStorage.jsonWrap3D);
                        $scope.generate10000 = 0;
                        $scope.generate1000 = 0;
                        $scope.generate100 = 0;
                        $scope.generate10 = 0;
                        $scope.generate1 = 0;
                        for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                            $scope.numDataBit10000[i].check = false;
                            $scope.numDataBit1000[i].check = false;
                            $scope.numDataBit100[i].check = false;
                            $scope.numDataBit10[i].check = false;
                            $scope.numDataBit1[i].check = false;
                            filterBit10000 = [];
                            filterBit1000 = [];
                            filterBit100 = [];
                            filterBit10 = [];
                            filterBit1 = [];
                        }
                        $state.go ('exchange-5Details');
                    }
                    else {
                        alert ('请正确选择号码');
                    }
                };
            }
        }else if(type == 1){
            if (PayType == 0) {
                $scope.saveBallSelect5D = function () {
                    joinMenu5 ();
                }
            }
            else {
                //加入选单
                $scope.saveBallSelect5D = function ($index) {
                    var json5D = {
                        W_Bit: filterBit10000,
                        Q_Bit: filterBit1000,
                        B_Bit: filterBit100,
                        S_Bit: filterBit10,
                        G_Bit: filterBit1
                    };
                    if (sessionStorage.jsonWrap5D) { //判断是否第一次点击确定 并且对进行完删除后赋值
                        var changeToArray5D = JSON.parse (sessionStorage.jsonWrap5D);
                        //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                        jsonWrapBit5D = changeToArray5D;
                    }
                    if (filterBit10000.length != 0 && filterBit1000.length != 0 && filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                        jsonWrapBit5D.push (json5D);
                        //console.log($rootScope.jsonWrapBit3D);
                        var sessionJsonWarp5D = JSON.stringify (jsonWrapBit5D); //解析数组
                        //console.log (sessionJsonWarp3D);
                        sessionStorage.jsonWrap5D = sessionJsonWarp5D; //session保存数据
                        //console.log(sessionStorage.jsonWrap3D);
                        $scope.generate10000 = 0;
                        $scope.generate1000 = 0;
                        $scope.generate100 = 0;
                        $scope.generate10 = 0;
                        $scope.generate1 = 0;
                        for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                            $scope.numDataBit10000[i].check = false;
                            $scope.numDataBit1000[i].check = false;
                            $scope.numDataBit100[i].check = false;
                            $scope.numDataBit10[i].check = false;
                            $scope.numDataBit1[i].check = false;
                            filterBit10000 = [];
                            filterBit1000 = [];
                            filterBit100 = [];
                            filterBit10 = [];
                            filterBit1 = [];
                        }
                        $state.go ('exchange-5Details');
                    }
                    else {
                        alert ('请正确选择号码');
                    }
                };
            }
        }

        //PayType =0 用抵用券扫码
        function joinMenu5 () {
            $ionicLoading.show ();
            //获取5D期号
            var reques = {};
            var userInfo = $util.getUserInfo ();
            var data = {
                lotteryID: 40
            };
            getWareIssueService.getWareIssue (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    reques = response.data;
                    console.log (reques);
                    if(response.error != '0'){
                        $scope.errorInfo = reques.info;
                        $rootScope.errorInfo();
                    }else {
                        getPl5add ();
                    }
                }, function (response) {
                    alert("获取期号失败，请重新登录");
                });
            // 排列五投注信息
            function getPl5add () {
                var userInfo = $util.getUserInfo ();
//                $rootScope.makeSureText = '';

                var dataArray = [];
                var dataObj = {
                    investCode: "",
                    multiple: 1
                };
                var investCode = null;
                if($scope.generate10000 && $scope.generate1000 && $scope.generate100 && $scope.generate10 && $scope.generate1){
                    investCode = $scope.generate10000 + '*';
                    investCode += $scope.generate1000 + '*';
                    investCode += $scope.generate100 + '*';
                    investCode += $scope.generate10 + '*';
                    investCode += $scope.generate1;
                }else {
                    alert('请先正确选择号码!');
                    return;
                }
                dataObj.investCode = investCode;
                dataArray.push (dataObj);
                console.log (dataArray);

                var vid = '';
                if(type == 0){
                    if(userInfo.data.vouchers){
                        for(var k = 0; k < userInfo.data.vouchers.length; k++ ){
                            if (userInfo.data.vouchers == undefined) {
                                vid = '';
                            }
                            else {
                                vid = userInfo.data.vouchers[k].vid;
                            }
                        }
                    }else {
                        vid = ''
                    }
                }else if(type == 1) {
                    if (userInfo.data.voucher == undefined) {
                        vid = $rootScope.nowVid;
                    }
                    else {
                        vid = userInfo.data.voucher.vid;
                    }
                }

                var data = {
//                    "lotteryID": "40",
                    wareIssue: reques.wareIssue,
                    payType: PayType,
                    vid: vid,
                    data: dataArray
                };
                $http ({
                    method: "POST",
                    url: ipUrl + '/service/lottery/pl5add?token=' + userInfo.data.token,
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 1000 * 10
                })
                    .then (function (response) {
                        $ionicLoading.hide ();
                        console.info (response);
                        console.dir (data);
                        if(response.data.error != '0'){
                            $scope.errorInfo = response.data.info;
                            $rootScope.errorInfo();
                        }else {
                            //提交成功窗口配置
                            $ionicModal.fromTemplateUrl ('templates/submission.html', {
                                scope: $scope,
                                backdropClickToClose:true
                            })
                                .then (function (modal) {
                                    modal.show ();
                                    $rootScope.makeSureText = '确 定';
                                    $scope.info = response.data.info;
                                    $scope.realName = userInfo.data.user.realName;
                                    $scope.phones = userInfo.data.user.phone;
                                    $scope.receives =  reques.createDate; //投注时间
                                    $scope.draw_time = reques.drawTime;    //开奖时间

                                    $scope.receiveNumArr = data.data;//获赠号码
                                    $scope.receiveNum = [];
                                    for(var i in $scope.receiveNumArr){
                                        var receiveNum = $scope.receiveNumArr[i].investCode;
                                        var receiveNumStr = receiveNum.split('*');

                                        $scope.receiveNum.push(receiveNumStr);
                                    }
                                    console.info($scope.receiveNumArr);
                                    console.info($scope.receiveNum);
//                            $scope.modal3 = modal;
                                    $scope.makeSure = function () {
                                        modal.hide ();
                                        $state.go ('allOrders');
                                        jsonWrapBit5D = [];
                                        sessionStorage.jsonWrap5D = '';
                                    }
                                });
                        }
                        //console.log (response.data.info);
                    }, function (response) {
                        alert('获取投注信息失败，请检查您的网络');
                        /*var confirmPopup = $ionicPopup.confirm ({
                            title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                            template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                            okText: '确认',
                            cancelText: '返回',
                            okType: 'button-darkBlue'
                        }).then (function () {
                            $state.go ('tab.account');
                        });*/
                    });
            }

            //错误码窗口配置
            $rootScope.errorInfo = function () {
                $ionicModal.fromTemplateUrl('templates/errorInfo.html', {
                    scope: $scope,
                    backdropClickToClose: true
                }).then(function(modal) {
                    $scope.modalError = modal;
                    modal.show ();
                });
                $scope.cancelPopError = function() {
                    $scope.modalError.hide();
                };
            };
        }

        //玩法说明时间
        var userInfo = $util.getUserInfo ();
        var data = {
            lotteryID: 40
        };
        getWareIssueService.getWareIssue(data, userInfo.data.token)
            .then(function (response) {
                $timeout(countTime,1);
//                $ionicLoading.hide();
                $scope.reques = response.data;
//                console.log ($scope.reques);

                var end_sale_time = $scope.reques.end_sale_time.replace(/-/g,'/');

                var timer = $interval (countTime, 1000);

                function countTime () {
                    var date = new Date ();//获取当前时间
                    var now = date.getTime ();

                    var endDate = new Date (end_sale_time); //设置截止时间
                    var end = endDate.getTime ();

                    var leftTime = end - now;//计算时间差

                    var d, h, m, s;
                    if (leftTime >= 0) {//定义变量 d,h,m,s保存倒计时的时间
                        d = Math.floor (leftTime / 1000 / 60 / 60 / 24);
                        h = Math.floor (leftTime / 1000 / 60 / 60 % 24);
                        m = Math.floor (leftTime / 1000 / 60 % 60);
                        s = Math.floor (leftTime / 1000 % 60);
                    }
                    $scope.hours = checkTime ((d * 24) + h);
                    $scope.minute = checkTime (m);
                    $scope.second = checkTime (s);

                    function checkTime (i) { //将0-9的数字前面加上0，例1变为01
                        if (i < 10) {
                            i = "0" + i;
                        }
                        return i;
                    }
                }
            }, function (response) {
                alert("获取期号或时间失败，请退出重新登录");
            });

        //网期开奖
        $scope.history5D = function () {
            $state.go ('exchangehistory5D');
        }
    });
