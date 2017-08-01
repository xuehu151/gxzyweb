/**
 * Created by admin on 2017/6/14.
 */

//扫码兑换首页
angular.module ('starter.scanCodeIndexCtrl', ['starter.services'])
    
    .controller ('scanCodeIndexCtrl', function ($scope, $state, getUser, $util, $ionicModal, $rootScope) {
        PayType = 0;
        $scope.goToExchange3D = function () {
            $state.go ('exchange-3');
        };
        $scope.goToExchange5D = function () {
            $state.go ('exchange-5');
        };
        $scope.goToExchangeBigLotto2 = function () {
            $state.go ('BigLotto-2', {
                'flag2': 1
            });
        };
    
        /*//更新待兑换
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        getUser.getInfo (url + "/service/customer/getVoucherList?token=" + token)
            .then (function (response) {
                console.info(response);
                $scope.needExchangeAmount.amount = response.data.length;
                console.log($scope.needExchangeAmount.amount);
            
                if($scope.needExchangeAmount.amount){
                    $rootScope.needExchangeItems = response.data;
                    $scope.modal2.show ();
                }
            
            }, function () {
                alert ('网络异常,未获取到用户信息')
            });
    
        //老用户获得彩票的mordal窗口配置
        $ionicModal.fromTemplateUrl ('templates/getOneBetModal.html', {
            scope: $scope,
            backdropClickToClose:true
        }).then (function (modal) {
            $scope.modal2 = modal;
        });
        $scope.openPop2 = function () {
            $scope.modal2.show ();
        };
        $scope.cancelPop2 = function () {
            $scope.modal2.hide ();
        };*/
        
    });
