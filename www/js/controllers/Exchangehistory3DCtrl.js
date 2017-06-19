/**
 * Created by admin on 2017/6/14.
 */
angular.module ('starter.Exchangehistory3DCtrl', ['starter.services'])

//兑换 排列 3 网期开奖详情
    .controller ('Exchangehistory3DCtrl', function ($scope, $http, $interval, $ionicPopup, $ionicLoading, $util, historyPastService) {
        $ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        var data = {
            lotteryID: '54',
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
                $scope.historyPast3 = response.data;
                
                if (response.data.length === 0) {
                    var alertPopup = $ionicPopup.alert ({
                        title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                        template: '<div class="alert-left">' + '<p style="text-align: center">' + response.data.info + '</p>' + '</div>',
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
            var array = string2.split (",");
            return array[num];
        };
    });
