/**
 * Created by admin on 2017/6/15.
 */
var url = "http://121.42.253.149:18820";
//提现明细
angular.module ('starter.selfInfoCtrl', ['starter.services'])
    
    .controller ('selfInfoCtrl', function ($scope, $rootScope, getUser, locals, postData, $ionicLoading, $util) {
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        console.log(userInfo);
        $scope.userInfo=userInfo.data.user;
        
    });
