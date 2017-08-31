/**
 * Created by admin on 2017/6/27.
 */
//排列5 走势图
angular.module ('starter.5DTrendChart', ['starter.services'])
    
    .controller ('5DTrendChart', function ($scope, $ionicScrollDelegate, $ionicLoading, $rootScope, $util, historyPastService) {
        $scope.h = Math.min (document.documentElement.clientHeight, window.innerHeight) - 44 - 88;
        $scope.scrollRightHorizon = function () {
            var rightHandle = $ionicScrollDelegate.$getByHandle ("rightContainerHandle");
            var headHandle = $ionicScrollDelegate.$getByHandle ("headContainerHandle");
            var leftHandle = $ionicScrollDelegate.$getByHandle ("leftContainerHandle");
            headHandle.scrollTo (rightHandle.getScrollPosition ().left, 0, false);
            leftHandle.scrollTo (0, rightHandle.getScrollPosition ().top, false);
        };
        $scope.noScroll = function () {
            var headHandle = $ionicScrollDelegate.$getByHandle ("headContainerHandle");
            headHandle.freezeScroll (true);
            var leftHandle = $ionicScrollDelegate.$getByHandle ("leftContainerHandle");
            leftHandle.freezeScroll (true);
        };
        $ionicLoading.show();
        $scope.dataArrange = [];
        $scope.drawCount = [];
        for (var i = 0; i < 10; i++) {
            $scope.dataArrange.push (i);
        }
        for (var j = 1; j <= 5; j++) {
            $scope.drawCount.push (j);
        }
    
        var userInfo = $util.getUserInfo ();
        var pageSize = 30;
        var pageNum = 1;
        var data = {
            lotteryID: '40',
            pageSize: pageSize,
            pageNum: pageNum
        };
        console.log(data);
        if(userInfo.data){
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    $scope.historyPast5 = response.data;
            
                    console.log (response.data);
                }, function (response) {
                    $ionicLoading.hide ();
                    alert ("数据获取失败");
                });
        }else {
            $ionicLoading.hide ();
            $rootScope.errorInfo ();
        }
        
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });
