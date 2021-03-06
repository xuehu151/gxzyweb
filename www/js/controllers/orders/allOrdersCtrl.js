/**
 * Created by admin on 2017/6/23.
 */
//全部订单

//var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名

angular.module('starter.allOrdersCtrl', ['starter.services'])

    .controller('allOrdersCtrl', ['$scope', '$rootScope', '$state', 'getUser', 'locals', '$ionicLoading', 'splitCode', '$util', 'difOrders', '$ionicModal', '$timeout', '$ionicScrollDelegate', function ($scope, $rootScope, $state, getUser, locals, $ionicLoading, splitCode, $util, difOrders, $ionicModal, $timeout, $ionicScrollDelegate) {
        $scope.tabNames = ['全部订单', '待开奖', '已中奖', '未中奖'];
        $scope.selectIndex = 0;
        // $scope.thisErrorModal=errorModal
        $scope.activeTab = function (index) {
            $scope.selectIndex = index;
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        };
        $ionicLoading.show({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;

        /**
         * [分页]
         * @type {[type]}
         */
        var vm = $scope.vm = {
            moredata: true,
            orderEach: [],
            pagination: {
                pageSize: 8,
                pageNum: 1
            },
            loadMore: function () {
                getUser.getInfo(url + '/service/lottery/getList?token=' + token + '&pageNum=' + vm.pagination.pageNum + '&pageSize=' + vm.pagination.pageSize + '&status=0')
                    .then(function (response) {
                        console.info(response);
                        if (response.error == '0' && response.data.length != 0) {
                            vm.orderEach = vm.orderEach.concat(response.data);

                            $scope.vm.allOrders = difOrders.diff(vm.orderEach); //全部订单
                            console.info($scope.vm.allOrders);
                            vm.pagination.pageNum += 1;
                        } else if (response.error == '0' && response.data.length == 0) {
                            vm.moredata = false;
                        } else {
                            $scope.error = response.info + '错误码:' + response.error;
                            $timeout(function () {
                                $scope.modalError.show();
                            }, 100);
                        }
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        alert('您的网络异常,未能成功获取兑换记录');
                        $ionicLoading.hide();
                    });
            }
        }

        var havenot = $scope.havenot = {
            moredata: true,
            orderEach: [],
            pagination: {
                pageSize: 8,
                pageNum: 1
            },
            loadMore: function () {
                getUser.getInfo(url + '/service/lottery/getList?token=' + token + '&pageNum=' + havenot.pagination.pageNum + '&pageSize=' + havenot.pagination.pageSize + '&status=2')
                    .then(function (response) {
                        console.log(response);
                        if (response.error == '0' && response.data.length != 0) {
                            havenot.orderEach = havenot.orderEach.concat(response.data);

                            $scope.havenot.allOrders = difOrders.diff(havenot.orderEach) //全部订单
                            console.log($scope.havenot.allOrders);
                            havenot.pagination.pageNum += 1;
                        } else if (response.error == '0' && response.data.length == 0) {
                            havenot.moredata = false;
                        } else {
                            $scope.error = response.info + '错误码:' + response.error;
                            $timeout(function () {
                                $scope.modalError.show();
                            }, 100);
                        }
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        alert('您的网络异常,未能成功获取兑换记录');
                        $ionicLoading.hide();
                    });
            }
        }

        var havewin = $scope.havewin = {
            moredata: true,
            orderEach: [],
            pagination: {
                pageSize: 8,
                pageNum: 1
            },
            loadMore: function () {
                getUser.getInfo(url + '/service/lottery/getList?token=' + token + '&pageNum=' + havewin.pagination.pageNum + '&pageSize=' + havewin.pagination.pageSize + '&status=4')
                    .then(function (response) {
                        console.log(response);
                        if (response.error === '0' && response.data.length !== 0) {
                            havewin.orderEach = havewin.orderEach.concat(response.data);

                            $scope.havewin.allOrders = difOrders.diff(havewin.orderEach); //全部订单
                            console.log($scope.havewin.allOrders);
                            havewin.pagination.pageNum += 1;
                        } else if (response.error === '0' && response.data.length === 0) {
                            havewin.moredata = false;
                        } else {
                            $scope.error = response.info + '错误码:' + response.error;
                            $timeout(function () {
                                $scope.modalError.show();
                            }, 100);
                        }
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        alert('您的网络异常,未能成功获取兑换记录');
                        $ionicLoading.hide();
                    });
            }
        };

        var havefail = $scope.havefail = {
            moredata: true,
            orderEach: [],
            pagination: {
                pageSize: 8,
                pageNum: 1
            },
            loadMore: function () {
                getUser.getInfo(url + '/service/lottery/getList?token=' + token + '&pageNum=' + havefail.pagination.pageNum + '&pageSize=' + havefail.pagination.pageSize + '&status=3')
                    .then(function (response) {
                        // console.info(response);
                        if (response.error === '0' && response.data.length !== 0) {
                            havefail.orderEach = havefail.orderEach.concat(response.data);
                            $scope.havefail.allOrders = difOrders.diff(havefail.orderEach); //全部订单
                            console.info($scope.havefail.allOrders);
                            havefail.pagination.pageNum += 1;
                        } else if (response.error === '0' && response.data.length === 0) {
                            havefail.moredata = false;
                        } else {
                            $scope.error = response.info + '错误码:' + response.error;
                            $timeout(function () {
                                $scope.modalError.show();
                            }, 100);
                        }
                        $ionicLoading.hide();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        $scope.imgagesUrl = './img/completeInf.png';
                        $scope.successOrFaild = '您的网络异常,未能成功获取兑换记录， 错误码' + error;
                        $errorPopupFactory.errorInfo($scope, $state, 'allOrders');
                        $ionicLoading.hide();
                    });
            }
        };

        $scope.toOrderDetail = function (order) {
            var investCode = []; //保存点击的订单的号码
            var winMoney = 0;
            console.info('order', order);
            for (var i = 0; i < order.lotteryList.length; i++) {
                var OneCode = splitCode.split(order.lotteryList[i].investCode);
                investCode.push(OneCode);
                winMoney += order.lotteryList[i].winamt;
            }
            if (order.payType === 0) {
                payType = order.channelName;
            }
            else if (order.payType === 1) {
                payType = '¥' + order.money + '元';
            }
            else if (order.payType === 2) {
                payType = order.dcurrencyAmount + '龙币';
            }
            $rootScope.orderDetail = {
                betWay: order.lotteryList[0].betWay,
                planId: order.planId,
                lotteryList: order.lotteryList,
                lotteryID: order.lotteryID,
                openTime: order.drawTime, //
                status: order.status,
                investCode: investCode, //
                payType: payType,
                pay: order.money,
                ticketID: order.orderNo,
                orderTime: order.createDate,
                winMoney: winMoney,
                wareIssue: order.wareIssue
            };
            $state.go('orderDetail');
        };
        //错误码窗口配置
        $ionicModal.fromTemplateUrl('templates/mistakeBox/errorPop.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function (modal) {
            $scope.modalError = modal;
        });
        $scope.cancelPopError = function () {
            $scope.modalError.hide();
        };
    }]);
