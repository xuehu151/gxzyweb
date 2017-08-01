/**
 * Created by admin on 2017/6/23.
 */
//全部订单

var url = "http://121.42.253.149:18820";
angular.module ('starter.allOrdersCtrl', ['starter.services'])
    
    .controller ('allOrdersCtrl', function ($scope, $rootScope, $state, getUser, locals, $ionicLoading, splitCode, $util,$ionicSlideBoxDelegate,difOrders) {
        $scope.tabNames = ['全部订单', '待开奖', '已中奖','未中奖'];
        $scope.selectIndex = 0;
       /* $scope.activeSlide = function (index) {//点击时候触发
            $scope.slectIndex = index;
            $ionicSlideBoxDelegate.slide (index);
        };
        $scope.slideChanged = function (index) {//滑动时候触发
            $scope.slectIndex = index;
        };*/

        $scope.activeTab=function (index) {
            $scope.selectIndex=index;
        }
        // $scope.pages = ["templates/bigLottoHistoryDetails.html", "templates/exchangehistory3D.html", "templates/exchangehistory5D.html"];

        $ionicLoading.show ({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        getUser.getInfo (url + '/service/lottery/getList?token=' + token)
            .then (function (response) {
                console.log (response);
                $scope.allOrders = response.data;

                $scope.variOrders=difOrders.diff($scope.allOrders)  //全部订单
                 console.log($scope.variOrders)


                
                $ionicLoading.hide ();
            }, function () {
                alert ('网络异常,未能获取到全部订单');
            });
        $scope.toOrderDetail = function (ticketID) {
            for (var i = 0; i < $scope.allOrders.length; i++) {
                //找到当前点击的订单,保存
                if (ticketID == $scope.allOrders[i].ticketID) {
                    var investCode = splitCode.split ($scope.allOrders[i].investCode);
                    console.log (investCode);
                    if ($scope.allOrders[i].payType == 0) {
                        payType = '扫码兑换';
                    }
                    else if ($scope.allOrders[i].payType == 1) {
                        payType = '¥' + $scope.allOrders[i].money;
                    }
                    $rootScope.orderDetail = {
                        lotteryID: $scope.allOrders[i].lotteryID,
                        openTime: $scope.allOrders[i].drawTime,
                        status: $scope.allOrders[i].status,
                        investCode: investCode,
                        payType: payType,
                        // pay: $scope.allOrders[i].money,
                        ticketID: ticketID,
                        orderTime: $scope.allOrders[i].createDate,
                        winMoney: $scope.allOrders[i].winamt
                    }
                }
            }
            $state.go ('orderDetail');
        }

    });


/*var url = "http://121.42.253.149:18820";
//全部订单页面
angular.module ('starter.allOrdersCtrl', ['starter.services'])
    
    .controller ('allOrdersCtrl', function ($scope, $rootScope, $state, getUser, locals, $ionicLoading, splitCode, $util) {
        $ionicLoading.show ({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        getUser.getInfo (url + '/service/lottery/getList?token=' + token)
            .then (function (response) {
                console.log (response);
                $scope.allOrders = response.data;
                for (var i = 0; i < $scope.allOrders.length; i++) {
                    if ($scope.allOrders[i].lotteryID == 53) {
                        $scope.allOrders[i].lotteryID = '排列五'
                    }
                    else if ($scope.allOrders[i].lotteryID == 54) {
                        $scope.allOrders[i].lotteryID = '排列三'
                    }
                    else {
                        $scope.allOrders[i].lotteryID = '大乐透'
                    }
                    if ($scope.allOrders[i].status == 0 || $scope.allOrders[i].status == 1 || $scope.allOrders[i].status == 2) {
                        $scope.allOrders[i].whetherRed = true;
                        $scope.allOrders[i].status = '待开奖';
                        $scope.allOrders[i].whetherDate = true;
                        $scope.allOrders[i].LT = '开奖时间: ' + $scope.allOrders[i].drawTime;
                        if ($scope.allOrders[i].payType == 0) {
                            $scope.allOrders[i].RT = '扫码兑换';
                        }
                        else if ($scope.allOrders[i].payType == 1) {
                            $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                        }
                    }
                    else if ($scope.allOrders[i].status == 4) {
                        $scope.allOrders[i].whetherRed = true;
                        $scope.allOrders[i].status = '已中奖';
                        $scope.allOrders[i].whetherDate = false;
                        $scope.allOrders[i].LT = '奖金: ¥' + $scope.allOrders[i].winamt;
                        if ($scope.allOrders[i].payType == 0) {
                            $scope.allOrders[i].RT = '扫码兑换';
                        }
                        else if ($scope.allOrders[i].payType == 1) {
                            $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                        }
                    }
                    else if ($scope.allOrders[i].status == -1) {
                        $scope.allOrders[i].whetherRed = false;
                        $scope.allOrders[i].status = '兑换超时';
                        $scope.allOrders[i].whetherDate = false;
                        $scope.allOrders[i].LT = '  ';
                        if ($scope.allOrders[i].payType == 0) {
                            $scope.allOrders[i].RT = '扫码兑换';
                        }
                        else if ($scope.allOrders[i].payType == 1) {
                            $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                        }
                    }
                    else if ($scope.allOrders[i].status == 3) {
                        $scope.allOrders[i].whetherRed = false;
                        $scope.allOrders[i].status = '未中奖';
                        $scope.allOrders[i].whetherDate = false;
                        $scope.allOrders[i].LT = '再接再厉哦~~~';
                        if ($scope.allOrders[i].payType == 0) {
                            $scope.allOrders[i].RT = '扫码兑换';
                        }
                        else if ($scope.allOrders[i].payType == 1) {
                            $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                        }
                    }
                }
                $ionicLoading.hide ();
            }, function () {
                alert ('网络异常,未能获取到全部订单');
            });
        $scope.toOrderDetail = function (ticketID) {
            for (var i = 0; i < $scope.allOrders.length; i++) {
                //找到当前点击的订单,保存
                if (ticketID == $scope.allOrders[i].ticketID) {
                    var investCode = splitCode.split ($scope.allOrders[i].investCode);
                    console.log (investCode);
                    if ($scope.allOrders[i].payType == 0) {
                        payType = '扫码兑换';
                    }
                    else if ($scope.allOrders[i].payType == 1) {
                        payType = '¥' + $scope.allOrders[i].money;
                    }
                    $rootScope.orderDetail = {
                        lotteryID: $scope.allOrders[i].lotteryID,
                        openTime: $scope.allOrders[i].drawTime,
                        status: $scope.allOrders[i].status,
                        investCode: investCode,
                        payType: payType,
                        // pay: $scope.allOrders[i].money,
                        ticketID: ticketID,
                        orderTime: $scope.allOrders[i].createDate,
                        winMoney: $scope.allOrders[i].winamt
                    }
                }
            }
            $state.go ('orderDetail');
        }
    });

*/
