/**
 * Created by admin on 2017/6/14.
 */
//大乐透往期详情
angular.module ('starter.bigLottoHistoryDetailsCtrl', ['starter.services'])

    .controller ('bigLottoHistoryDetailsCtrl', function ($scope, $http, $ionicLoading, $ionicPopup, $util, historyPastService) {
        $ionicLoading.show ();
        //获取历史投注记录............
        var userInfo = $util.getUserInfo ();
        var pageSize = 8;
        var pageNum = 1;
        var data = {
            lotteryID: '51',
            pageSize: pageSize,
            pageNum: pageNum
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
                $scope.bitLotto = response.data;
                
                if ($scope.bitLotto.length === 0) {
                    var alertPopup = $ionicPopup.alert ({
                        title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                        template: '<div class="alert-left"><p style="text-align: center">暂无数据</p></div>',
                        okText: '确 定',
                        okType: 'button-light'
                    })
                        .then (function () {
                            ///////
                        });
                }
                console.log (response);
            }, function (response) {
                console.log ("获取列表失败");
            });
        $scope.toArray = function (string2, num) {
            var array1 = string2.split ("-");
            var arrFront = array1[0].split (",");
            var arrBehind = array1[1].split (",");
            var array = arrFront.concat (arrBehind);
            //console.log(array);
            return array[num];
        };
    });
