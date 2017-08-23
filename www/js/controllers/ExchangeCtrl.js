/**
 * Created by admin on 2017/6/14.
 */
var ipUrl = 'http://lottery.zhenlong.wang/service';
//兑换
angular.module('starter.ExchangeCtrl', ['starter.services'])

    .controller('ExchangeCtrl', function ($location, $scope, $http, $state, $ionicLoading, $ionicPopup, $rootScope, locals, $ionicModal, $interval, $util, initDataService, getUserNameService, getWareIssueService) {
        $rootScope.newStatus = true;
        $ionicLoading.show({
            template: 'Loading...'
        });
        if ($location.search().sign && $location.search().type) {
            sign = $location.search().sign;
            type = $location.search().type;
        }
        if (sign != undefined) {
            if (type == 0) {
                //初始化用户接口
                /*$http ({
                 method : "POST",
                 url : initUrlNew,
                 data : {
                 token : sign
                 },
                 transformRequest : function (obj) {
                 var str = [];
                 for (var s in obj) {
                 str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                 }
                 return str.join ("&");
                 },
                 timeout : 3000
                 })*/
                var userToken = {
                    token: sign
                };
                initDataService.initDataNew(userToken)
                    .then(function (response) {
                        $ionicLoading.hide();
                        PayType = 0;
                        /* 获取初始化数据 */
                        var datas = $util.setUserInfo(response);
                        var userInfo = $util.getUserInfo();
                        console.log(userInfo);
                        if (userInfo.error != '0') {
                            $scope.errorInfo = userInfo.info;
                            $rootScope.errorInfo();
                        }
                        else {
                            if (!userInfo.data.user.realName) {
                                modal();
                            }

                            //初始化
                            if (userInfo.error == '2301') {
                                $scope.errorInfo = userInfo.info;
                                $scope.errorInfo();
                            }
                            else {
                                $scope.goToExchange3D = function () {
                                    $state.go('exchange-3');
                                };
                                $scope.goToExchange5D = function () {
                                    $state.go('exchange-5');
                                };
                                $scope.goToExchangeBigLotto2 = function (status) {
                                    $rootScope.newStatus = status;
                                    $state.go('BigLotto-2', {
                                        'flag2': 1
                                    });
                                };
                                $scope.goToExchangeBigLotto3 = function (status) {//用户扫码进来 抵用券投注type=0
                                    $scope.errorInfo = '大乐透只能选择2元的进行投注哦!';
                                    $rootScope.errorInfo();
                                };
                            }
                        }
                        //console.log (response.data);
                    }, function (error) {
                        alert('加载失败，请检查网络')
                    });
            }
            else if (type == 1) {
                /*$http ({
                 method : "POST",
                 url : initUrl,
                 data : {
                 token : sign
                 },
                 transformRequest : function (obj) {
                 var str = [];
                 for (var s in obj) {
                 str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                 }
                 return str.join ("&");
                 },
                 timeout : 3000
                 })*/

                var data = {
                    token: sign
                };
                initDataService.initData(data)   //index==扫码
                    .then(function (response) {
                        $ionicLoading.hide();
                        PayType = 0;
                        if (response.error == '0') {
                            /* 获取初始化数据 */
                            var datas = $util.setUserInfo(response);
                            var userInfo = $util.getUserInfo();
                            console.log(userInfo);
                            $state.go('scanCodeIndex');
                        }
                        else if (response.error == '2301') {
                            /* 获取初始化数据 */
                            var datas = $util.setUserInfo(response);
                            var userInfo = $util.getUserInfo();
                            console.log(userInfo);
                            $state.go ('tab.account');
                        }
                        else
                            {
                            var userToken = {
                                token: sign
                            };
                            console.info(response.info);
                            initDataService.initDataNew(userToken)  //index1==余额
                                .then(function (response) {
                                    $ionicLoading.hide();
                                    PayType = 1;
                                    /* 获取初始化数据 */
                                    var datas = $util.setUserInfo(response);
                                    var userInfo = $util.getUserInfo();
                                    console.log(userInfo);
                                    getWareIssueService.getWinamt(data, userInfo.data.token)
                                        .then(function (response) {
                                            // console.info(response.data);
                                            $scope.winningShow = response.data;
                                            console.info( $scope.winningShow);
                                            //上下滚动效果
                                            slide (document.getElementsByTagName ('ul')[0]);
                                            function slide (parent) {
                                                setTimeout (function () {
                                                    var className = $ ("." + parent.className);
            
                                                    var i = 0, sh;
                                                    var liLength = className.children ("li").length;
                                                    var liHeight = className.children ("li").height () + parseInt (className.children ("li").css ('border-bottom-width'));
                                                    className.html (className.html () + className.html ());
            
                                                    // 开启定时器
                                                    sh = setInterval (slide, 3000);
                                                    function slide () {
                                                        if (parseInt (className.css ("margin-top")) > (-liLength * liHeight)) {
                                                            i++;
                                                            className.animate ({
                                                                marginTop : -liHeight * i + "px"
                                                            }, "slow");
                                                        }
                                                        else {
                                                            i = 0;
                                                            className.css ("margin-top", "0px");
                                                        }
                                                    }
                                                    // 清除定时器
                                                    className.hover (function () {
                                                        clearInterval (sh);
                                                    }, function () {
                                                        clearInterval (sh);
                                                        sh = setInterval (slide, 3000);
                                                    });
                                                }, 0);
                                            }
                                        }, function (error) {
                                            alert('数据获取失败!');
                                        });

                                    if (userInfo.error != '0') {
                                        $scope.errorInfo = userInfo.info;
                                        $rootScope.errorInfo();
                                    }
                                    else {
                                        //初始化
                                        if (userInfo.error == '2301') {
                                            $scope.errorInfo = userInfo.info;
                                            $scope.errorInfo();
                                        }
                                        else {
                                            $scope.goToExchange3D = function () {
                                                $state.go('exchange-3');
                                            };
                                            $scope.goToExchange5D = function () {
                                                $state.go('exchange-5');
                                            };
                                            $scope.goToExchangeBigLotto2 = function (status) {
                                                $rootScope.newStatus = status;
                                                $state.go('BigLotto-2', {
                                                    'flag2': 1
                                                });
                                            };
                                            $scope.goToExchangeBigLotto3 = function (status) {//用户扫码进来 抵用券投注type=0
                                                $rootScope.newStatus = status;
                                                $state.go('BigLotto-2');
                                            };
                                        }
                                    }
                                    //console.log (response.data);
                                }, function (error) {
                                    alert('加载失败，请检查网络')
                                });
                            //$state.go ('tab.account');
                        }
                        
                    }, function (response) {
                        alert("初始化数据失败");
                    });
            }
            else {
                return
            }
            //模态注册窗口
            function modal() {
                //注册信息模态窗口
                $ionicModal.fromTemplateUrl('templates/modal.html', {
                    scope: $scope,
                    animation: '0'
                })
                    .then(function (modal) {
                        modal.show();
                        //$scope.modal = modal;

                        $scope.userInfo = {
                            newUserName: "",
                            newUserIphone: "",
                            newUserSure: ""
                        };
                        $scope.GetTickets = function () {  //领取彩票按钮
                            if ($scope.userInfo.newUserName == '') {
                                var alertPopup = $ionicPopup.alert({
                                    title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template: '<div class="alert-left"><p style="text-align: center">请填写个人真实姓名</p></div>',
                                    okText: '确 定',
                                    okType: 'button-light'
                                });
                                /*$cordovaToast
                                 .show('ionic中文网', 'long', 'center')
                                 .then(function(success) {
                                 // success
                                 }, function (error) {
                                 // error
                                 });*/
                                //ionicToast.show('请填写个人真实姓名!', 'middle', false, 1000);
                                return;
                            }
                            else if ($scope.userInfo.newUserIphone == '') {
                                var alertPopup = $ionicPopup.alert({
                                    title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template: '<div class="alert-left"><p style="text-align: center">请填写电话号码</p></div>',
                                    okText: '确 定',
                                    okType: 'button-light'
                                });
                                //ionicToast.show('请填写电话号码!', 'middle', false, 1000);
                                return;
                            }
                            else if (parseInt($scope.userInfo.newUserIphone) != parseInt($scope.userInfo.newUserSure)) {
                                var alertPopup = $ionicPopup.alert({
                                    title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template: '<div class="alert-left"><p style="text-align: center">电话号码不一致</p></div>',
                                    okText: '确 定',
                                    okType: 'button-light'
                                });
                                //ionicToast.show('电话号码不一致!', 'middle', false, 1000);
                                return;
                            }
                            else {
                                timePromise = $interval(function () {
                                    modal.hide();
                                }, 1000, 100);
                            }

                            $ionicLoading.show();
                            $http({
                                method: "POST",
                                url: ipUrl + '/customer/add?token=' + userInfo.data.token,
                                data: {
                                    realName: $scope.userInfo.newUserName,
                                    phone: $scope.userInfo.newUserIphone
                                },
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                            /*var data = {
                             realName: $scope.userInfo.newUserName,
                             phone: $scope.userInfo.newUserIphone
                             };
                             getUserNameService.loginModal (data, userInfo.data.token)*/
                                .then(function (response) {
                                    $ionicLoading.hide();
                                    var userInfo = $util.getUserInfo();
                                    //数据更新
                                    userInfo.data.user.realName = $scope.userInfo.newUserName;
                                    userInfo.data.user.phone = $scope.userInfo.newUserIphone;
                                    var datas = $util.setUserInfo(userInfo);
                                    console.log(userInfo);

                                    $state.go("scanCodeIndex", {}, {reload: true});
                                }, function (response) {
                                    alert('加载失败，请检查网络')
                                });
                        }
                    });
            }
        }
        else {
            if (type == 0) {
                PayType = 0
            }
            else {
                PayType = 1
            }
        }
    });
