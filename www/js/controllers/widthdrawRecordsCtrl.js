/**
 * Created by admin on 2017/6/15.
 */
var url = "http://lottery.zhenlong.wang";
//提现明细
angular.module ('starter.widthdrawRecordsCtrl', ['starter.services'])

    .controller ('widthdrawRecordsCtrl', function ($scope, $rootScope, getUser, locals, postData, $ionicLoading, $util) {
        $ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        getUser.getInfo (url + '/service/cash/getList?token=' + token)
            .then (function (response) {
                $ionicLoading.hide ();
                console.log (response);
                $scope.widthdrawItems = response.data;
            }, function () {
                alert ('网络异常,未能获取到提现明细')
            })
    });
