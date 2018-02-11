/**
 * Created by admin on 2017/6/14.
 */
//var ipUrl = 'http://lottery.zhenlong.wang';
//var ipUrl = 'http://103.235.237.134';      //本地ip地址或者域名


//兑换
angular.module ('starter.ExchangeCtrl', ['starter.services'])

    .controller ('ExchangeCtrl', function ($location, $scope, $http, $state, $ionicLoading, $ionicPopup, $rootScope, locals, $ionicModal, $interval, $util, initDataService, getUserNameService, getWareIssueService, $timeout) {

        $rootScope.newStatus = true;
        sign = $location.search ().sign;
        type = $location.search ().type;
        var data = {};
        var userInfo = $util.getUserInfo ();
        if (userInfo != undefined && type == undefined) {
            PayType = 1;
            $scope.goToExchange3D = function () {
                $state.go ('exchange-3');
            };
            $scope.goToExchange5D = function () {
                $state.go ('exchange-5');
            };
            $scope.goToExchangeBigLotto2 = function (status) {
                $rootScope.newStatus = status;
                $state.go ('BigLotto-2', {
                    'flag2' : 1
                });
            };
            /*  $scope.goToExchangeBigLotto3 = function (status) {
             $rootScope.newStatus = status;
             $state.go ('BigLotto-2');
             };*/
            getWareIssueService.getWinamt (data, userInfo.data.token)
                .then (function (response) {
                    console.info (response);
                    $scope.winningShow = response.data;
                    console.info ($scope.winningShow);
                    for (var i = 0; i < response.data.length; i++) {//手机号隐藏中间四位
                        var userPhone = response.data[i].phone;
                        var userPhoneStr = userPhone.substr (0, 3) + "****" + userPhone.substr (7);
                        response.data[i].phone = userPhoneStr;
                    }

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
                    alert ('数据获取失败!');
                });
            return;
        }

        if (sign != undefined) {
            if (type == 0) {//初始化不带二维码    index1
                var userToken = {
                    token : sign
                };
                $ionicLoading.show ({
                    template : 'Loading...'
                });
                initDataService.initDataNew (userToken)  //index1==余额
                    .then (function (response) {
                        $ionicLoading.hide ();
                        PayType = 1;
                        /* 获取初始化数据 */
                        $util.setUserInfo (response);
                        var userInfo = $util.getUserInfo ();
                        console.info (userInfo);
                        $scope.errorInfo = '春节期间2月10日至2月27日暂停销售、开奖和兑奖。给您造成不便，敬请谅解，并祝大家新年快乐！';
                        $timeout (function () {
                            $rootScope.errorInfo ();
                            $timeout(function () {
                                $scope.modalError.hide ();
                                if (userInfo.error != '0') {
                                    $scope.errorInfo = response.info + '错误码' + response.error;
                                    $rootScope.errorInfo ();
                                }
                                else {
                                    $state.go ('tab.account');
                                }
                            },4000);
                        }, 10);
                    }, function (error) {
                        $ionicLoading.hide ();
                        alert ('加载失败，请检查网络')
                    });
            }
            else if (type == 1) {
                var userInfo;
                $rootScope.popup = '';
                data = {
                    token : sign
                };
                $ionicLoading.show ({
                    template : 'Loading...'
                });
                initDataService.initData (data)   //index==扫码
                    .then (function (response) {
                        $ionicLoading.hide ();
                        $scope.errorInfo = '春节期间2月10日至2月27日暂停销售、开奖和兑奖。给您造成不便，敬请谅解，并祝大家新年快乐！';
                        $timeout (function () {
                            $rootScope.errorInfo ();
                            $timeout(function () {
                                $scope.modalError.hide ();
                                PayType = 0;
                                console.info (response);
                                if (response.error == '0') {
                                    /* 获取初始化数据 */
                                    $rootScope.popup = 1;
                                    $util.setUserInfo (response);
                                    userInfo = $util.getUserInfo ();
                                    $state.go ('scanCodeIndex');
                                }
                                else if (response.error == '2301') {
                                    /* 获取初始化数据 */
                                    $util.setUserInfo (response);
                                    userInfo = $util.getUserInfo ();
                                    $state.go ('tab.account');
                                }
                                else {
                                    $scope.errorInfo = response.info + '错误码' + response.error;
                                    $rootScope.errorInfo ();
                                }
                            },4000);
                        }, 10);
                    }, function (error) {
                        $ionicLoading.hide ();
                        alert ("初始化数据失败");
                    });
            }
            else {
                $scope.errorInfo = '请求错误';
                $rootScope.errorInfo ();
            }
            //模态注册窗口
            function modal () {
                //注册信息模态窗口
                $ionicModal.fromTemplateUrl ('templates/modal.html', {
                    scope : $scope,
                    animation : '0'
                })
                    .then (function (modal) {
                        modal.show ();
                        //$scope.modal = modal;

                        $scope.userInfo = {
                            newUserName : "",
                            newUserIphone : "",
                            newUserSure : ""
                        };
                        $scope.GetTickets = function () {  //领取彩票按钮
                            if ($scope.userInfo.newUserName == '') {
                                var alertPopup = $ionicPopup.alert ({
                                    title : '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template : '<div class="alert-left"><p style="text-align: center">请填写个人真实姓名</p></div>',
                                    okText : '确 定',
                                    okType : 'button-light'
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
                                var alertPopup = $ionicPopup.alert ({
                                    title : '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template : '<div class="alert-left"><p style="text-align: center">请填写电话号码</p></div>',
                                    okText : '确 定',
                                    okType : 'button-light'
                                });
                                //ionicToast.show('请填写电话号码!', 'middle', false, 1000);
                                return;
                            }
                            else if (parseInt ($scope.userInfo.newUserIphone) != parseInt ($scope.userInfo.newUserSure)) {
                                var alertPopup = $ionicPopup.alert ({
                                    title : '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template : '<div class="alert-left"><p style="text-align: center">电话号码不一致</p></div>',
                                    okText : '确 定',
                                    okType : 'button-light'
                                });
                                //ionicToast.show('电话号码不一致!', 'middle', false, 1000);
                                return;
                            }
                            else {
                                timePromise = $interval (function () {
                                    modal.hide ();
                                }, 1000, 100);
                            }

                            $ionicLoading.show ();
                            $http ({
                                method : "POST",
                                url : ipUrl + '/service/customer/add?token=' + userInfo.data.token,
                                data : {
                                    realName : $scope.userInfo.newUserName,
                                    phone : $scope.userInfo.newUserIphone
                                },
                                headers : {
                                    "Content-Type" : "application/json"
                                }
                            })
                            /*var data = {
                             realName: $scope.userInfo.newUserName,
                             phone: $scope.userInfo.newUserIphone
                             };
                             getUserNameService.loginModal (data, userInfo.data.token)*/
                                .then (function (response) {
                                    $ionicLoading.hide ();
                                    var userInfo = $util.getUserInfo ();
                                    //数据更新
                                    userInfo.data.user.realName = $scope.userInfo.newUserName;
                                    userInfo.data.user.phone = $scope.userInfo.newUserIphone;
                                    var datas = $util.setUserInfo (userInfo);
                                    console.log (userInfo);

                                    $state.go ("scanCodeIndex", {}, {reload : true});
                                }, function (response) {
                                    alert ('加载失败，请检查网络')
                                });
                        }
                    });
            }

            //错误码窗口配置
            $rootScope.errorInfo = function () {
                $ionicModal.fromTemplateUrl ('templates/errorInfo.html', {
                    scope : $scope,
                    backdropClickToClose : true
                }).then (function (modal) {
                    $scope.modalError = modal;
                    modal.show ();
                });
                $scope.cancelPopError = function () {
                    $scope.modalError.hide ();
//                    WeixinJSBridge.call('closeWindow');
                };
            };
        }
        else {
            alert ("初始化数据失败");
            $ionicLoading.hide ();
        }
    });
