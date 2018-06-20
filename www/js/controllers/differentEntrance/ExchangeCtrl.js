/**
 * Created by admin on 2017/6/14.
 */
angular.module('starter.ExchangeCtrl', ['starter.services'])
    .controller('ExchangeCtrl', function ($location, $scope, $http, $state, $ionicLoading, $ionicPopup, $ionicModal, $interval, $util, initDataService, getUserNameService, getWareIssueService, $timeout, $slide, $footballInfo, $rootScope, $errorPopupFactory, $getUserInfo) {
        $rootScope.newStatus = true;
        token = $location.search().token;
        vid = $location.search().vid;
        var  userInfo = $util.getUserInfo();
        var data = {};
        var imgBgArr;
        console.info(token);
        console.info(userInfo);
        if (token == undefined && vid == undefined) {
            PayType = 1;
            var urlTarget_1;
            var urlTarget_2;
            var playData_1;
            var playData_2;
            $scope.imgUrl_1 = './img/seriesClosed.png';
            $scope.imgUrl_2 = './img/singlePass.png';
            $footballInfo.footballBg(data, userInfo.data.token)
                .then(function (response) {
                    if (response.error === '0') {
                        sessionStorage.setItem("imgBgArr", JSON.stringify(response.data.activityPicture));
                        var value = JSON.parse(sessionStorage.getItem("imgBgArr"));
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
                                        $scope.imgUrl_1 = value[8].img;
                                    }
                                    else if (response.data[0].length === 3) {
                                        urlTarget_1 = 'twoLotteryFootball';
                                        playData_1 = response.data[0];
                                        $scope.imgUrl_1 = value[9].img;
                                    }

                                    if (response.data[1].length === 2) {
                                        urlTarget_2 = 'lotteryFootball';
                                        playData_2 = response.data[1];
                                        $scope.imgUrl_2 = value[8].img;
                                    }
                                    else if (response.data[1].length === 3) {
                                        urlTarget_2 = 'twoLotteryFootball';
                                        playData_2 = response.data[1];
                                        $scope.imgUrl_2 = value[9].img;
                                    }
                                } else {
                                    $scope.errorInfo = '球队们正在休息,请稍等... 错误码' + response.error;
                                    $rootScope.errorInfo();
                                }
                            });
                    }else {
                        $scope.imgagesUrl = './img/completeInf.png';
                        $scope.successOrFaild = '未获取到正确的比赛信息';
                        $errorPopupFactory.errorInfo($scope, $state, 'tab.exchange');
                    }
                });

            $scope.goToExchange3D = function () {
                // $state.go ('exchange-3');
                if (!urlTarget_1) {
                    $scope.imgagesUrl = './img/completeInf.png';
                    $scope.successOrFaild = '球队们正在休息,请稍等...';
                    $errorPopupFactory.errorInfo($scope, $state, 'tab.exchange');
                } else {
                    $state.go(urlTarget_1, {playData: playData_1});
                }
            };
            $scope.goToExchange5D = function () {
                // $state.go ('exchange-5');
                if (!urlTarget_2) {
                    $scope.imgagesUrl = './img/completeInf.png';
                    $scope.successOrFaild = '球队们正在休息,请稍等...';
                    $errorPopupFactory.errorInfo($scope, $state, 'tab.exchange');
                } else {
                    $state.go(urlTarget_2, {playData: playData_2});
                }
            };
            $scope.goToExchangeBigLotto2 = function (status) {
                $rootScope.newStatus = status;
                $state.go('BigLotto-2', {
                    'flag2': 1
                });
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
//                    WeixinJSBridge.call('closeWindow');
                };
            };

            getWareIssueService.getWinamt(data, userInfo.data.token)
                .then(function (response) {
                    $scope.winningShow = response.data;
                    for (var i = 0; i < response.data.length; i++) {//手机号隐藏中间四位
                        var userPhone = response.data[i].phone;
                        response.data[i].phone = userPhone.substr(0, 3) + "****" + userPhone.substr(7);
                    }
                    //上下滚动效果
                    $slide.slideWinner(document.getElementsByTagName('ul')[0]);
                }, function (error) {
                    alert('数据获取失败!');
                });
            return;
        }
        if(token !== undefined){
            $getUserInfo.getUser(data, token)
                .then(function (response) {
                    console.info(response);
                    $ionicLoading.hide();
                    var resObj = {};
                    if (response.error === '0') {
                        var user = response.data;
                        $http ({
                            method : "POST",
                            url : ipUrl + '/service/customer/getVoucherByVid?vid=' + vid,
                            data : data,
                            headers : {
                                "Content-Type" : "application/json",
                                "Auth-Token" : token
                            },
                            timeout: 1000 * 10 * 3
                        })
                            .then (function (response) {
                                console.info('vvvvvvvvv',response);
                                var data = {};
                                var voucher = response.data.data;
                                data.user = user;
                                data.voucher = voucher;
                                data.token = token;
                                resObj.data = data;
                                $util.setUserInfo(resObj);
                                userInfo = $util.getUserInfo();
                                console.info('userInfo------',userInfo);
                                if (vid === 'null') { //type=1
                                    $state.go('tab.account');
                                } else {
                                    $rootScope.popup = 1;
                                    $rootScope.giveMoney = userInfo.data.voucher.money;
                                    $state.go('scanCodeIndex');
                                }
                            });
                    }
                    else {
                        $scope.imgagesUrl = './img/completeInf.png';
                        $scope.successOrFaild = response.info + '错误码' + response.error;
                        $errorPopupFactory.errorInfo ($scope, $state ,'tab.exchange');
                    }
                });
        }
        else {
            $scope.imgagesUrl = './img/completeInf.png';
            $scope.successOrFaild = '参数错误';
            $errorPopupFactory.errorInfo ($scope, $state ,'tab.exchange');
        }

    });
