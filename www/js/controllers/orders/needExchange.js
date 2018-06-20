//var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名

//待兑换
angular.module('starter.needExchangeCtrl', [])
    .controller('needExchangeCtrl', function($scope, $state, $rootScope, timeRemain) {
        $scope.needExchanges = $rootScope.needExchangeItems;
        $scope.lessThen3 = true; //小于3天显示小时
        $scope.whetherLongBi = true; //龙币显示有效期
        // $scope.class = {blank:true,margin10:false,grey:false};
        for (var i = 0; i < $scope.needExchanges.length; i++) {
            if ($scope.needExchanges[i].endDate) {
                var leftTime = timeRemain.stillHave($scope.needExchanges[i].endDate);
                $scope.needExchanges[i].d = leftTime.d;
                $scope.needExchanges[i].h = leftTime.h;
                if ($scope.needExchanges[i].d === 0 && $scope.needExchanges[i].h === 0) {

                    $scope.needExchanges[i].class = 'grey'
                } else if ($scope.needExchanges[i].d || $scope.needExchanges[i].h) {
                    $scope.needExchanges[i].class = ''
                }
            } else {
                $scope.needExchanges[i].class = 'margin10'
            }
        }

        console.info('++++++++',$scope.needExchanges);
        if ($scope.needExchanges.length) {
            $scope.needExchangeAmount = $scope.needExchanges.length;
        } else {
            $scope.needExchangeAmount = 0;
        }

        $scope.toScanExchange = function($index, money) {
            // $scope.needExchanges.splice($index, 1);
            $rootScope.popup = '';
            $rootScope.needExchangeItems = $scope.needExchanges;
            $rootScope.nowVid = $scope.needExchanges[$index].vid;
            $rootScope.giveMoney = money;

            $state.go('scanCodeIndex')
        };
    });
