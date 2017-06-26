var url = "http://114.215.70.179:8088";

//待兑换
angular.module ('starter.controllers', [])

    .controller ('needExchangeCtrl', function ($scope, $state, $rootScope) {
        $scope.needExchanges = $rootScope.needExchangeItems;
    
        $scope.toScanExchange = function ($index) {
            $scope.needExchanges.splice($index, 1);
            $rootScope.needExchangeItems = $scope.needExchanges;
            
            console.log($rootScope.needExchangeItems);
            
            $state.go ('scanCodeIndex')
        };
    });
