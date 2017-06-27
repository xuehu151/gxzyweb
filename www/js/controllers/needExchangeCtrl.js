/**
 * Created by admin on 2017/6/15.
 */
var url = "http://114.215.70.179:8088";
//完善个人资料
angular.module ('starter.needExchangeCtrl', ['starter.services'])
    
    .controller ('needExchangeCtrl', function ($scope, $rootScope, $state) {
        $scope.needExchanges = $rootScope.needExchangeItems;
        console.log ($scope.needExchanges);
        $scope.toScanExchange = function () {
            $state.go ('scanCodeIndex')
        }
    });
