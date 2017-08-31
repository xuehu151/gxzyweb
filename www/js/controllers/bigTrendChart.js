/**
 * Created by admin on 2017/6/27.
 */
//大乐透走势图
angular.module ('starter.bigTrendChart', ['starter.services'])
    
    .controller ('bigTrendChart', function ($scope, $ionicScrollDelegate, $util, $ionicLoading, $rootScope, historyPastService) {
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
        
        $scope.formerAreaOne = [];
        $scope.formerAreaTwo = [];
        $scope.formerAreaThree = [];
        $scope.backArea = [];
        $scope.drawCount = [];
        for (var i = 1; i < 13; i++) {
            $scope.formerAreaOne.push (i);
        }
        for (var i = 13; i < 25; i++) {
            $scope.formerAreaTwo.push (i);
        }
        for (var i = 25; i < 36; i++) {
            $scope.formerAreaThree.push (i);
        }
        for (var i = 1; i < 13; i++) {
            $scope.backArea.push (i);
        }
        for (var j = 1; j < 8; j++) {
            $scope.drawCount.push (j);
        }
        
        $ionicLoading.show ({
            template : 'Loading...'
        });
        //获取历史投注记录............
        var userInfo = $util.getUserInfo ();
        var pageSize = 25;
        var pageNum = 1;
        $scope.hasMore = true;
        $scope.bitLotto = [];
        $scope.loadMore = function () {
            data = {
                lotteryID : '2',
                pageSize : pageSize,
                pageNum : pageNum,
                sort : 0
            };
            loadajax ();
        };
        
        function loadajax () {
            
            //$scope.blueBallData = [];
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    if (response.data) {
                        if (response.data.length != 0) {
                            $scope.bitLotto = $scope.bitLotto.concat (response.data);
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
            $scope.bitLotto = [];
            $scope.loadMore ();
        };
        
        $scope.toArray = function (string2, num) {
            var array1 = string2.split ("*");
            var arrFront = array1[0].split (",");
            var arrBehind = array1[1].split (",");
            var array = arrFront.concat (arrBehind);
            //console.log(array);
            return array[num];
        };
        
    });
