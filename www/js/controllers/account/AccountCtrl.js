/**
 * Created by admin on 2017/6/15.
 */
//var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名


angular.module('starter.AccountCtrl', ['starter.services'])
    //账户页面
    .controller('AccountCtrl', function($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, locals, getUser, $ionicLoading, $util, splitCode, $timeout, $location) {

        /*   var firstTab = document.querySelector(".tab-item");
           firstTab.style.display = 'none';*/

        $scope.needExchangeAmount = { amount: 0 }; //待兑换数量

        PayType = 1;
        var userInfo = $util.getUserInfo();
        console.info('userInfo',userInfo);
        //验证是否资料完善
        if (!userInfo.data) {
            $scope.useableMoney = 0;
            $scope.frozedMoney = 0;
            $scope.totalMoney = 0;
            $scope.error = userInfo.info;
            $scope.needExchangeAmount = { amount: 0 };
            $timeout(function() {
                $scope.modalError.show();
            }, 400);
        } else {
            $ionicLoading.show();
            var token = userInfo.data.token;
            /**
             * [中奖相关参数]
             * @type {Array}
             */
            var winItems = [];
            var winAlertStatus = { first: false, second: false, third: false, forth: false }; //最多四次弹窗
            var haveShowAllWin = false;
            var nextShow = null; //定时器
            //检测有无中奖
            var totalWinamt = { first: 0, second: 0, third: 0, forth: 0 };
            var bettingEach = { first: [], second: [], third: [], forth: [] }; //每次弹框获得的奖金

            /**
             * [兑换失败相关参数]
             * @type {Array}
             */
            var winFailItems = [];
            var winFailAlertStatus = { first: false, second: false, third: false, forth: false }; //最多四次弹窗
            var haveShowAllFail = false;
            var nextFailShow = null; //定时器
            //检测有无兑换失败
            var bettingEachFailed = { first: [], second: [], third: [], forth: [] }; //每次弹框获得的奖金

            //更新余额
            getUser.getInfo(url + "/service/customer/getUser?token=" + token)
                .then(function(response) {
                    console.info(response.data);
                    if (response.error == '0') {
                        $scope.useableMoney = response.data.money;
                        // $scope.phone = response.data.phone;
                        $scope.frozedMoney = response.data.freeze;
                        $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
                        //提现时候的账户号码
                        //把2-6位改为'****'
                        if (response.data.bankNo) {
                            // var newWechat = response.data.wechat.split('');
                            var newBankNo = response.data.bankNo.split('');
                            // newWechat.splice(4,4,'****');
                            newBankNo.splice(4, 4, '****');
                            $rootScope.accountNum = [
                                /*{
                                    chanel: 2,
                                    num: '(' + newWechat.join('') + ')'
                                    // disable: false
                                },*/
                                {
                                    chanel: 2,
                                    num: ''
                                    // disable: false
                                },
                                {
                                    chanel: 3,
                                    num: '(' + newBankNo.join('') + ')'
                                    // disable: false
                                }
                            ];
                        }

                        //中奖弹框
                        getUser.getInfo(url + "/service/lottery/getWinList?token=" + token + '&pageNum=1&pageSize=8')
                            .then(function(response) {
                                console.log(response);
                                if (response.error == '0') {
                                    winItems = response.data;

                                    if (winItems[0]) {

                                        for (var i = 0; i < winItems[0].lotteryList.length; i++) {
                                            totalWinamt.first += winItems[0].lotteryList[i].winamt;
                                            winItems[0].lotteryList[i].code = splitCode.split(winItems[0].lotteryList[i].investCode)
                                        }
                                        $scope.thisWinItems = winItems[0].lotteryList;
                                        $scope.winamt = totalWinamt.first;
                                        $scope.wareIssue = winItems[0].wareIssue;
                                        $scope.drawTime = winItems[0].drawTime;
                                        // console.log($scope.thisWinItems);
                                        winAlertStatus.first = true;

                                        getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID=' + winItems[0].lotteryID + '&wareIssue=' + (winItems[0].wareIssue * 1))
                                            // getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID='+winItems[0].lotteryID + '&wareIssue=2017094')
                                            .then(function(response) {
                                                // console.log(response);
                                                if (response.error == '0') {
                                                    $scope.result = splitCode.split(response.data.result);
                                                    // console.log($scope.result);
                                                    $scope.modal3.show();
                                                } else {
                                                    $scope.error = response.info + '错误码:' + response.error;
                                                    $timeout(function() {
                                                        $scope.modalError.show();
                                                    }, 400);
                                                }
                                            }, function(error) {
                                                alert('您的网络异常,未能成功获取开奖号码');
                                                $ionicLoading.hide();
                                            });
                                    } else if (!winItems[0]) {
                                        $timeout.cancel(nextShow);
                                    }
                                } else {
                                    $scope.error = response.info + '错误码:' + response.error;
                                    $timeout(function() {
                                        $scope.modalError.show();
                                    }, 400);
                                }
                                $ionicLoading.hide();
                            }, function(error) {
                                alert('您的网络异常,未能成功获取您的中奖信息');
                                $ionicLoading.hide();
                            });

                        //检测出票失败
                        getUser.getInfo(url + "/service/lottery/getPrintFailList?token=" + token + '&pageNum=1&pageSize=100')
                            .then(function(response) {
                                console.log(response);
                                if (response.error == '0') {
                                    winFailItems = response.data;
                                    if (winFailItems[0]) {
                                        for (var j = 0; j < winFailItems[0].lotteryList.length; j++) {
                                            winFailItems[0].lotteryList[j].code = splitCode.split(winFailItems[0].lotteryList[j].investCode)
                                        }
                                        console.log(winFailItems[0].lotteryList);
                                        $scope.thisWinFailItems = winFailItems[0].lotteryList;
                                        $scope.wareIssueFailed = winFailItems[0].wareIssue;
                                        $scope.failedDate = winFailItems[0].createDate;
                                        winFailAlertStatus.first = true;
                                        $scope.modalPrintFailed.show();
                                    } else if (!winFailItems[0]) {
                                        $timeout.cancel(nextFailShow);
                                    }
                                } else {
                                    $scope.error = response.info + '错误码:' + response.error;
                                    $timeout(function() {
                                        $scope.modalError.show();
                                    }, 300);
                                }
                                $ionicLoading.hide();
                            }, function(error) {
                                alert('您的网络异常,未能成功获取到是否有出票失败');
                                $ionicLoading.hide();
                            });

                        //更新待兑换
                        getUser.getInfo(url + "/service/customer/getVoucherList?token=" + token + '&pageNum=1&pageSize=100')
                            .then(function(response) {
                                console.log(response);
                                if (response.error == '0') {
                                    $scope.needExchangeAmount.amount = response.data.length;
                                    console.log($scope.needExchangeAmount.amount);
                                    $rootScope.needExchangeItems = response.data;
                                    // $scope.modal2.show();
                                } else {
                                    $scope.error = response.info + '错误码:' + response.error;
                                    $timeout(function() {
                                        $scope.modalError.show();
                                    }, 300);
                                }
                                $ionicLoading.hide();
                            }, function(error) {
                                alert('您的网络异常,未能成功获取待兑换数量');
                                $ionicLoading.hide();
                            });
                    } else {
                        $ionicLoading.hide();
                        $scope.error = response.info + '错误码:' + response.error;
                        $timeout(function() {
                            $scope.modalError.show();
                        }, 400);
                    }
                }, function(error) {
                    alert('您的网络异常,未能成功获取您的账户信息,请重新进入');
                    $ionicLoading.hide();
                });

            $scope.withdrawConfirm = function() {
                var userData = userInfo.data.user;
                if (userData.wechat || userData.alipay || userData.bankNo) {
                    $scope.modal.show();
                    // $scope.modalPrintFailed.show();
                } else {
                    $scope.modal4.show();
                }
            };

            $scope.toSelfInfo = function() {
                if (userInfo.data.user.bankNo) {
                    $state.go('selfInfo')
                } else {
                    $state.go('completeInfo')
                }
            }

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
            $ionicModal.fromTemplateUrl('templates/mistakeBox/getOneBetModal.html', {
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
                        for (var i = 0; i < winItems[1].lotteryList.length; i++) {
                            totalWinamt.second += winItems[1].lotteryList[i].winamt;
                            winItems[1].lotteryList[i].code = splitCode.split(winItems[1].lotteryList[i].investCode)
                        }
                        $scope.thisWinItems = winItems[1].lotteryList;
                        $scope.winamt = totalWinamt.second;
                        $scope.wareIssue = winItems[1].wareIssue;
                        $scope.drawTime = winItems[1].drawTime;
                        winAlertStatus.second = true;

                        getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID=' + winItems[1].lotteryID + '&wareIssue=' + (winItems[1].wareIssue * 1))
                            // getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID='+winItems[0].lotteryID + '&wareIssue=2017219')
                            .then(function(response) {
                                console.log(response);
                                if (response.error == '0') {
                                    $scope.result = splitCode.split(response.data.result);
                                    console.log($scope.result);
                                } else {
                                    $scope.error = response.info + '错误码:' + response.error;
                                    $timeout(function() {
                                        $scope.modalError.show();
                                    }, 400);
                                }
                            }, function(error) {
                                alert('您的网络异常,未能成功获取您的中奖信息');
                                $ionicLoading.hide();
                            });
                        $scope.modal3.show();
                    } else if (winAlertStatus.first == true && winAlertStatus.second == true && winAlertStatus.third == false && winAlertStatus.forth == false && winItems[2]) {
                        for (var i = 0; i < winItems[2].lotteryList.length; i++) {
                            totalWinamt.second += winItems[2].lotteryList[i].winamt;
                            winItems[2].lotteryList[i].code = splitCode.split(winItems[2].lotteryList[i].investCode)
                        }
                        $scope.thisWinItems = winItems[2].lotteryList;
                        $scope.winamt = totalWinamt.third;
                        $scope.wareIssue = winItems[2].wareIssue;
                        $scope.drawTime = winItems[2].drawTime;
                        winAlertStatus.third = true;

                        getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID=' + winItems[2].lotteryID + '&wareIssue=' + (winItems[2].wareIssue * 1))
                            // getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID='+winItems[0].lotteryID + '&wareIssue=2017219')
                            .then(function(response) {
                                console.log(response);
                                if (response.error == '0') {
                                    $scope.result = splitCode.split(response.data.result);
                                    console.log($scope.result);
                                } else {
                                    $scope.error = response.info + '错误码:' + response.error;
                                    $timeout(function() {
                                        $scope.modalError.show();
                                    }, 400);
                                }
                            }, function(error) {
                                alert('您的网络异常,未能成功获取您的中奖信息');
                                $ionicLoading.hide();
                            });
                        $scope.modal3.show();
                    } else if (winAlertStatus.first == true && winAlertStatus.second == true && winAlertStatus.third == true && winAlertStatus.forth == false && winItems[3]) {
                        for (var i = 0; i < winItems[3].lotteryList.length; i++) {
                            totalWinamt.second += winItems[3].lotteryList[i].winamt;
                            winItems[3].lotteryList[i].code = splitCode.split(winItems[3].lotteryList[i].investCode)
                        }
                        $scope.thisWinItems = winItems[3].lotteryList;
                        $scope.winamt = totalWinamt.forth;
                        $scope.wareIssue = winItems[3].wareIssue;
                        $scope.drawTime = winItems[3].drawTime;
                        winAlertStatus.forth = true;

                        getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID=' + winItems[3].lotteryID + '&wareIssue=' + (winItems[3].wareIssue * 1))
                            // getUser.getInfo(url + "/service/lottery/getHistory?token=" + token + '&lotteryID='+winItems[0].lotteryID + '&wareIssue=2017219')
                            .then(function(response) {
                                console.log(response);
                                if (response.error == '0') {
                                    $scope.result = splitCode.split(response.data.result);
                                    console.log($scope.result);
                                } else {
                                    $scope.error = response.info + '错误码:' + response.error;
                                    $timeout(function() {
                                        $scope.modalError.show();
                                    }, 400);
                                }
                            }, function(error) {
                                alert('您的网络异常,未能成功获取您的中奖信息');
                                $ionicLoading.hide();
                            });
                        $scope.modal3.show();
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
            $scope.cancelPop4 = function() {
                $scope.modal4.hide();
            };
            $scope.toCompeleteInfo = function() {
                $state.go('completeInfo');
                $scope.modal4.hide();
            };

            //出票失败窗口配置
            $ionicModal.fromTemplateUrl('accountModalFailed.html', {
                scope: $scope,
                backdropClickToClose: true
            }).then(function(modal) {
                $scope.modalPrintFailed = modal;
            });
            $scope.cancelPrintFailed = function() {
                $scope.modalPrintFailed.hide();
                nextFailShow = $timeout(function() {
                    if (winFailAlertStatus.first == true && winFailAlertStatus.second == false && winFailAlertStatus.third == false && winFailAlertStatus.forth == false && winFailItems[1]) {
                        for (var j = 0; j < winFailItems[1].lotteryList.length; j++) {
                            winFailItems[1].lotteryList[j].code = splitCode.split(winFailItems[1].lotteryList[j].investCode)
                        }
                        console.log(winFailItems[1].lotteryList);
                        $scope.thisWinFailItems = winFailItems[1].lotteryList;
                        $scope.wareIssueFailed = winFailItems[1].wareIssue;
                        $scope.failedDate = winFailItems[1].createDate;
                        winFailAlertStatus.second = true;
                        $scope.modalPrintFailed.show();

                    } else if (winFailAlertStatus.first == true && winFailAlertStatus.second == true && winFailAlertStatus.third == false && winFailAlertStatus.forth == false && winFailItems[2]) {
                        for (var j = 0; j < winFailItems[2].lotteryList.length; j++) {
                            winFailItems[2].lotteryList[j].code = splitCode.split(winFailItems[2].lotteryList[j].investCode)
                        }
                        console.log(winFailItems[2].lotteryList);
                        $scope.thisWinFailItems = winFailItems[2].lotteryList;
                        $scope.wareIssueFailed = winFailItems[2].wareIssue;
                        $scope.failedDate = winFailItems[2].createDate;
                        winFailAlertStatus.third = true;
                        $scope.modalPrintFailed.show();

                    } else if (winFailAlertStatus.first == true && winFailAlertStatus.second == true && winFailAlertStatus.third == true && winFailAlertStatus.forth == false && winFailItems[3]) {
                        for (var j = 0; j < winFailItems[3].lotteryList.length; j++) {
                            winFailItems[3].lotteryList[j].code = splitCode.split(winFailItems[3].lotteryList[j].investCode)
                        }
                        console.log(winFailItems[3].lotteryList);
                        $scope.thisWinFailItems = winFailItems[3].lotteryList;
                        $scope.wareIssueFailed = winFailItems[3].wareIssue;
                        $scope.failedDate = winFailItems[3].createDate;
                        winFailAlertStatus.forth = true;
                        $scope.modalPrintFailed.show();
                    }
                }, 1000)
            };
        }

        $scope.wantToWin = function () {
            var winUrl = 'wcapi.baibaocp.com/singlered/index';
            window.location.href = winUrl;


        };

        //错误码窗口配置
        $ionicModal.fromTemplateUrl('templates/mistakeBox/errorPop.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modalError = modal;
        });
        $scope.cancelPopError = function() {
            $scope.modalError.hide();
        };
    });
