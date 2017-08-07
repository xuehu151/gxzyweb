/**
 * Created by admin on 2017/6/15.
 */
angular.module('starter.AccountCtrl', ['starter.services'])
    //账户页面
    .controller('AccountCtrl', function($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, locals, getUser, $ionicLoading, $util, splitCode, $timeout) {
        //验证是否资料完善
        //        $ionicLoading.show ();
        PayType = 1;
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;
        //更新余额
        getUser.getInfo(url + "/service/customer/getUser?token=" + token)
            .then(function(response) {
                console.log(response.data);
                $scope.useableMoney = response.data.money;
                // $scope.phone = response.data.phone;
                $scope.frozedMoney = response.data.freeze;
                $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
                //提现时候的账户号码
                $rootScope.accountNum = [{
                    chanel: 2,
                    num: '(' + response.data.wechat + ')'
                    // disable: false
                }, {
                    chanel: 3,
                    num: '(' + response.data.bankNo + ')'
                    // disable: false
                }];
            }, function() {
                alert('网络异常, 未能获取到您的余额')
            });
        var winItems = [];
        var winAlertStatus = { first: false, second: false, third: false, forth: false } //最多四次弹窗
        var haveShowAllWin = false;
        var nextShow = null; //定时器

        $scope.needExchangeAmount = { amount: 0 };
        //检测有无中奖
        getUser.getInfo(url + "/service/lottery/getWinList?token=" + token)
            .then(function(response) {
                console.log(response);
                winItems = response.data;

                if (winItems[0]) {
                    $scope.winamt = winItems[0].winamt;
                    $scope.wareIssue = winItems[0].wareIssue;
                    $scope.drawTime = winItems[0].drawTime;
                    $scope.investCode = splitCode.split(winItems[0].investCode);
                    console.log($scope.investCode);
                    winAlertStatus.first = true;
                    $scope.modal3.show();
                } else if (!winItems[0]) {
                    $timeout.cancel(nextShow);

                    //更新待兑换
                    getUser.getInfo(url + "/service/customer/getVoucherList?token=" + token)
                        .then(function(response) {
                            $scope.needExchangeAmount.amount = response.data.length;
                            console.log($scope.needExchangeAmount.amount);


                                $rootScope.needExchangeItems = response.data;
                                // $scope.modal2.show();

                        }, function() {
                            alert('网络异常,未获取到用户信息')
                        });
                }
            }, function() {
                alert('网络异常,未获取到用户信息')
            });
        $scope.withdrawConfirm = function() {
            var userData = userInfo.data.user;
            if (userData.wechat || userData.alipay || userData.bankNo) {
                $scope.modal.show();
            } else {
                $scope.modal4.show();
            }
        };
        //冻结金额的解释
        $scope.toggleShowAnswer = function() {
            $scope.showAnswer = !$scope.showAnswer;
        };
        $scope.showAnswer = false;
        //未兑换
        $scope.haventExchange = true;
        $scope.toNeedExchange = function() {
            PayType = 1;
            $state.go('needExchange')
        };
        //转到奖金纪录页面
        $scope.toPrizeRecords = function() {
            $state.go('prizeRecords')
        };
        //转到全部订单页面
        $scope.toAllOrders = function() {
            $state.go('allOrders')
        };
        //转到提现明细页面
        $scope.toWidthdrawRecords = function() {
            $state.go('widthdrawRecords')
        };
        //提现框的mordal窗口配置
        $ionicModal.fromTemplateUrl('accountModal.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //转到提现页面
        $scope.toWidthdraw = function(channel) {
            $rootScope.channel = channel;
            $scope.modal.hide();
            $state.go('widthdraw')
        };
        //老用户获得彩票的mordal窗口配置
        $ionicModal.fromTemplateUrl('templates/getOneBetModal.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal2 = modal;
        });
        $scope.openPop2 = function() {
            $scope.modal2.show();
        };
        $scope.cancelPop2 = function() {
            $scope.modal2.hide();
        };
        $scope.goToExchange = function() {
            $state.go('scanCodeIndex');
            $scope.modal2.hide();
        };
        //中奖mordal窗口配置
        $ionicModal.fromTemplateUrl('accountModalGetPrize.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal3 = modal;
        });
        $scope.openPop3 = function() {
            $scope.modal3.show();
        };
        $scope.cancelPop3 = function() {
            $scope.modal3.hide();
            nextShow = $timeout(function() {
                if (winAlertStatus.first == true && winAlertStatus.second == false && winAlertStatus.third == false && winAlertStatus.forth == false && winItems[1]) {
                    $scope.winamt = winItems[1].winamt;
                    $scope.wareIssue = winItems[1].wareIssue;
                    $scope.drawTime = winItems[1].drawTime;
                    $scope.investCode = splitCode.split(winItems[1].investCode);
                    winAlertStatus.second = true;
                    console.log($scope.investCode);
                    // $scope.modal3.show ();
                    if (winItems[1]) {
                        $scope.modal3.show();
                    } else if (!winItems[1]) {
                        $timeout.cancel(nextShow);

                        //更新待兑换
                        getUser.getInfo(url + "/service/customer/getVoucherList?token=" + token)
                            .then(function(response) {
                                $scope.needExchangeAmount.amount = response.data.length;
                                console.log($scope.needExchangeAmount.amount);

                                if ($scope.needExchangeAmount.amount) {
                                    $rootScope.needExchangeItems = response.data;
                                    $scope.modal2.show();
                                }

                            }, function() {
                                alert('网络异常,未获取到用户信息')
                            });

                    }
                } else if (winAlertStatus.first == true && winAlertStatus.second == true && winAlertStatus.third == false && winAlertStatus.forth == false && winItems[2]) {
                    $scope.winamt = winItems[2].winamt;
                    $scope.wareIssue = winItems[2].wareIssue;
                    $scope.drawTime = winItems[2].drawTime;
                    $scope.investCode = splitCode.split(winItems[2].investCode);
                    winAlertStatus.third = true;
                    console.log($scope.investCode);
                    if (winItems[2]) {
                        $scope.modal3.show();
                    } else if (!winItems[2]) {
                        $timeout.cancel(nextShow);

                        //更新待兑换
                        getUser.getInfo(url + "/service/customer/getVoucherList?token=" + token)
                            .then(function(response) {
                                $scope.needExchangeAmount.amount = response.data.length;
                                console.log($scope.needExchangeAmount.amount);

                                if ($scope.needExchangeAmount.amount) {
                                    $rootScope.needExchangeItems = response.data;
                                    $scope.modal2.show();
                                }

                            }, function() {
                                alert('网络异常,未获取到用户信息')
                            });


                    }
                } else if (winAlertStatus.first == true && winAlertStatus.second == true && winAlertStatus.third == true && winAlertStatus.forth == false && winItems[3]) {
                    $scope.winamt = winItems[3].winamt;
                    $scope.wareIssue = winItems[3].wareIssue;
                    $scope.drawTime = winItems[3].drawTime;
                    $scope.investCode = splitCode.split(winItems[3].investCode);
                    winAlertStatus.forth = true;
                    if (winItems[3]) {
                        $scope.modal3.show();
                    } else if (!winItems[3]) {
                        $timeout.cancel(nextShow);

                        //更新待兑换
                        getUser.getInfo(url + "/service/customer/getVoucherList?token=" + token)
                            .then(function(response) {
                                $scope.needExchangeAmount.amount = response.data.length;
                                console.log($scope.needExchangeAmount.amount);

                                if ($scope.needExchangeAmount.amount) {
                                    $rootScope.needExchangeItems = response.data;
                                    $scope.modal2.show();
                                }

                            }, function() {
                                alert('网络异常,未获取到用户信息')
                            });

                    }
                    console.log($scope.investCode);

                }

            }, 1000)

        };

        //提现完善资料的mordal窗口配置
        $ionicModal.fromTemplateUrl('widthdrawCompleteInfo.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal4 = modal;
        });
        /* $scope.openPop4 = function () {
             $scope.modal4.show ();
         };*/
        $scope.cancelPop4 = function() {
            $scope.modal4.hide();
        };
        $scope.toCompeleteInfo = function() {
            $state.go('completeInfo');
            $scope.modal4.hide();
        };

/*
        $scope.chooseExchangeType = function() {
            $scope.modal5.show();
        }

        //选择兑换方式的mordal窗口配置
        $ionicModal.fromTemplateUrl('chooseExchangeTypeModal.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modal5 = modal;
        });
         $scope.openPop5 = function () {
             $scope.modal5.show ();
         };
        $scope.cancelPop5 = function() {
            $scope.modal5.hide();
        };
        $scope.toExchangeWithBalance = function() {
            $scope.modal5.hide();
            $state.go('tab.exchange');
        };*/

    });
