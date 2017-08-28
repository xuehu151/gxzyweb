/**
 * Created by admin on 2017/6/14.
 */
//兑换 排列 5 往期开奖详情
angular.module ('starter.Exchangehistory5DCtrl', ['starter.services'])
    
    .controller ('Exchangehistory5DCtrl', function ($scope, $http, $filter, $ionicLoading, $ionicPopup, $rootScope, $util, historyPastService) {
        $ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        var pageSize = 8;
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
    
                    for (var i = 0; i < $scope.historyPast5.length; i++) {
                        var createDate = $scope.historyPast5[i].createDate;
        
                        var colon_createDate = createDate.split (':')[0];
                        var blank_createDate = colon_createDate.split (' ')[0];
                        var _createDate = blank_createDate.split ('-');
                        $scope.createDate = _createDate.splice (-2, 4).join ('-');
        
                        $scope.historyPast5[i].createDate = $scope.createDate;
                    }
                    
                    if ($scope.historyPast5.length === 0) {
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
                    console.log (response.data);
                }, function (response) {
                    alert ("获取列表失败");
                });
        }else {
            $ionicLoading.hide ();
            $rootScope.errorInfo();
        }
        
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });

