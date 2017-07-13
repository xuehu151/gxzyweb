/**
 * Created by admin on 2017/6/15.
 */
angular.module ('starter.AccountCtrl', ['starter.services'])
//账户页面
    .controller ('AccountCtrl', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, locals, getUser, $ionicLoading, $util) {
        //验证是否资料完善
        //        $ionicLoading.show ();
        PayType = 1;
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        //更新余额
        getUser.getInfo (url + "/service/customer/getUser?token=" + token)
            .then (function (response) {
//                console.log (response.data);
                $scope.useableMoney = response.data.money;
                // $scope.phone = response.data.phone;
                $scope.frozedMoney = response.data.freeze;
                $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
                //提现时候的账户号码
                $rootScope.accountNum = [/*{
                    chanel: 1,
                    num: '(' + response.data.alipay + ')',
                    disable: false
                },*/
                {
                    chanel: 2,
                    num: '(' + response.data.wechat + ')'
                    // disable: false
                }, {
                    chanel: 3,
                    num: '(' + response.data.bankNo + ')'
                    // disable: false
                }];
                /*for (var i = 0; i < $rootScope.accountNum.length; i++) {
                    if ($rootScope.accountNum[i].num == "()") {
                        $rootScope.accountNum[i].disable = true;
                    }
                }*/
            }, function () {
                alert ('网络异常, 未能获取到您的余额')
            });
        //更新待兑换
        getUser.getInfo (url + "/service/customer/getVoucherList?token=" + token)
            .then (function (response) {
//                console.info(response);
                $scope.needExchangeAmount = response.data.length;
                console.log($scope.needExchangeAmount);
                
                if($scope.needExchangeAmount){
                    $rootScope.needExchangeItems = response.data;
                    $scope.modal2.show ();
                }
                
            }, function () {
                alert ('网络异常,未获取到用户信息')
            });
        
        //检测有无中奖
       /* getUser.getInfo (url + "/service/lottery/getWinList?token=" + token)
            .then (function (response) {
//                console.log (response);
                $scope.winItems = response.data;
                for (var i = 0; i < $scope.winItems.length; i++) {
                    $scope.winamt = $scope.winItems[i].winamt;
                    $scope.wareIssue = $scope.winItems[i].wareIssue;
                    $scope.drawTime = $scope.winItems[i].drawTime;
                    $scope.modal3.show ();
                }
            }, function () {
                alert ('网络异常,未获取到用户信息')
            });*/
        
        $scope.withdrawConfirm = function () {
            var userData = userInfo.data.user;
            if (userData.wechat || userData.alipay || userData.bankNo) {
                $scope.modal.show ();
            }
            else {
                $scope.modal4.show ();
                /*var confirmPopup = $ionicPopup.confirm ({
                    title: '完善资料',
                    template: '<p style="text-align:center;"><img src="./img/completeInf.png"></p>' + '当前个人资料尚未完善，无法提现；完善个人资料后即可立即提现！',
                    // templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                    cancelText: '暂不完善', // String (默认: 'Cancel')。一个取消按钮的文字。
                    cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
                    okText: '立即完善', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-positive' // String (默认: 'button-positive')。OK按钮的类型。
                }).then (function (res) {
                    if (res) {
                        $state.go ('completeInfo')
                    }
                    else {
                    }
                });*/
            }
        };
        /*//点击暂不完善,隐藏提示界面
         $scope.notCompleteInfo=function () {
         $scope.confirmInfoComplete=false;
         }*/
        //点击完善资料,转到完善资料页面
        /* $scope.toCompleteInfo=function () {
         $state.go('completeInfo')
         };*/
        //冻结金额的解释
        $scope.toggleShowAnswer = function () {
            $scope.showAnswer = !$scope.showAnswer;
        };
        $scope.showAnswer = false;
        //未兑换
        $scope.haventExchange = true;
        $scope.toNeedExchange = function () {
            PayType = 1;
            $state.go ('needExchange')
        };
        //转到奖金纪录页面
        $scope.toPrizeRecords = function () {
            $state.go ('prizeRecords')
        };
        //转到全部订单页面
        $scope.toAllOrders = function () {
            $state.go ('allOrders')
        };
        //转到提现明细页面
        $scope.toWidthdrawRecords = function () {
            $state.go ('widthdrawRecords')
        };
        //提现框的mordal窗口配置
        $ionicModal.fromTemplateUrl ('accountModal.html', {
            scope: $scope,
            backdropClickToClose:true
        }).then (function (modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function () {
            $scope.modal.show ();
        };
        $scope.closeModal = function () {
            $scope.modal.hide ();
        };
        //转到提现页面
        $scope.toWidthdraw = function (channel) {
            $rootScope.channel = channel;
            $scope.modal.hide ();
            $state.go ('widthdraw')
        };
        //老用户获得彩票的mordal窗口配置
        $ionicModal.fromTemplateUrl ('accountModalOldUser.html', {
            scope: $scope,
            backdropClickToClose:true
        }).then (function (modal) {
            $scope.modal2 = modal;
        });
        $scope.openPop2 = function () {
            $scope.modal2.show ();
        };
        $scope.cancelPop2 = function () {
            $scope.modal2.hide ();
        };
        $scope.goToExchange = function () {
            $state.go ('scanCodeIndex');
            $scope.modal2.hide ();
        };
        //中奖mordal窗口配置
        $ionicModal.fromTemplateUrl ('accountModalGetPrize.html', {
            scope: $scope,
            backdropClickToClose:true
        }).then (function (modal) {
            $scope.modal3 = modal;
        });
        $scope.openPop3 = function () {
            $scope.modal3.show ();
        };
        $scope.cancelPop3 = function () {
            $scope.modal3.hide ();
        };

        //提现完善资料的mordal窗口配置
        $ionicModal.fromTemplateUrl ('widthdrawCompleteInfo.html', {
            scope: $scope,
            backdropClickToClose:true
        }).then (function (modal) {
            $scope.modal4 = modal;
        });
       /* $scope.openPop4 = function () {
            $scope.modal4.show ();
        };*/
        $scope.cancelPop4 = function () {
            $scope.modal4.hide ();
        };
        $scope.toCompeleteInfo = function () {
            $state.go ('completeInfo');
            $scope.modal4.hide ();
        };
    });
