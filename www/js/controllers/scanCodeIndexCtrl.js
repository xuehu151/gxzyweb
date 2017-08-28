/**
 * Created by admin on 2017/6/14.
 */
var url = "http://lottery.zhenlong.wang";

//扫码兑换首页
angular.module ('starter.scanCodeIndexCtrl', ['starter.services'])
    
    .controller ('scanCodeIndexCtrl', function ($scope, $state, getUser, $util, $ionicModal, $rootScope, initDataService, $ionicLoading, $timeout, getWareIssueService) {
        PayType = 0;
        
        var data = {
            token : sign
        };
        initDataService.initData (data) // index
            .then (function (response) {
                $ionicLoading.hide ();
                
                /* 获取初始化数据 */
                var datas = $util.setUserInfo (response);
                var userInfo = $util.getUserInfo ();
                console.log (userInfo);
                var token = userInfo.data.token;
                $scope.needExchangeAmount = { amount : 0 };
    
                getWareIssueService.getWinamt(data, userInfo.data.token)
                    .then(function (response) {
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
    
                        getUser.getInfo (url + "/service/customer/getVoucherList?token=" + token + '&pageNum=1&pageSize=8')
                            .then (function (response) {
                                console.log (response);
                                $scope.needExchangeAmount.amount = response.data.length;
                                console.log ($scope.needExchangeAmount.amount);
                                $rootScope.needExchangeItems = response.data;
                                if (userInfo.data.voucher) {
                                    $scope.modal2.show ();
                                }
            
                            }, function (error) {
                                alert ('数据获取失败');
                                $ionicLoading.hide ();
                            });
                    }, function (error) {
                        alert('数据获取失败!');
                    });
            }, function (response) {
                alert ("初始化数据失败");
            });
        
        $scope.goToExchange3D = function () {
            $state.go ('exchange-3');
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
        
        //老用户获得彩票的mordal窗口配置
        $ionicModal.fromTemplateUrl ('templates/getOneBetModal.html', {
            scope : $scope,
            backdropClickToClose : true
        }).then (function (modal) {
            $scope.modal2 = modal;
        });
        /* $scope.openPop2 = function () {
         $scope.modal2.show ();
         };*/
        $scope.cancelPop2 = function () {
            $scope.modal2.hide ();
        };
        
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
        
        
        
        
    });
