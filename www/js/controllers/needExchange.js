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
                console.log(leftTime);
                $scope.needExchanges[i].d = leftTime.d;
                $scope.needExchanges[i].h = leftTime.h;
                console.log($scope.needExchanges[i].d === 0)
                if ($scope.needExchanges[i].d === 0 && $scope.needExchanges[i].h === 0) {

                    $scope.needExchanges[i].class = 'grey'
                } else if ($scope.needExchanges[i].d || $scope.needExchanges[i].h) {
                    $scope.needExchanges[i].class = ''
                }
            } else {
                $scope.needExchanges[i].class = 'margin10'
            }
        }

        console.log($scope.needExchanges);
        if ($scope.needExchanges.length) {
            $scope.needExchangeAmount = $scope.needExchanges.length;
        } else {
            $scope.needExchangeAmount = 0;
        }

        console.log($scope.needExchangeAmount);
        $scope.toScanExchange = function($index, convert) {
            // $scope.needExchanges.splice($index, 1);
            $rootScope.needExchangeItems = $scope.needExchanges;
            $rootScope.nowVid = $scope.needExchanges[$index].vid;
            console.info($rootScope.nowVid);
            console.log($rootScope.needExchangeItems);

            $state.go('scanCodeIndex')
        };
    });
