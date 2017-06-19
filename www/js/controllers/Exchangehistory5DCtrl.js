/**
 * Created by admin on 2017/6/14.
 */
//兑换 排列 5 往期开奖详情


angular.module ('starter.Exchangehistory5DCtrl', ['starter.services'])
    
    .controller ('Exchangehistory5DCtrl', function ($scope, $http, $filter, $ionicLoading, $util, historyPastService) {
        $ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        var data = {
            lotteryID: '53',
            pageSize: '8',
            pageNum: '1'
        };
        /*$http ({
            method: "POST",
            url: ipUrl + '/lottery/getHistoryList?token=' + userInfo.data.token,
            params: data,
            headers: {
                "Content-Type": "application/json"
            }
        })*/
        historyPastService.PastLottery (data, userInfo.data.token)
            .then (function (response) {
                $ionicLoading.hide ();
                $scope.historyPast5 = response.data;
                console.log (response.data);
            }, function (response) {
                console.log ("获取列表失败");
            });
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });

