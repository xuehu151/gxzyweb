/**
 * Created by admin on 2017/6/27.
 */
//排列3 走势图
angular.module ('starter.3DTrendChart', [])
    
    .controller ('3DTrendChart', function ($scope, $ionicScrollDelegate, $ionicLoading, $rootScope, $util, historyPastService) {
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
        
        $scope.dataArrange = [];
        $scope.drawCount = [];
        for (var i = 0; i < 10; i++) {
            $scope.dataArrange.push (i);
        }
        for (var j = 1; j < 4; j++) {
            $scope.drawCount.push (j);
        }
        
        $ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        var pageSize = 25;
        var pageNum = 1;
        $scope.hasMore = true;
        $scope.historyPast3 = [];
        $scope.loadMore = function () {
            data = {
                lotteryID : '31',
                pageSize : pageSize,
                pageNum : pageNum,
                sort : 0
            };
            loadajax ();
        };
        
        function loadajax () {
            
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    if (response.data) {
                        $ionicLoading.hide ();
                        if (response.data.length != 0) {
                            $scope.historyPast3 = $scope.historyPast3.concat (response.data);
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
                }, function (error) {
                    $ionicLoading.hide ();
                    alert ("数据获取失败");
                });
            
        }
        
        $scope.doRefresh = function () {
            pageNum = 1;
            $scope.historyPast3 = [];
            $scope.loadMore ();
        };
        
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });
