/**
 * Created by admin on 2017/6/15.
 */
var url = "http://114.215.70.179:8088";
//提现页面
angular.module ('starter.widthdrawCtrl', ['starter.services'])
    
    .controller ('widthdrawCtrl', function ($scope, $state, $rootScope, getUser, locals, postData, $ionicLoading, $util) {
        $ionicLoading.show ({
            // hideOnStateChange: true
        });
//        var widthdrawLocals = locals.getObject ($rootScope.user);
//        var token = widthdrawLocals.token;
        var userInfo = $util.getUserInfo ();
        var token = userInfo.data.token;
        
        getUser.getInfo (url + "/service/customer/getUser?token=" + token)
            .then (function (response) {
                $scope.widthdrawAble = response.data.money; //可用余额
                $ionicLoading.hide ();
            }, function () {
                alert ('网络异常,未能获取到您的可用余额');
            });
        $scope.widthdrawMoney = ''; //提现金额
        $scope.whetherShow = true; //控制提现提交按钮disable
        $scope.whetherOK = function (widthdrawMoney) {
            if (widthdrawMoney > $scope.widthdrawAble) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow = false;
            }
            else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow = true;
            }
            $scope.widthdrawMoney = widthdrawMoney;
        };
        //提现所有可用余额
        $scope.widthdrawAll = function () {
            $scope.widthdrawMoney = $scope.widthdrawAble;
        };
        $scope.confirmWidthdraw = function (widthdrawMoney) {
            /*//小于10元扣除1元手续费
             if ($scope.widthdrawMoney<=10 && $scope.widthdrawMoney>1)
             {
             widthdrawLocals.money--;
             console.log(widthdrawLocals)
             };*/
            $ionicLoading.show ({
                hideOnStateChange: true
            });
            var token = userInfo.data.token;
//            console.log (token);
//            console.log ($scope.widthdrawMoney);
            getUser.getInfo (url + '/service/cash/add' + '?channel=' + $rootScope.channel + '&money=' + $scope.widthdrawMoney + '&token=' + token)
                .then (function (data) {
                    $rootScope.WidthdrawStatus = data.error;    //保存返回的状态,用于决定widthdrawResult的页面
                    $ionicLoading.hide ();
                    $state.go ('widthdrawResult')
                }, function () {
                    alert ('网络异常,未能提交提现')
                })
        };
    });

