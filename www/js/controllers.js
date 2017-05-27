var url = "http://121.42.253.149:18820";
angular.module('starter.controllers', []).controller('ExchangeCtrl', function($scope) {})
    //账户页面
    .controller('AccountCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$ionicModal', '$http', 'locals', 'getUser', function($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, locals, getUser) {
        //验证是否资料完善
        var token = "28fa9fa2c554268d4c0721b05c29908064bcec105a4b6865cec9b08a6fbbf3c7ed1104b0e43019e4ae600575d40d5f4ddbc74be3dac61013a8f1518dac006025ebe832a13856b86f2928a0f28806b063dcc0f184dfee91bb776f13bde6186715efb684a69f4e965d0c135449efac7841c7185c443118de0511e1be4e550dd09555449ed0";
        getUser.getInfo(url + "/service/common/index?token=" + token).then(function(response) {
            var userInfo = response.data;
            console.log(userInfo)
            // $rootScope.user={}  //保存token和用户信息
            locals.setObject($rootScope.user, userInfo)
            $scope.useableMoney = locals.getObject($rootScope.user).user.money;
            $scope.frozedMoney = locals.getObject($rootScope.user).user.freeze;
            $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
            //提现时候的账户号码
            $rootScope.accountNum = [{
                chanel: 1,
                num: '(' + userInfo.user.alipay + ')'
            }, {
                chanel: 2,
                num: '(' + userInfo.user.wechat + ')'
            }, {
                chanel: 3,
                num: '(' + userInfo.user.bankNo + ')'
            }];
        }, function() {
            alert('网络异常,未获取到用户信息')
        })
        $scope.withdrawConfirm = function() {
            if (locals.getObject($scope.user).user.realName) {
                $scope.modal.show();
            } else {
                var confirmPopup = $ionicPopup.confirm({
                    title: '完善资料',
                    template: '<p style="text-align:center;"><img src="./img/completeInf.png"></p>' + '当前个人资料尚未完善，无法提现；完善个人资料后即可立即提现！',
                    // templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                    cancelText: '暂不完善', // String (默认: 'Cancel')。一个取消按钮的文字。
                    cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
                    okText: '立即完善', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $state.go('completeInfo')
                    } else {}
                });
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
        $scope.toggleShowAnswer = function() {
            $scope.showAnswer = !$scope.showAnswer;
        };
        $scope.showAnswer = false;
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
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.toWidthdraw = function(channel) {
            $rootScope.channel = channel;
            $scope.modal.hide();
            $state.go('widthdraw')
        }
    }])
    //完善个人资料
    .controller('completeInfoCtrl', ['$scope', '$rootScope', '$state', 'locals', 'postData', function($scope, $rootScope, $state, locals, postData) {
        $scope.users = {
            realName: '',
            phone: '',
            idcard: '',
            wechat: '',
            alipay: '',
            bankNo: '',
        };
        /**
         * 功能:把提交的值保存到localstorage
         *     1.先用对象$rootScope.addData存储localstorage
         *     2.再把ng-model值赋进来
         *     3.再把这个对象赋给localstorage
         */
        $rootScope.addData = locals.getObject($rootScope.user)
        $scope.submitInfo = function() {
            $rootScope.addData.user.realName = $scope.users.realName;
            $rootScope.addData.user.phone = $scope.users.phone;
            $rootScope.addData.user.idcard = $scope.users.idcard;
            $rootScope.addData.user.wechat = $scope.users.wechat;
            $rootScope.addData.user.alipay = $scope.users.alipay;
            $rootScope.addData.user.bankNo = $scope.users.bankNo;
            locals.setObject($rootScope.user, $rootScope.addData)
            /**
             * 功能:把提交的值上传到后台
             */
            postData.getInfo(url + "/service/customer/add", $rootScope.addData).then(function(data) {
                $state.go('completeInfoSucceed');
            }, function() {
                alert('网络异常,未能更新您的资料')
            })
        }
    }])
    //完善个人资料成功
    .controller('completeInfoSucceedCtrl', ['$scope', '$state', function($scope, $state) {
        $scope.toAccount = function() {
            $state.go('tab.account')
        }
    }])
    //提现页面
    .controller('widthdrawCtrl', ['$scope', '$state', '$rootScope', 'getUser', 'locals', 'postData', function($scope, $state, $rootScope, getUser, locals, postData) {
        var widthdrawLocals = locals.getObject($rootScope.user);
        var token = widthdrawLocals.token;
        getUser.getInfo(url + "/service/customer/getUser?token=" + token).then(function(response) {
            $scope.widthdrawAble = response.data.money; //可用余额
        }, function() {
            alert('网络异常,未能获取到您的可用余额');
        });
        $scope.widthdrawMoney = ''; //提现金额
        $scope.whetherShow = true; //控制提现提交按钮disable
        $scope.whetherOK = function(widthdrawMoney) {
            if (widthdrawMoney > $scope.widthdrawAble) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow = false;
            } else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow = true;
            }
            $scope.widthdrawMoney = widthdrawMoney;
        }
        //提现所有可用余额
        $scope.widthdrawAll = function() {
            $scope.widthdrawMoney = $scope.widthdrawAble;
        };
        $scope.confirmWidthdraw = function(widthdrawMoney) {
            /*//小于10元扣除1元手续费
            if ($scope.widthdrawMoney<=10 && $scope.widthdrawMoney>1) 
            {
                widthdrawLocals.money--;
                console.log(widthdrawLocals)
            };*/
            var token = locals.getObject($rootScope.user).token;
            console.log(token);
            console.log($scope.widthdrawMoney);
            getUser.getInfo(url + '/service/cash/add' + '?channel=' + $rootScope.channel + '&money=' + $scope.widthdrawMoney + '&token=' + token).then(function(data) {
                $rootScope.WidthdrawStatus = data.error //保存返回的状态,用于决定widthdrawResult的页面
                $state.go('widthdrawResult')
            }, function() {
                alert('网络异常,未能提交提现')
            })
        };
    }])
    //提现结果页面
    .controller('widthdrawResultCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.whetherWidthdrawSuc = $rootScope.WidthdrawStatus == 0 ? true : false; //决定展示的图片
        $scope.widthdrawInfo = {
            success: '提现成功',
            successInfo: '资金预计2小时内到账',
            fail: '申请审核未成功',
            failInfo: '别担心，说不定再试一次就成功了',
        };
    }])
    //奖金纪录页面
    .controller('prizeRecordsCtrl', ['$scope', '$rootScope', 'getUser', 'locals', function($scope, $rootScope, getUser, locals) {
        var token = locals.getObject($rootScope.user).token;
        getUser.getInfo(url + '/service/bonus/getList?token=' + token).then(function(response) {
            $scope.prizeItems = response.data;
            for (var i = 0; i < $scope.prizeItems.length; i++) {
                if ($scope.prizeItems[i].type == 1) {
                    $scope.prizeItems[i].exchangeType = '收入';
                    $scope.prizeItems[i].isIncome = true;
                    $scope.prizeItems[i].exchangeClass = '彩票奖金';
                } else if ($scope.prizeItems[i].type == 2) {
                    $scope.prizeItems[i].exchangeType = '支出';
                    $scope.prizeItems[i].isIncome = false;
                    $scope.prizeItems[i].exchangeClass = '奖金兑换';
                } else {
                    $scope.prizeItems[i].exchangeType = '收入';
                    $scope.prizeItems[i].isIncome = true;
                    $scope.prizeItems[i].exchangeClass = '出票失败退款';
                };
            };
        }, function() {
            alert('网络异常,未能获取到奖金纪录');
        })
    }])
    //全部订单页面
    .controller('allOrdersCtrl', ['$scope', '$rootScope', '$state', 'getUser', 'locals', function($scope, $rootScope, $state, getUser, locals) {
        var token = locals.getObject($rootScope.user).token;
        getUser.getInfo(url + '/service/lottery/getList?token=' + token).then(function(response) {
            $scope.allOrders = response.data;
            for (var i = 0; i < $scope.allOrders.length; i++) {
                if ($scope.allOrders[i].lotteryID == 53) {
                    $scope.allOrders[i].lotteryID = '排列五'
                } else if ($scope.allOrders[i].lotteryID == 54) {
                    $scope.allOrders[i].lotteryID = '排列三'
                } else {
                    $scope.allOrders[i].lotteryID = '大乐透'
                };
                if ($scope.allOrders[i].status == 0 || $scope.allOrders[i].status == 1 || $scope.allOrders[i].status == 2) {
                    $scope.allOrders[i].whetherRed = true;
                    $scope.allOrders[i].status = '待开奖';
                    $scope.allOrders[i].whetherDate = true;
                    $scope.allOrders[i].LT = $scope.allOrders[i].updateDate;
                    $scope.allOrders[i].RT = '扫码兑换';
                } else if ($scope.allOrders[i].status == 4) {
                    $scope.allOrders[i].whetherRed = true;
                    $scope.allOrders[i].status = '已中奖';
                    $scope.allOrders[i].whetherDate = false;
                    $scope.allOrders[i].LT = '奖金: ¥' + $scope.allOrders[i].winamt;
                    $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                } else if ($scope.allOrders[i].status == -1) {
                    $scope.allOrders[i].whetherRed = false;
                    $scope.allOrders[i].status = '兑换超时';
                    $scope.allOrders[i].whetherDate = false;
                    $scope.allOrders[i].LT = '  ';
                    $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                } else if ($scope.allOrders[i].status == 2) {
                    $scope.allOrders[i].whetherRed = false;
                    $scope.allOrders[i].status = '未中奖';
                    $scope.allOrders[i].whetherDate = false;
                    $scope.allOrders[i].LT = '再接再厉哦~~~';
                    $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                }
            }
        }, function() {
            alert('网络异常,未能获取到全部订单');
        })
        $scope.toOrderDetail = function(ticketID) {
            for (var i = 0; i < $scope.allOrders.length; i++) {
                if (ticketID == $scope.allOrders[i].ticketID) {
                    var investCode = $scope.allOrders[i].investCode.split('@');
                    var investCodeFormat = [];
                    if (investCode.length == 2) {
                        investCodeFormat[0] = investCode[0].split(',');
                        investCodeFormat[1] = investCode[1].split(',');
                    } else if (investCode.length == 1) {
                        investCodeFormat[0] = investCode[0].split(',');
                    }
                    $rootScope.orderDetail = {
                        lotteryID: $scope.allOrders[i].lotteryID,
                        openTime: $scope.allOrders[i].updateDate,
                        status: $scope.allOrders[i].status,
                        investCode: investCodeFormat,
                        pay: $scope.allOrders[i].money,
                        ticketID: ticketID,
                        orderTime: $scope.allOrders[i].updateDate,
                        winMoney: $scope.allOrders[i].winamt
                    }
                }
            }
            $state.go('orderDetail');
        }
    }])
    //订单详情
    .controller('orderDetailCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
        $scope.orderDetail = $rootScope.orderDetail;
    }])
    //提现明细
    .controller('widthdrawRecordsCtrl', ['$scope', '$rootScope', 'getUser', 'locals', 'postData', function($scope, $rootScope, getUser, locals, postData) {
        var token = locals.getObject($rootScope.user).token;
        getUser.getInfo(url + '/service/cash/getList?token=' + token).then(function(response) {
            $scope.widthdrawItems = response.data;
            ///////////
            //下面这个是不要的,现在作为展示用 //
            ///////////
            $scope.widthdrawItems[1].status = 1;
        }, function() {
            alert('网络异常,未能获取到提现明细')
        })
    }]);