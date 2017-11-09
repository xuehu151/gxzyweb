/**
 * Created by admin on 2017/6/15.
 */
//var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名

//提现页面
angular.module('starter.widthdrawCtrl', ['starter.services'])
    .controller('widthdrawCtrl', function($scope, $state, $rootScope, getUser, locals, postData, $ionicLoading, $util, $ionicModal, $timeout) {
        $scope.whetherShow2 = false; //控制提现提交按钮disable
        $ionicLoading.show({
            hideOnStateChange: true
        });
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;
        getUser.getInfo(url + "/service/customer/getUser?token=" + token)
            .then(function(response) {
                if (response.error == '0') {
                    $scope.widthdrawAble = response.data.money; //可用余额
                    $scope.widthdrawMoney = { money: $scope.widthdrawAble }; //提现金额

                    //小于20 disable
                    if ($scope.widthdrawMoney.money < 20) {
                        $scope.cantWidthdraw = '';
                        $scope.whetherShow2 = true;
                    } else {
                        $scope.cantWidthdraw = '';
                        $scope.whetherShow2 = false;
                    };
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
        $(window).on('resize', function() {
            var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (clientHeight > nowClientHeight) {
                //键盘弹出的事件处理
            } else {
                console.log($('#scrollBugTwo').css('height'))
                $('#scrollBugTwo').css('height', clientHeight);

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
