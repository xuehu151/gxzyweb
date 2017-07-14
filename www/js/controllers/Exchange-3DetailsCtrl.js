/**
 * Created by admin on 2017/6/14.
 */

var ipUrl = 'http://114.215.70.179:8088/service';

angular.module('starter.Exchange-3DetailsCtrl', ['starter.services'])
//兑换 排列 3 详情
    .controller('Exchange-3DetailsCtrl', function ($scope, $state, $http, $ionicPopup, $rootScope, $ionicLoading, $util, BettingService, getWareIssueService) {
        $scope.sessionJsonWarp3D = JSON.parse(sessionStorage.jsonWrap3D); //反解析
        //console.log ($scope.sessionJsonWarp3D);
        //设置表单初始值
        $scope.multiple = '1';
        $scope.totalMoney = $scope.sessionJsonWarp3D.length;
        $scope.isDisabled = true;
        disabledBtn3D();

        var PayType3D = null;
        function disabledBtn3D() {
            //判断用户要用什么来兑换彩票    余额 || 抵用券
            if (type == 0) {
                if (PayType == 0) {
                    PayType3D = userInfo.data.voucher.money
                }else if(PayType == 1){
                    PayType3D = userInfo.data.user.money
                }
            }else if(type == 1){
                if (PayType == 0) {
                    for(var k = 0; k < userInfo.data.vouchers.length; k++){
                        PayType3D = userInfo.data.vouchers[k].money;
//                        console.info(userInfo.data.vouchers[k]);
                    }
                }
                else if (PayType == 1) {
                    PayType3D = userInfo.data.user.money
                }
            }
            if ($scope.totalMoney > PayType3D) {
                $scope.isDisabled = true;
                var alertPopup = $ionicPopup.alert({
                    title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                    template: '<div class="alert-left">' + '<p style="text-align: center">余额不足,请充值或删除多余的投注</p>' + '</div>',
                    okText: '确 定',
                    okType: 'button-light'
                }).then(function () {
                    /////
                });
            }
            else {
                $scope.isDisabled = false;
            }
        }

        //手动添加一组
        $scope.manualAdd3D = function () {
            $state.go('exchange-3');
            sessionStorage.editThisOrderData3D = ''; //清除点击修改后保存在session.editThisOrderData中的数据
        };
        //店家机选，在本页面随机添加一注
        $scope.autoAdd3D = function () {
            var arrBit100 = [];
            var arrBit10 = [];
            var arrBit1 = [];
            var addJson3D = {
                B_Bit: arrBit100,
                S_Bit: arrBit10,
                G_Bit: arrBit1
            };
            //店主点击随机产生百位号码
            var randomNum100 = parseInt(Math.random() * 10);
            var itemsBit100 = {
                num: randomNum100,
                check: false
            };
            arrBit100.push(itemsBit100);
            //店主点击随机产生十位号码
            var randomNum10 = parseInt(Math.random() * 10);
            var itemsBit10 = {
                num: randomNum10,
                check: false
            };
            arrBit10.push(itemsBit10);
            //店主点击随机产生十位号码
            var randomNum1 = parseInt(Math.random() * 10);
            var itemsBit1 = {
                num: randomNum1,
                check: false
            };
            arrBit1.push(itemsBit1);
            //由于路由的切换,需本地保存session
            sessionStorage.saveStr3D = JSON.stringify(addJson3D);
            var addObject3D = JSON.parse(sessionStorage.saveStr3D);
            $scope.sessionJsonWarp3D.push(addObject3D);
            sessionStorage.jsonWrap3D = JSON.stringify($scope.sessionJsonWarp3D); //再次解析保存机选后的值
            $scope.sessionJsonWarp3D = JSON.parse(sessionStorage.jsonWrap3D);
            $scope.totalMoney = $scope.sessionJsonWarp3D.length; //设置背时和金额
            disabledBtn3D();
        };
        //点击删除一组
        $scope.deleteRow3D = function ($index) {
            $scope.sessionJsonWarp3D.splice($index, 1); //点击删除本行
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify($scope.sessionJsonWarp3D);
            sessionStorage.jsonWrap3D = changeToStr;
            //            console.log (sessionStorage.jsonWrap3D);
            $scope.totalMoney -= 1;
            disabledBtn3D();
        };
  
        //点击返回选择号码页面
        $scope.editThisOrder3D = function ($index) {
            var thisIndexOrder3D = $scope.sessionJsonWarp3D[$index];
            var changeToStr3D = JSON.stringify(thisIndexOrder3D);
            //            console.info (changeToStr3D);
            sessionStorage.editThisOrderData3D = changeToStr3D; //在本地保存选中的那组数据
            $state.go('exchange-3');
            $scope.deleteRow3D($index);
        };
        //排列三确认提交
        $scope.submitCms = function () {
            $ionicLoading.show();
            if ($scope.multiple == 0) { //投注倍数限制
                alert('倍数不能为0');
                return;
            }
            //获取3D期号
            var reques = {};
            var userInfo = $util.getUserInfo();
           /* $http ({
                method: "POST",
                url: ipUrl + '/lottery/getWareIssue?token=' + userInfo.data.token,
                params: {
                    LotteryID: 54
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })*/
           
            var data = {
                lotteryID: 31
            };
            getWareIssueService.getWareIssue(data, userInfo.data.token)
                .then(function (response) {
//                   console.log(response);
                    reques = response.data;
                    console.log(reques);
                    getPl3add();
                }, function (response) {
                    console.log("获取列表失败");
                });
            // 排列三投注信息接口
            function getPl3add() {
                var userInfo = $util.getUserInfo();
                
                var dataArray = [];
                for (var i in $scope.sessionJsonWarp3D) {
                    var dataObj = {
                        investCode: "",
                        multiple: 1
                    };
                    var investCode = null;
                    investCode = $scope.sessionJsonWarp3D[i].B_Bit[0].num + "*";
                    investCode += $scope.sessionJsonWarp3D[i].S_Bit[0].num + "*";
                    investCode += $scope.sessionJsonWarp3D[i].G_Bit[0].num;
                    dataObj.investCode = investCode;
                    dataArray.push(dataObj);
                    //console.log (dataArray);
                }
//                console.log(userInfo.data.voucher);
                var vid = '';
                if(type == 0){
                    if (userInfo.data.voucher == undefined) {
                        vid = '';
                    }
                    else {
                        vid = userInfo.data.voucher.vid;
                    }
                }else if(type == 1) {
                    for(var k = 0; k < userInfo.data.vouchers.length; k++ ){
                        if (userInfo.data.vouchers == undefined) {
                            vid = '';
                        }
                        else {
                            vid = userInfo.data.vouchers[k].vid;
                        }
                    }
                }

                var data = {
//                    lotteryID: 31,
                    wareIssue: reques.wareIssue,
                    payType: PayType,
                    vid: vid,
                    data: dataArray
                };
//                console.log(data.token);
                $http ({
                    method: "POST",
                    url: ipUrl + '/lottery/pl3add?token=' + userInfo.data.token,
                    data: data,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
//                BettingService.pl3Add(data, userInfo.data.token)
                    .then(function (response) {
                        $ionicLoading.hide();
                        console.info(data);
                        console.log(response.data);
                        var alertPopup = $ionicPopup.alert({
                            title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                            template: '<div class="alert-left"><p style="text-align: center">' + response.data.info + '</p></div>',
                            okText: '确 定',
                            okType: 'button-light'
                        })
                            .then(function (response) {
                                $state.go('tab.account');
                            });
                    }, function (response) {
                        var confirmPopup = $ionicPopup.confirm({
                            title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                            template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                            okText: '确认',
                            cancelText: '返回',
                            okType: 'button-darkBlue'
                        }).then(function () {
                            $state.go('tab.account');
                        });
                    });
            }
        }
    });
