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
        var pageSize = 8;
        var pageNum = 1;
        var data = {
            lotteryID: '2',
            pageSize: pageSize,
            pageNum: pageNum
        };
    
        if (userInfo.data) {
            /*$http ({
             method: "POST",
             url: ipUrl + '/lottery/getHistoryList?token=' + userInfo.data.token,
             params: data,
             headers: {
             "Content-Type": "application/json"
             }
             })*/
            $scope.blueBallData = [];
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    $scope.bitLotto = response.data;
                
                }, function (response) {
                    console.log ("获取列表失败");
                });
        }
        else {
            $ionicLoading.hide ();
            $rootScope.errorInfo ();
        }
        
        $scope.toArray = function (string2, num) {
            var array1 = string2.split ("*");
            var arrFront = array1[0].split (",");
            var arrBehind = array1[1].split (",");
            var array = arrFront.concat (arrBehind);
            //console.log(array);
            return array[num];
        };

    });
