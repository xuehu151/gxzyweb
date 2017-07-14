/**
 * Created by admin on 2017/6/14.
 */

//扫码兑换首页
angular.module ('starter.scanCodeIndexCtrl', ['starter.services'])
    
    .controller ('scanCodeIndexCtrl', function ($scope, $state) {
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
        
    });
