/**
 * Created by admin on 2017/6/23.
 */
//全部订单

var url = "http://lottery.zhenlong.wang";
angular.module('starter.allOrdersCtrl', ['starter.services'])

    .controller('allOrdersCtrl', ['$scope', '$rootScope', '$state', 'getUser', 'locals', '$ionicLoading', 'splitCode', '$util', 'difOrders', '$ionicModal', '$timeout','$ionicScrollDelegate', function($scope, $rootScope, $state, getUser, locals, $ionicLoading, splitCode, $util, difOrders, $ionicModal, $timeout,$ionicScrollDelegate) {
        $scope.tabNames = ['全部订单', '待开奖', '已中奖', '未中奖'];
        $scope.selectIndex = 0;
        // $scope.thisErrorModal=errorModal
        $scope.activeTab = function(index) {
            $scope.selectIndex = index;
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        };
        $ionicLoading.show({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;
        var vm = $scope.vm = {
            moredata: true,
            orderEach:[],
            nowarray:[[],[],[]],
            otherArray3:[],
            messages: [],
            pagination: {
                pageSize: 8,
                pageNum: 1
            },
            loadMore: function() {
                getUser.getInfo(url + '/service/lottery/getList?token=' + token + '&pageNum=' + vm.pagination.pageNum + '&pageSize=' + vm.pagination.pageSize)
                    .then(function(response) {
                        console.log(response);
                        if (response.error == '0' && response.data.length != 0) {
                            $scope.allOrders=vm.orderEach =vm.orderEach.concat(response.data) ;
                            console.log($scope.allOrders)
                            // console.log(vm.nowarray)
                            vm.otherArray3 = difOrders.diff($scope.allOrders) //全部订单
                            console.log($scope.variOrders)
                            console.log(vm.otherArray3)
                            for (var i = 0; i < vm.otherArray3.length; i++) {
                                vm.nowarray[i]=vm.nowarray[i].concat(vm.otherArray3[i])
                                console.log(vm.nowarray[i])
                            }
                            $scope.variOrders=vm.nowarray
                            console.log($scope.variOrders)
                            vm.pagination.pageNum += 1;
                        }
                        else if (response.error == '0' && response.data.length == 0) {
                            vm.moredata = false;
                        }
                        else {
                            $scope.error = response.info;
                            $timeout(function() {
                                $scope.modalError.show();
                            }, 100);
                        }
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function(error) {
                        alert(error);
                        $ionicLoading.hide();
                    });

            }
        }

        $scope.toOrderDetail = function(order) {
            var investCode = []; //保存点击的订单的号码
            var winMoney = 0;
            console.log(order);
            for (var i = 0; i < order.lotteryList.length; i++) {

                var OneCode = splitCode.split(order.lotteryList[i].investCode);
                investCode.push(OneCode);
                winMoney += order.lotteryList[i].winamt;
                console.log(OneCode);
            }
            console.log(investCode);
            if (order.payType == 0 && order.channelName == 'undefined') {
                payType = '扫码兑换';
            } else if (order.payType == 1) {
                payType = '¥' + order.money;
            } else if (order.payType == 0 && order.channelName == '测试' ) {
                payType = order.channelName;
            }

            $rootScope.orderDetail = {
                lotteryID: order.lotteryID,
                openTime: order.drawTime, //
                status: order.status,
                investCode: investCode, //
                payType: payType,
                pay: order.money,
                ticketID: order.orderNo,
                orderTime: order.createDate,
                winMoney: winMoney
            };
            $state.go('orderDetail');
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
