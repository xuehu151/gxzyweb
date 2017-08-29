/**
 * Created by admin on 2017/6/14.
 */
var ipUrl = 'http://lottery.zhenlong.wang/service';
//兑换
angular.module ('starter.ExchangeCtrl', ['starter.services'])
    
    .controller ('ExchangeCtrl', function ($location, $scope, $http, $state, $ionicLoading, $ionicPopup, $rootScope, locals, $ionicModal, $interval, $util, initDataService, getUserNameService, getWareIssueService) {
        $rootScope.newStatus = true;
        $ionicLoading.show ({
            template : 'Loading...'
        });
        sign = $location.search ().sign;
        type = $location.search ().type;
        var data = {};
        var userInfo = $util.getUserInfo ();
        console.info(userInfo);
        console.info("aaa"+typeof type);
        console.info("aaa" + type);
        if (userInfo != undefined && type == undefined){
            PayType = 1;
            console.info("PayType*************"+PayType);
            $ionicLoading.hide ();
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
            $scope.goToExchangeBigLotto3 = function (status) {
                $rootScope.newStatus = status;
                $state.go ('BigLotto-2');
            };
            getWareIssueService.getWinamt (data, userInfo.data.token)
                .then (function (response) {
                     console.info(response);
                    $scope.winningShow = response.data;
                    console.info ($scope.winningShow);
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
                initDataService.initDataNew (userToken)  //index1==余额
                    .then (function (response) {
                        $ionicLoading.hide ();
                        PayType = 1;
                        /* 获取初始化数据 */
                        var datas = $util.setUserInfo (response);
                        var userInfo = $util.getUserInfo ();
                        console.log (userInfo);
                        
                        if (userInfo.error != '0') {
                            $scope.errorInfo = userInfo.info;
                            $rootScope.errorInfo ();
                        }
                        else if (userInfo.error == '2301') {
                            $scope.errorInfo = userInfo.info;
                            $scope.errorInfo ();
                        } else {
                            $state.go ('tab.account');
                        }
                    }, function (error) {
                        alert ('加载失败，请检查网络')
                    });
            }
            else if (type == 1) {
                var userInfo;
                data = {
                    token : sign
                };
              /*  if (userInfo != undefined) {
                    $ionicLoading.hide ();
                    return
                }*/
                initDataService.initData (data)   //index==扫码
                    .then (function (response) {
                        $ionicLoading.hide ();
                        PayType = 0;
                        console.info(response);
                        if (response.error == '0') {
                            /* 获取初始化数据 */
                            var datas = $util.setUserInfo (response);
                            userInfo = $util.getUserInfo ();
                            console.log (userInfo);
                           /* getWareIssueService.getWinamt (data, userInfo.data.token)
                                .then (function (response) {
                                    // console.info(response.data);
                                    $scope.winningShow = response.data;
                                    console.info ($scope.winningShow);
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
                                });*/
                            $state.go ('scanCodeIndex');
                        }
                        else if (response.error == '2301') {
                            /* 获取初始化数据 */
                            var datas = $util.setUserInfo (response);
                            var userInfo = $util.getUserInfo ();
                            console.log (userInfo);
                            $state.go ('tab.account');
                        }
                        else {
                            alert(response.info)
                        }
                    }, function (response) {
                        alert ("初始化数据失败");
                    });
            }
            else {
                return
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
                                url : ipUrl + '/customer/add?token=' + userInfo.data.token,
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
                                    
                                    $state.go ("scanCodeIndex", {}, { reload : true });
                                }, function (response) {
                                    alert ('加载失败，请检查网络')
                                });
                        }
                    });
            }
            //错误码窗口配置
            $ionicModal.fromTemplateUrl ('templates/errorPop.html', {
                scope : $scope,
                backdropClickToClose : true
            }).then (function (modal) {
                $scope.modalError = modal;
            });
            $scope.cancelPopError = function () {
                $scope.modalError.hide ();
            };
        }
        else {
            alert ("初始化数据失败");
            $ionicLoading.hide ();
        }
    });
