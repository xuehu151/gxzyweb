/**
 * Created by admin on 2017/6/14.
 */
var url = "http://lottery.zhenlong.wang";

//扫码兑换首页
angular.module ('starter.scanCodeIndexCtrl', ['starter.services'])
    
    .controller ('scanCodeIndexCtrl', function ($scope, $state, getUser, $util, $ionicModal, $rootScope, initDataService, $ionicLoading, $timeout) {
        PayType = 0;
        
        var data = {
            token : sign
        };
        initDataService.initData (data)
            .then (function (response) {
                $ionicLoading.hide ();
                
                /* 获取初始化数据 */
                var datas = $util.setUserInfo (response);
                var userInfo = $util.getUserInfo ();
                console.log (userInfo);
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
        
        //更新待兑换
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        $scope.needExchangeAmount = { amount : 0 };
        console.info (userInfo);
        getUser.getInfo (url + "/service/customer/getVoucherList?token=" + token + '&pageNum=1&pageSize=8')
            .then (function (response) {
                console.log (response);
                if (response.error == '0') {
                    $scope.needExchangeAmount.amount = response.data.length;
                    console.log ($scope.needExchangeAmount.amount);
                    $rootScope.needExchangeItems = response.data;
                    $scope.modal2.show ();
                }
                else {
                    $scope.error = response.info;
                    $timeout (function () {
                        $scope.modalError.show ();
                    }, 300);
                }
                
            }, function (error) {
                alert (error);
                $ionicLoading.hide ();
            });
        
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
