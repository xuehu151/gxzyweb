/**
 * Created by admin on 2017/6/15.
 */
var url = "http://121.42.253.149:18820";
//提现结果页面
angular.module ('starter.widthdrawResultCtrl', ['starter.services'])

    .controller ('widthdrawResultCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.whetherWidthdrawSuc = $rootScope.WidthdrawStatus == 0 ? true : false; //决定展示的图片
       /* $scope.widthdrawInfo = {
            success: '提现成功',
            successInfo: '资金预计2小时内到账',
            fail: '申请审核未成功',
            failInfo: '别担心，说不定再试一次就成功了'
        };*/
    }]);
