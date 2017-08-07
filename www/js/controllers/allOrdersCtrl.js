/**
 * Created by admin on 2017/6/23.
 */
//全部订单

var url = "http://121.42.253.149:18820";
angular.module ('starter.allOrdersCtrl', ['starter.services'])

    .controller ('allOrdersCtrl', function ($scope, $rootScope, $state, getUser, locals, $ionicLoading, splitCode, $util,$ionicSlideBoxDelegate,difOrders) {
        $scope.tabNames = ['全部订单', '待开奖', '已中奖','未中奖'];
        $scope.selectIndex = 0;
        $scope.activeTab=function (index) {
            $scope.selectIndex=index;
        }


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

        $scope.toOrderDetail = function (order) {
            var investCode = [];   //保存点击的订单的号码
            var winMoney=0;
            console.log(order);
            for (var i = 0; i < order.lotteryList.length; i++) {

                 var OneCode = splitCode.split (order.lotteryList[i].investCode);
                 investCode.push(OneCode);
                 winMoney+=order.lotteryList[i].winamt;
                 console.log(OneCode);
            }
            console.log(investCode);
            if (order.payType == 0) {
                payType = '扫码兑换';
            }
            else if (order.payType == 1) {
                payType = '¥' + order.money;
            }

            $rootScope.orderDetail = {
                lotteryID: order.lotteryID,
                openTime: $scope.allOrders[i].lotteryList[0].drawTime,  //
                status: order.status,
                investCode: investCode,    //
                payType: payType,
                // pay: $scope.allOrders[i].money,
                // ticketID: ticketID,
                orderTime: order.createDate,
                winMoney: winMoney
            };

            /*for (var i = 0; i < $scope.allOrders.length; i++) {
                //找到当前点击的订单,保存
                if (ticketID == $scope.allOrders[i].lotteryList[0].ticketID) {
                    var investCode = splitCode.split ($scope.allOrders[i].lotteryList[0].investCode);
                    console.log (investCode);
                    if ($scope.allOrders[i].payType == 0) {
                        payType = '扫码兑换';
                    }
                    else if ($scope.allOrders[i].payType == 1) {
                        payType = '¥' + $scope.allOrders[i].money;
                    }
                    $rootScope.orderDetail = {
                        lotteryID: $scope.allOrders[i].lotteryID,
                        openTime: $scope.allOrders[i].lotteryList[0].drawTime,
                        status: $scope.allOrders[i].status,
                        investCode: investCode,
                        payType: payType,
                        // pay: $scope.allOrders[i].money,
                        ticketID: ticketID,
                        orderTime: $scope.allOrders[i].createDate,
                        winMoney: $scope.allOrders[i].winamt
                    }
                }
            }*/
            $state.go ('orderDetail');
        }

    });
