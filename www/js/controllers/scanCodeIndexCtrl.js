/**
 * Created by admin on 2017/6/14.
 */
//var ipUrl = "http://lottery.zhenlong.wang";
//var ipUrl = 'http://103.235.237.134';      //本地ip地址或者域名

//扫码兑换首页
angular.module ('starter.scanCodeIndexCtrl', ['starter.services'])
    
    .controller ('scanCodeIndexCtrl', function ($scope, $state, getUser, $util, $ionicModal, $rootScope, initDataService, $ionicLoading, $timeout, getWareIssueService, BettingService) {
        PayType = 0;
        
        var data = {};
        var userInfo = $util.getUserInfo ();
        if (userInfo != undefined && type == '0') {
            PayType = 0;
            $ionicLoading.hide ();
            $scope.goToExchange3D = function () {
                pl3AddAuto();
                //$state.go ('exchange-3');
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
            getWareIssueService.getWinamt (data, userInfo.data.token)
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
                });
            return;
        }
        getWareIssueService.getWinamt (data, userInfo.data.token)
            .then (function (response) {
                //console.info (response.data);
                $scope.winningShow = response.data;
                for (var i = 0; i < response.data.length; i++) {//手机号隐藏中间四位
                    var userPhone = response.data[i].phone;
                    var userPhoneStr = userPhone.substr(0,3)+"****"+userPhone.substr(7);
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
                $ionicLoading.hide ();
                alert ('数据获取失败!');
            });
        if ($rootScope.popup == 1) {
            $timeout(function () {
                $scope.modal2.show();
            }, 500);
        }
        
       /* var data = {
            token : sign
        };*/
        /*initDataService.initData (data) // index
            .then (function (response) {
                $ionicLoading.hide ();
            
                /!* 获取初始化数据 *!/
                var datas = $util.setUserInfo (response);
                var userInfo = $util.getUserInfo ();
                console.log (userInfo);
            
                var token = userInfo.data.token;
                $scope.needExchangeAmount = { amount : 0 };
            
                getWareIssueService.getWinamt (data, userInfo.data.token)
                    .then (function (response) {
                        // console.info(response.data);
                        $scope.winningShow = response.data;
                    
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
                    
                        getUser.getInfo (ipUrl + "/service/customer/getVoucherList?token=" + token + '&pageNum=1&pageSize=8')
                            .then (function (response) {
                                console.log (response);
                                $scope.needExchangeAmount.amount = response.data.length;
                                console.log ($scope.needExchangeAmount.amount);
                                $rootScope.needExchangeItems = response.data;
                                if (userInfo.data.voucher) {
                                    $scope.modal2.show ();
                                }
                            
                            }, function (error) {
                                $ionicLoading.hide ();
                                alert ('数据获取失败');
                            });
                    }, function (error) {
                        $ionicLoading.hide ();
                        alert ('数据获取失败!');
                    });
            }, function (response) {
                $ionicLoading.hide ();
                alert ("初始化数据失败");
            });*/
        $scope.goToExchange3D = function () {
            pl3AddAuto();
            //$state.go ('exchange-3');
        };
        $scope.goToExchange5D = function () {
            $state.go ('exchange-5');
        };
        $scope.goToExchangeBigLotto2 = function () {
            $state.go ('BigLotto-2', {
                'flag2' : 1
            });
        };
        
        $scope.goToExchange = function () {
//            $state.go('scanCodeIndex');
            $scope.modal2.hide ();
        };

        console.info('type44444',type);
        console.info('PayType4444',PayType);
        //排列3自动投注
        function pl3AddAuto () {
            var vid = '';
            if (type == 0 || type === undefined) {
                if ($rootScope.nowVid) {
                    vid = $rootScope.nowVid;
                }
            }
            else if (type == 1){
                if ($rootScope.nowVid) {
                    vid = $rootScope.nowVid;
                }
                else {
                    vid = userInfo.data.voucher.vid;
                }
            }
            var data = {
                vid : vid
            };
 
            BettingService.pl3addAuto(data, userInfo.data.token)
                .then(function (response) {
                    //console.info(response);
                    if(response.error == '0'){
                        //提交成功窗口配置
                        $ionicModal.fromTemplateUrl ('templates/pl3addAuto.html', {
                            scope : $scope,
                            backdropClickToClose : true
                        })
                            .then (function (modal) {
                                modal.show ();
                                $rootScope.makeSureText = '立即查看';
                                $scope.info ='恭喜您获得排列3号码一注';
                                $scope.realName = userInfo.data.user.realName;
                                $scope.phones = userInfo.data.user.phone;
                                $scope.receives = response.data.createDate; //投注时间
                                $scope.draw_time = response.data.drawTime;    //开奖时间
                        
                                var investCode = response.data.lotteryList[0].investCode;//获赠号码
                                $scope.receiveNum = investCode.split('*');
                                //console.info($scope.receiveNum);
                                $scope.makeSure = function () {
                                    modal.hide ();
                                    $state.go ('allOrders');
                                }
                            });
                    }
                    else {
                        $scope.errorInfo = response.info + '错误码' + response.error;
                        $rootScope.errorInfo();
                    }
                },function () {
            
                });
    
        }
        
        //老用户获得彩票的mordal窗口配置
        $ionicModal.fromTemplateUrl ('templates/getOneBetModal.html', {
            scope : $scope,
            backdropClickToClose : true
        }).then (function (modal) {
            $scope.modal2 = modal;
        });

        $scope.cancelPop2 = function () {
            $scope.modal2.hide ();
        };
        
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
            };
        };
        
        
    });
