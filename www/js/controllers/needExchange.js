var url = "http://lottery.zhenlong.wang";

//待兑换
angular.module('starter.needExchangeCtrl', [])

    .controller('needExchangeCtrl', function($scope, $state, $rootScope) {
        $scope.needExchanges = $rootScope.needExchangeItems;
        $scope.lessThen3 = true;            //小于3天显示小时
        $scope.whetherLongBi = true;      //龙币显示有效期
        console.log($scope.needExchanges);
        if ($scope.needExchanges.length) {
            $scope.needExchangeAmount = $scope.needExchanges.length;
        } else {
            $scope.needExchangeAmount = 0;
        }

        console.log($scope.needExchangeAmount);
        $scope.toScanExchange = function($index, convert) {
            $scope.needExchanges.splice($index, 1);
            $rootScope.needExchangeItems = $scope.needExchanges;

            console.log($rootScope.needExchangeItems);

            $state.go('scanCodeIndex')
        };
    });
