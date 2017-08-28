/**
 * Created by admin on 2017/6/14.
 */
var ipUrl = 'http://lottery.zhenlong.wang/service';

angular.module ('starter.Exchange-3Ctrl', ['starter.services'])
//兑换 排列3
    .controller ('Exchange-3Ctrl', function ($scope, $state, $rootScope, $interval, getWareIssueService, $util, $ionicLoading, $http, $ionicModal, $ionicPopup, $timeout) {
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
        $scope.generate100 = '';
        $scope.generate10 = '';
        $scope.generate1 = '';
        //二维码投注时的数据存放
        var redBall_100 = [];
        var redBall_10 = [];
        var redBall_0 = [];

        // Create the ball items   百位
        for (var j = 0; j < 10; j++) {
            var itemsBit = {
                num: j,
                check: false
            };
            $scope.numDataBit100.push (itemsBit);
        }
        //给百位添加点击事件
        filterBit100 = [];
        $scope.addBit100Click = function (item) {
            redBall_100 = [];
            $scope.numDataBit100 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit = {
                        num: j,
                        check: true
                    };
                    filterBit100[0] = item;
                    $scope.numDataBit100.push (itemsBit);
                    redBall_100.push(itemsBit);
                }
                else {
                    var itemsBit1 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit100.push (itemsBit1);
                }
            }
            // console.log(filterBit100);
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
        filterBit10 = [];
        $scope.addBit10Click = function (item) {
            redBall_10 = [];
            $scope.numDataBit10 = [];
            for (var i = 0; i < 10; i++) {
                if (item.num == i) {
                    var itemsBit10 = {
                        num: i,
                        check: true
                    };
                    filterBit10[0] = item;
                    $scope.numDataBit10.push (itemsBit10);
                    redBall_10.push(itemsBit10);
                }
                else {
                    var itemsBit10 = {
                        num: i,
                        check: false
                    };
                    $scope.numDataBit10.push (itemsBit10);
                }
            }
            //判断filterBit100的长度确定generate100值
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
        filterBit1 = [];
        $scope.addBit1Click = function (item) {
            redBall_0 = [];
            $scope.numDataBit1 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1 = {
                        num: j,
                        check: true
                    };
                    filterBit1[0] = item;
                    $scope.numDataBit1.push (itemsBit1);
                    redBall_0.push(itemsBit1);
                }
                else {
                    var itemsBit1 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit1.push (itemsBit1);
                }
            }
            console.info(redBall_0[0].num);
            //判断filterBit100的长度确定generate100值
            filterBit1Data ();
        };

        function filterBit100Data () {
            if (filterBit100.length == 0) {
                $scope.generate100 = '';
            }
            else {
                $scope.generate100 = filterBit100[0].num;
            }
        }

        function filterBit10Data () {
            if (filterBit10.length == 0) {
                $scope.generate10 = '';
            }
            else {
                $scope.generate10 = filterBit10[0].num;
            }
        }

        function filterBit1Data () {
            if (filterBit1.length == 0) {
                $scope.generate1 = '';
            }
            else {
                $scope.generate1 = filterBit1[0].num;
            }
        }

        //随机选取号码
        var randomBall = []; //原数组
        $scope.randomBallExchage = function () {
            randomBall = []; //一进来清空数组
            //给原数组randomBall赋值
            for (var i = 0; i < 3; i++) {
                var randomExchage = parseInt (Math.random () * 10);
                randomBall.push (randomExchage);
            }
            // console.log (randomBall);
            randomBall.sort (function () {
                return Math.random ();
            });
            for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                $scope.numDataBit100[i].check = false;
                $scope.numDataBit10[i].check = false;
                $scope.numDataBit1[i].check = false;
                filterBit100 = [];
                filterBit10 = [];
                filterBit1 = [];
            }
            //随机打撒
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
//        console.log (sessionStorage.editThisOrderData3d)
        if (sessionStorage.editThisOrderData3D) {
            var changeToArray3D = JSON.parse (sessionStorage.editThisOrderData3D);
            filterBit100 = changeToArray3D.B_Bit;
            filterBit10 = changeToArray3D.S_Bit;
            filterBit1 = changeToArray3D.G_Bit;
            $scope.numDataBit100[changeToArray3D.B_Bit[0].num].check = true;
            $scope.numDataBit10[changeToArray3D.S_Bit[0].num].check = true;
            $scope.numDataBit1[changeToArray3D.G_Bit[0].num].check = true;
            $scope.generate100 = changeToArray3D.B_Bit[0].num;
            $scope.generate10 = changeToArray3D.S_Bit[0].num;
            $scope.generate1 = changeToArray3D.G_Bit[0].num;
        }

        if(type == 0 || type == undefined){
            if (PayType == 0) {
                $scope.saveBallSelect3D = function () {
                    joinMenu3D ();
                }
            }else {
                //加入选单
                $scope.saveBallSelect3D = function ($index) {
                    var json3D = {
                        B_Bit : filterBit100,
                        S_Bit : filterBit10,
                        G_Bit : filterBit1
                    };
                    if (sessionStorage.jsonWrap3D) { //判断是否第一次点击确定 并且对进行完删除后赋值
                        var changeToArray3D = JSON.parse (sessionStorage.jsonWrap3D);
                        //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                        jsonWrapBit3D = changeToArray3D;
                    }
                    if (filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                        jsonWrapBit3D.push (json3D);
                        //                console.log($rootScope.jsonWrapBit3D);
                        var sessionJsonWarp3D = JSON.stringify (jsonWrapBit3D); //解析数组
                        //console.log (sessionJsonWarp3D);
                        sessionStorage.jsonWrap3D = sessionJsonWarp3D; //session保存数据
                        //console.log(sessionStorage.jsonWrap3D);
                        $scope.generate100 = 0;
                        $scope.generate10 = 0;
                        $scope.generate1 = 0;
                        for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                            $scope.numDataBit100[i].check = false;
                            $scope.numDataBit10[i].check = false;
                            $scope.numDataBit1[i].check = false;
                            filterBit100 = [];
                            filterBit10 = [];
                            filterBit1 = [];
                        }
                        $state.go ('exchange-3Details');
                    }
                    else {
                        alert ('请正确选择号码');
                    }
                };
            }
        }else if(type == 1){
            if (PayType == 0) {
                $scope.saveBallSelect3D = function () {
                    joinMenu3D ();
                }
            }
            else {
                //加入选单
                $scope.saveBallSelect3D = function ($index) {
                    var json3D = {
                        B_Bit : filterBit100,
                        S_Bit : filterBit10,
                        G_Bit : filterBit1
                    };
                    if (sessionStorage.jsonWrap3D) { //判断是否第一次点击确定 并且对进行完删除后赋值
                        var changeToArray3D = JSON.parse (sessionStorage.jsonWrap3D);
                        //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                        jsonWrapBit3D = changeToArray3D;
                    }
                    if (filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                        jsonWrapBit3D.push (json3D);
                        //                console.log($rootScope.jsonWrapBit3D);
                        var sessionJsonWarp3D = JSON.stringify (jsonWrapBit3D); //解析数组
                        //console.log (sessionJsonWarp3D);
                        sessionStorage.jsonWrap3D = sessionJsonWarp3D; //session保存数据
                        //console.log(sessionStorage.jsonWrap3D);
                        $scope.generate100 = 0;
                        $scope.generate10 = 0;
                        $scope.generate1 = 0;
                        for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                            $scope.numDataBit100[i].check = false;
                            $scope.numDataBit10[i].check = false;
                            $scope.numDataBit1[i].check = false;
                            filterBit100 = [];
                            filterBit10 = [];
                            filterBit1 = [];
                        }
                        $state.go ('exchange-3Details');
                    }
                    else {
                        alert ('请正确选择号码');
                    }
                };
            }
        }
        //PayType =0 用抵用券扫码
        function joinMenu3D () {
            //获取3D期号
            var reques = {};
            var userInfo = $util.getUserInfo ();

            var data = {
                lotteryID : 31
            };
            getWareIssueService.getWareIssue (data, userInfo.data.token)
                .then (function (response) {
                    // console.log(response);
                    reques = response.data;
                    console.log (reques);
                    if(response.error != '0'){
                        $scope.errorInfo = reques.info;
                        $rootScope.errorInfo();
                    }else {
                        getPl3add ();
                    }
                }, function (response) {
                    console.log ("获取列表失败");
                });
            // 排列三投注信息接口
            function getPl3add () {
                var userInfo = $util.getUserInfo ();
                $rootScope.makeSureText = '';

                var dataArray = [];
                var dataObj = {
                    investCode : "",
                    multiple : 1
                };
                var investCode = null;
                if(redBall_100[0] != undefined && redBall_10[0] != undefined && redBall_0[0] != undefined || $scope.numDataBit100[randomBall[2]] && $scope.numDataBit10[randomBall[1]] && $scope.numDataBit1[randomBall[0]]){
                    if($scope.numDataBit100[randomBall[2]] && $scope.numDataBit10[randomBall[1]] && $scope.numDataBit1[randomBall[0]]) {
                        investCode = $scope.numDataBit100[randomBall[2]].num + '*';
                        investCode += $scope.numDataBit10[randomBall[1]].num + '*';
                        investCode += $scope.numDataBit1[randomBall[0]].num;
                    }else if(redBall_100[0].num && redBall_10[0].num && redBall_0[0].num){
                        console.info(redBall_0[0].num);
                        investCode = redBall_100[0].num + '*';
                        investCode += redBall_10[0].num + '*';
                        investCode += redBall_0[0].num;
                    }else {
                        alert('请先选择号码!');
                        return;
                    }
                }else {
                    alert('请先选择号码!');
                    return;
                }
                dataObj.investCode = investCode;
                dataArray.push (dataObj);
                console.info(dataObj);

                //console.log(userInfo.data.voucher);
                var vid = '';
                if (type == 0) {
                    if(userInfo.data.vouchers){
                        for (var k = 0; k < userInfo.data.vouchers.length; k++) {
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
                }
                else if (type == 1){
                    if (userInfo.data.voucher == undefined) {
                        vid = $rootScope.nowVid;
                    }
                    else {
                        vid = userInfo.data.voucher.vid;
                    }
                }

                var data = {
                    //lotteryID: 31,
                    wareIssue : reques.wareIssue,
                    payType : PayType,
                    vid : vid,
                    data : dataArray
                };
                $http ({
                    method : "POST",
                    url : ipUrl + '/lottery/pl3add?token=' + userInfo.data.token,
                    data : data,
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })
                //BettingService.pl3Add(data, userInfo.data.token)
                    .then (function (response) {
                        $ionicLoading.hide ();
                        console.info (data);
                        console.log (response.data);
                        if(response.data.error != '0'){
                            $scope.errorInfo = response.data.info;
                            console.info($scope.errorInfo);
                            $rootScope.errorInfo();
                        }
                        else {
                            //提交成功窗口配置
                            $ionicModal.fromTemplateUrl ('templates/submission.html', {
                                scope : $scope,
                                backdropClickToClose : true
                            })
                                .then (function (modal) {
                                    modal.show ();
                                    $rootScope.makeSureText = '确 定';
                                    $scope.info = response.data.info;
                                    $scope.realName = userInfo.data.user.realName;
                                    $scope.phones = userInfo.data.user.phone;
                                    $scope.receives = userInfo.data.user.updateDate; //获赠时间
                                    $scope.draw_time = reques.drawTime;    //开奖时间

                                    $scope.receiveNumArr = data.data;//获赠号码
                                    $scope.receiveNum = [];
                                    for (var i in $scope.receiveNumArr) {
                                        var receiveNum = $scope.receiveNumArr[i].investCode;
                                        var receiveNumStr = receiveNum.split ('*');

                                        $scope.receiveNum.push (receiveNumStr);
                                    }
                                    console.info ($scope.receiveNumArr);
                                    console.info ($scope.receiveNum);
                                    //$scope.modal3 = modal;
                                    $scope.makeSure = function () {
                                        modal.hide ();
                                        $state.go ('allOrders');
                                        jsonWrapBit3D = [];
                                        sessionStorage.jsonWrap3D = '';
                                    }
                                });
                        }
                    }, function (response) {
                        var confirmPopup = $ionicPopup.confirm ({
                            title : '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                            template : '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                            okText : '确认',
                            cancelText : '返回',
                            okType : 'button-darkBlue'
                        }).then (function () {
                            $state.go ('tab.account');
                        });
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
            lotteryID: 31
        };
        getWareIssueService.getWareIssue (data, userInfo.data.token)
            .then (function (response) {
                $timeout(countTime,1);

                //$ionicLoading.hide();
                $scope.reques = response.data;
                console.log ($scope.reques);
                var timer = $interval (countTime, 1000);
                var end_sale_time = $scope.reques.end_sale_time.replace(/-/g,'/');

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
               alert ("获取列表失败");
            });

        //网期开奖
        $scope.history3D = function () {
            $state.go ('exchangehistory3D');
        }
    });
