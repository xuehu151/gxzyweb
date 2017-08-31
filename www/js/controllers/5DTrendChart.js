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
        $ionicLoading.show ();
        $scope.dataArrange = [];
        $scope.drawCount = [];
        for (var i = 0; i < 10; i++) {
            $scope.dataArrange.push (i);
        }
        for (var j = 1; j <= 5; j++) {
            $scope.drawCount.push (j);
        }
        
        var userInfo = $util.getUserInfo ();
        var pageSize = 25;
        var pageNum = 1;
        $scope.hasMore = true;
        $scope.historyPast5 = [];
        $scope.loadMore = function () {
            data = {
                lotteryID : '40',
                pageSize : pageSize,
                pageNum : pageNum,
                sort : 0
            };
            loadajax ();
        };
        //console.log(data);
        function loadajax () {
            
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    console.log (response.data);
                    if (response.data) {
                        if (response.data.length != 0) {
                            $scope.historyPast5 = $scope.historyPast5.concat (response.data);
                            pageNum++;
                        }
                        else {
                            $scope.hasMore = false;
                            alert ('已经展示了全部开奖历史')
                        }
                        $scope.$broadcast ('scroll.refreshComplete');
                        $scope.$broadcast ('scroll.infiniteScrollComplete');
                    }
                    else {
                        $ionicLoading.hide ();
                        $rootScope.errorInfo ();
                    }
                }, function (response) {
                    $ionicLoading.hide ();
                    alert ("数据获取失败");
                });
            
        }
        
        $scope.doRefresh = function () {
            pageNum = 1;
            $scope.historyPast5 = [];
            $scope.loadMore ();
        };
        
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });
