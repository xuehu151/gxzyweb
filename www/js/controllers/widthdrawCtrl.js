/**
 * Created by admin on 2017/6/15.
 */
//var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名

//提现页面
angular.module('starter.widthdrawCtrl', ['starter.services'])
    .controller('widthdrawCtrl', function($scope, $state, $rootScope, getUser, locals, postData, $ionicLoading, $util, $ionicModal, $timeout) {
        $ionicLoading.show({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;

        getUser.getInfo(url + "/service/customer/getUser?token=" + token)
            .then(function(response) {
                if (response.error == '0') {
                    $scope.widthdrawAble = response.data.money; //可用余额
                } else {
                    $scope.error = response.info + '错误码:' + response.error;
                    $timeout(function() {
                        $scope.modalError.show();
                    }, 100);
                }
                $ionicLoading.hide();
            }, function(error) {
                alert('您的网络异常,未能成功获取您的可用余额');
                $ionicLoading.hide();
            });
        $scope.widthdrawMoney = { money: '' }; //提现金额
        $scope.whetherShow1 = true; //控制展示可提现余额
        $scope.whetherShow2 = false; //控制提现提交按钮disable

        $scope.whetherOK = function() {
            // console.log($scope.widthdrawMoney.money)
            if ($scope.widthdrawMoney.money > $scope.widthdrawAble) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = true;
            }
            //小于10元扣除1元手续费
            else if (($scope.widthdrawMoney.money <= 10 && $scope.widthdrawMoney.money > 1) && ($scope.widthdrawMoney.money <= $scope.widthdrawAble)) {
                $scope.cantWidthdraw = '需扣除1元手续费';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = false;
            }
            //小于1 disable
            else if ($scope.widthdrawMoney.money <= 1) {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
            } else if (($scope.widthdrawAble <= 200 && $scope.widthdrawAble > 10) && $scope.widthdrawMoney.money != $scope.widthdrawAble) {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
            } else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = false;
            };
        };
        //提现所有可用余额
        $scope.widthdrawAll = function() {
            $scope.widthdrawMoney.money = $scope.widthdrawAble;
            $scope.whetherOK();
        };
        $scope.confirmWidthdraw = function(widthdrawMoney) {
            $ionicLoading.show({
                hideOnStateChange: true
            });

            var token = userInfo.data.token;
            getUser.getInfo(url + '/service/cash/add' + '?channel=' + $rootScope.channel + '&money=' + $scope.widthdrawMoney.money + '&token=' + token)
                .then(function(response) {
                    console.log(response);
                    if (response.error == '0') {
                        $rootScope.WidthdrawStatus = response.error; //保存返回的状态,用于决定widthdrawResult的页面
                        $state.go('widthdrawResult');
                    } else {
                        $scope.error = response.info + '错误码:' + response.error;
                        $timeout(function() {
                            $scope.modalError.show();
                        }, 100);
                    }
                    $ionicLoading.hide();
                }, function(error) {
                    alert('您的网络异常,未能成功提交你的提现请求');
                    $ionicLoading.hide();
                })
        };

        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(window).on('resize', function () {
            var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (clientHeight > nowClientHeight) {
                //键盘弹出的事件处理
            }
            else {
                console.log($('#scrollBugTwo').css('height'))
                $('#scrollBugTwo').css('height',clientHeight);

            }
        });

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
    });
