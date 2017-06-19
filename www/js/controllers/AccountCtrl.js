/**
 * Created by admin on 2017/6/15.
 */
angular.module ('starter.AccountCtrl', ['starter.services'])

//账户页面
    .controller ('AccountCtrl', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, $util, locals, getUser, $ionicLoading) {
        //验证是否资料完善
        //$ionicLoading.show ();
        PayType = 1;
        var userInfo = $util.getUserInfo ();
        
        $scope.useableMoney = userInfo.data.user.money;
        $scope.phone = userInfo.data.user.phone;
        $scope.frozedMoney = userInfo.data.user.freeze;
        $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
        //提现时候的账户号码
        $rootScope.accountNum = [
            {
                chanel: 1,
                num: '(' + userInfo.data.user.alipay + ')',
                disable: false
            },
            {
                chanel: 2,
                num: '(' + userInfo.data.user.wechat + ')',
                disable: false
            },
            {
                chanel: 3,
                num: '(' + userInfo.data.user.bankNo + ')',
                disable: false
            }
        ];
        for (var i = 0; i < $rootScope.accountNum.length; i++) {
            if ($rootScope.accountNum[i].num == "()") {
                $rootScope.accountNum[i].disable = true;
            }
        }
        /*var token = userInfo.token;
         getUser.getInfo (url + "/service/customer/getVoucherList?token=" + token).then (function (response) {
         // alert(22)
         console.log (response)
         
         }, function () {
         alert ('网络异常,未获取到用户信息')
         });*/
        
        $scope.withdrawConfirm = function () {
            if (userInfo.data.user.wechat || userInfo.data.user.alipay || userInfo.data.user.bankNo) {
                $scope.modal.show ();
            }
            else {
                var confirmPopup = $ionicPopup.confirm ({
                    title: '完善资料',
                    template: '<p style="text-align:center;"><img src="./img/completeInf.png"></p>' + '当前个人资料尚未完善，无法提现；完善个人资料后即可立即提现！',
                    // templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                    cancelText: '暂不完善', // String (默认: 'Cancel')。一个取消按钮的文字。
                    cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
                    okText: '立即完善', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-positive' // String (默认: 'button-positive')。OK按钮的类型。
                })
                    .then (function (res) {
                        if (res) {
                            $state.go ('completeInfo')
                        }
                        else {
                        }
                    });
            }
        };
        /*//点击暂不完善,隐藏提示界面
         $scope.notCompleteInfo=function () {
         $scope.confirmInfoComplete=false;
         }*/
        //冻结金额的解释
        $scope.toggleShowAnswer = function () {
            $scope.showAnswer = !$scope.showAnswer;
        };
        $scope.showAnswer = false;
        
        //未兑换
        $scope.haventExchange = true;
        $scope.toNeedExchange = function () {
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
            scope: $scope
            // backdropClickToClose:true    没效果???
        })
            .then (function (modal) {
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
            scope: $scope
            // backdropClickToClose:true    没效果???
        })
            .then (function (modal) {
                $scope.modal2 = modal;
            });
        $scope.openPop = function () {
            $scope.modal2.show ();
        };
        $scope.cancelPop = function () {
            $scope.modal2.hide ();
        };
        $scope.goToExchange = function () {
            $scope.modal2.hide ();
            $state.go ('tab.exchange');
        }
    });
