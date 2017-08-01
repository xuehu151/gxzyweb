/**
 * Created by admin on 2017/6/15.
 */
var url = "http://121.42.253.149:18820";
//奖金纪录页面
angular.module ('starter.prizeRecordsCtrl', ['starter.services'])
    
    .controller ('prizeRecordsCtrl', function ($scope, $rootScope, getUser, locals, $ionicLoading, $util) {
        var userInfo = $util.getUserInfo();
        var token = userInfo.data.token;
        $ionicLoading.show ({
            // hideOnStateChange: true
        });
//        console.log(token);
        getUser.getInfo (url + '/service/bonus/getList?token=' + token)
            .then (function (response) {
                $scope.prizeItems = response.data;
                console.log($scope.prizeItems);
                for (var i = 0; i < $scope.prizeItems.length; i++) {
                    if ($scope.prizeItems[i].type == 1) {
                        $scope.prizeItems[i].exchangeType = '收入';
                        $scope.prizeItems[i].isIncome = true;
                        $scope.prizeItems[i].exchangeClass = '彩票奖金';
                    }
                    else if ($scope.prizeItems[i].type == 2) {
                        $scope.prizeItems[i].exchangeType = '支出';
                        $scope.prizeItems[i].isIncome = false;
                        $scope.prizeItems[i].exchangeClass = '奖金兑换';
                    }
                    else {
                        $scope.prizeItems[i].exchangeType = '收入';
                        $scope.prizeItems[i].isIncome = true;
                        $scope.prizeItems[i].exchangeClass = '出票失败退款';
                    }
                }
                $ionicLoading.hide ();
            }, function () {
                alert ('网络异常,未能获取到奖金纪录');
            })
    });
