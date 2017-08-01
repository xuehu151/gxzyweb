var url = "http://121.42.253.149:18820";

//待兑换
angular.module ('starter.controllers', [])

    .controller ('needExchangeCtrl', function ($scope, $state, $rootScope) {
        $scope.needExchanges = $rootScope.needExchangeItems;
    
        $scope.toScanExchange = function ($index,convert) {
            $scope.needExchanges.splice($index, 1);
            $rootScope.needExchangeItems = $scope.needExchanges;
            
            console.log($rootScope.needExchangeItems);
            
            $state.go ('scanCodeIndex')
        };
    });
