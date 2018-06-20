/**
 * Created by admin on 2017/6/14.
 */
//扫码兑换首页
angular.module('starter.scanCodeIndexCtrl', ['starter.services'])

    .controller('scanCodeIndexCtrl', function ($scope, $state, getUser, $util, $ionicModal, $rootScope, initDataService, $ionicLoading, $timeout, getWareIssueService, $slide, BettingService, $errorPopupFactory, $footballInfo) {
        PayType = 0;
        var data = {};
        var userInfo = $util.getUserInfo();
        $scope.imgUrl_1 = './img/QRcodeDanshadow.png';
        $scope.imgUrl_2 = './img/QRcode21Shadow.png';
        var urlTarget_1;
        var urlTarget_2;
        var playData_1;
        var playData_2;

        console.info('userInfo null',userInfo);
        if (token == undefined && vid == undefined) {
             getFootballQR();
             PayType = 0;
             $ionicLoading.hide();
             $scope.goToExchange3D = function () {
                 //pl3AddAuto();
                 //$state.go ('exchange-3');
                 goToExchange3D();
             };
             $scope.goToExchange5D = function () {
                 //$state.go ('exchange-5');
                 goToExchange5D();
             };
             $scope.goToExchangeBigLotto2 = function (status) {
                 $rootScope.newStatus = status;
                 $state.go('BigLotto-2', {
                     'flag2': 1
                 });
             };
             getWareIssueService.getWinamt(data, userInfo.data.token)
                 .then(function (response) {
                     $scope.winningShow = response.data;
                     //上下滚动效果
                     $slide.slideWinner(document.getElementsByTagName('ul')[0]);
                 }, function (error) {
                     alert('数据获取失败!');
                 });
             return;
         }
        getWareIssueService.getWinamt(data, userInfo.data.token)
            .then(function (response) {
                console.info(response);
                $scope.winningShow = response.data;
                for (var i = 0; i < response.data.length; i++) {//手机号隐藏中间四位
                    var userPhone = response.data[i].phone;
                    response.data[i].phone = userPhone.substr(0, 3) + "****" + userPhone.substr(7);
                }
                //上下滚动效果
                $slide.slideWinner(document.getElementsByTagName('ul')[0]);
            }, function (error) {
                $ionicLoading.hide();
                alert('数据获取失败!');
            });
        if ($rootScope.popup == 1) {
            $timeout(function () {
                $scope.modal2.show();
            }, 500);
        }

        getFootballQR();
        function getFootballQR() {
            $footballInfo.getFootballPlan(data, userInfo.data.token)
                .then(function (response) {
                    console.info('+++++++++++++', response);
                    if (response.error === '0') {
                        if (response.data[0].length > response.data[1].length) {
                            response.data.reverse();
                        }
                        if (response.data[0].length === 2) {
                            urlTarget_1 = 'lotteryFootball';
                            playData_1 = response.data[0];
                            $scope.imgUrl_1 = './img/QRcodeDan.png';
                        }
                        else if (response.data[0].length === 3) {
                            urlTarget_1 = 'twoLotteryFootball';
                            playData_1 = response.data[0];
                            $scope.imgUrl_1 = './img/QRcode21.png';
                        }

                        if (response.data[1].length === 2) {
                            urlTarget_2 = 'lotteryFootball';
                            playData_2 = response.data[1];
                            $scope.imgUrl_2 = './img/QRcodeDan.png';
                        }
                        else if (response.data[1].length === 3) {
                            urlTarget_2 = 'twoLotteryFootball';
                            playData_2 = response.data[1];
                            $scope.imgUrl_2 = './img/QRcode21.png';
                        }
                    } else {
                        $scope.errorInfo = '球队们正在休息,请稍等... 错误码' + response.error;
                        $rootScope.errorInfo();
                    }
                });
        }

        $scope.goToExchange3D = function () {
            // pl3AddAuto();
            //$state.go ('exchange-3');
            goToExchange3D();
        };
        function goToExchange3D() {
            if (!urlTarget_1) {
                $scope.imgagesUrl = './img/completeInf.png';
                $scope.successOrFaild = '球队们正在休息,请稍等...';
                $errorPopupFactory.errorInfo($scope, $state, 'scanCodeIndex');
            } else {
                $state.go(urlTarget_1, {playData: playData_1});
            }
        }
        $scope.goToExchange5D = function () {
            //$state.go ('exchange-5');
            goToExchange5D();
        };

        function goToExchange5D() {
            if (!urlTarget_2) {
                $scope.imgagesUrl = './img/completeInf.png';
                $scope.successOrFaild = '球队们正在休息,请稍等...';
                $errorPopupFactory.errorInfo($scope, $state, 'scanCodeIndex');
            } else {
                $state.go(urlTarget_2, {playData: playData_2});
            }
        }

        $scope.goToExchangeBigLotto2 = function () {
            $state.go('BigLotto-2', {
                'flag2': 1
            });
        };

        $scope.goToExchange = function () {
//            $state.go('scanCodeIndex');
            $scope.modal2.hide();
        };

        console.info('PayType4444', PayType);
        //排列3自动投注
        function pl3AddAuto() {
            var vid = '';
            if (type == 0 || type === undefined) {
                if ($rootScope.nowVid) {
                    vid = $rootScope.nowVid;
                }
            }
            else if (type == 1) {
                if ($rootScope.nowVid) {
                    vid = $rootScope.nowVid;
                }
                else {
                    vid = userInfo.data.voucher.vid;
                }
            }
            var data = {
                vid: vid
            };

            BettingService.pl3addAuto(data, userInfo.data.token)
                .then(function (response) {
                    //console.info(response);
                    if (response.error == '0') {
                        //提交成功窗口配置
                        $ionicModal.fromTemplateUrl('templates/3Dbet/pl3addAuto.html', {
                            scope: $scope,
                            backdropClickToClose: true
                        })
                            .then(function (modal) {
                                modal.show();
                                $rootScope.makeSureText = '立即查看';
                                $scope.info = '恭喜您获得排列3号码一注';
                                $scope.realName = userInfo.data.user.realName;
                                $scope.phones = userInfo.data.user.phone;
                                $scope.receives = response.data.createDate; //投注时间
                                $scope.draw_time = response.data.drawTime;    //开奖时间

                                var investCode = response.data.lotteryList[0].investCode;//获赠号码
                                $scope.receiveNum = investCode.split('*');
                                //console.info($scope.receiveNum);
                                $scope.makeSure = function () {
                                    modal.hide();
                                    $state.go('allOrders');
                                }
                            });
                    }
                    else {
                        $scope.errorInfo = response.info + '错误码' + response.error;
                        $rootScope.errorInfo();
                    }
                });
        }

        //老用户获得彩票的mordal窗口配置
        $ionicModal.fromTemplateUrl('templates/mistakeBox/getOneBetModal.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function (modal) {
            $scope.modal2 = modal;
        });

        $scope.cancelPop2 = function () {
            $scope.modal2.hide();
        };

        //错误码窗口配置
        $rootScope.errorInfo = function () {
            $ionicModal.fromTemplateUrl('templates/mistakeBox/errorInfo.html', {
                scope: $scope,
                backdropClickToClose: true
            }).then(function (modal) {
                $scope.modalError = modal;
                modal.show();
            });
            $scope.cancelPopError = function () {
                $scope.modalError.hide();
            };
        };


    });
