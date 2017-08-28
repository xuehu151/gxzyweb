/**
 * Created by admin on 2017/6/15.
 */
var url = "http://lottery.zhenlong.wang";
//奖金纪录页面
angular.module('starter.prizeRecordsCtrl', ['starter.services'])

    .controller('prizeRecordsCtrl', function($scope, $rootScope, getUser, locals, $ionicLoading, $util,$ionicModal, $timeout,$ionicScrollDelegate) {
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;
        $scope.selectIndex = 0; //切换奖金记录和提现记录
        $ionicLoading.show({
            hideOnStateChange: true,
            // delay: 1000,
        });
        $scope.activeTab = function(which) {
            $scope.selectIndex = which;
            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }

        var prizeRecords = $scope.prizeRecords = {
            moredata: true,
            prizeEach:[],
            pagination: {
                pageSize: 12,
                pageNum: 1
            },
            loadMore: function() {
                getUser.getInfo(url + '/service/bonus/getList?token=' + token + '&pageNum=' + prizeRecords.pagination.pageNum + '&pageSize=' + prizeRecords.pagination.pageSize)
                    .then(function(response) {
                        console.log(response);
                        if (response.error == '0' && response.data.length != 0) {
                            $scope.prizeItems=prizeRecords.prizeEach =prizeRecords.prizeEach.concat(response.data) ;

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


                            prizeRecords.pagination.pageNum += 1;
                        }
                        else if (response.error == '0' && response.data.length == 0) {
                            prizeRecords.moredata = false;
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
                        alert('您的网络异常,未能成功获取您的奖金记录');
                        $ionicLoading.hide();
                    });

            }
        };


        var widthdrawRecords = $scope.widthdrawRecords = {
            moredata: true,
            widthdrawEach:[],
            pagination: {
                pageSize: 12,
                pageNum: 1
            },
            loadMore: function() {
                getUser.getInfo(url + '/service/cash/getList?token=' + token + '&pageNum=' + widthdrawRecords.pagination.pageNum + '&pageSize=' + widthdrawRecords.pagination.pageSize)
                    .then(function(response) {
                        console.log(response);
                        if (response.error == '0' && response.data.length != 0) {
                            $scope.widthdrawItems=widthdrawRecords.widthdrawEach =widthdrawRecords.widthdrawEach.concat(response.data) ;
                            widthdrawRecords.pagination.pageNum += 1;
                        }
                        else if (response.error == '0' && response.data.length == 0) {
                            widthdrawRecords.moredata = false;
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
                        alert('您的网络异常,未能成功获取您的提现记录');
                        $ionicLoading.hide();
                    });

            }
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
    });
