/**
 * Created by admin on 2017/6/15.
 */
var url = "http://lottery.zhenlong.wang";
//奖金纪录页面
angular.module('starter.prizeRecordsCtrl', ['starter.services'])

    .controller('prizeRecordsCtrl', function($scope, $rootScope, getUser, locals, $ionicLoading, $util,$ionicModal, $timeout) {
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;
        $scope.selectIndex = 0; //切换奖金记录和提现记录
        $ionicLoading.show({
            hideOnStateChange: true,
            // delay: 1000,
        });
        $scope.activeTab = function(which) {
            $scope.selectIndex = which;
        }
        //        console.log(tokden);
        getUser.getInfo(url + '/service/bonus/getList?token=' + token)
            .then(function(response) {
                if (response.error == '0') {
                    $scope.prizeItems = response.data;
                    console.log($scope.prizeItems);
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
                        }
                    }
                } else {
                    $scope.error = response.info;
                    $timeout(function() {
                        $scope.modalError.show();
                    }, 100);
                }

                $ionicLoading.hide();
            }, function(error) {
                alert(error);
                $ionicLoading.hide();
            });

        getUser.getInfo(url + '/service/cash/getList?token=' + token)
            .then(function(response) {
                console.log(response);
                if (response.error == '0') {
                    $scope.widthdrawItems = response.data;
                } else {
                    $scope.error = response.info;
                    $timeout(function() {
                        $scope.modalError.show();
                    }, 100);
                }
                $ionicLoading.hide();
            }, function(error) {
                alert(error);
                $ionicLoading.hide();
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
