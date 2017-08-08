/**
 * Created by admin on 2017/6/23.
 */
//全部订单

var url = "http://lottery.zhenlong.wang";
angular.module ('starter.allOrdersCtrl', ['starter.services'])

    .controller ('allOrdersCtrl', ['$scope','$rootScope','$state','getUser','locals','$ionicLoading','splitCode','$util','difOrders','$ionicModal','$timeout',function ($scope, $rootScope, $state, getUser, locals, $ionicLoading, splitCode, $util,difOrders,$ionicModal,$timeout) {
        $scope.tabNames = ['全部订单', '待开奖', '已中奖','未中奖'];
        $scope.selectIndex = 0;
        // $scope.thisErrorModal=errorModal
        $scope.activeTab=function (index) {
            $scope.selectIndex=index;
        };

        $ionicLoading.show ({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;

        getUser.getInfo (url + '/service/lottery/getList?token=' + token)
            .then (function (response) {
                console.log (response);
                if (response.error=='0')
                {
                    $scope.allOrders = response.data;

                    $scope.variOrders=difOrders.diff($scope.allOrders)  //全部订单
                     console.log($scope.variOrders)
                }
                else
                {
                    $scope.error=response.info;
                    $timeout(function() {
                        $scope.modalError.show();
                    }, 100);
                }
                $ionicLoading.hide ();
            }, function (error) {
                alert(error);
                $ionicLoading.hide ();
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
            else if (order.payType == 2) {
                payType = '***';
            }

            $rootScope.orderDetail = {
                lotteryID: order.lotteryID,
                openTime: order.drawTime,  //
                status: order.status,
                investCode: investCode,    //
                payType: payType,
                // pay: $scope.allOrders[i].money,
                ticketID: order.orderNo,
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
        };

        //错误码窗口配置
        $ionicModal.fromTemplateUrl('templates/errorPop.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modalError = modal;
        });
        $scope.cancelPopError = function() {
            $scope.modalError.hide();
        };
    }]);
