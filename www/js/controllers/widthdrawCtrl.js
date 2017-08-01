/**
 * Created by admin on 2017/6/15.
 */
var url = "http://121.42.253.149:18820";
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
        $scope.widthdrawMoney = {money:''}; //提现金额
        $scope.whetherShow1 = true; //控制展示可提现余额
        $scope.whetherShow2 = false; //控制提现提交按钮disable
        function change() {
            // body...
        }
        $scope.whetherOK = function () {
            // console.log($scope.widthdrawMoney.money)
            if ($scope.widthdrawMoney.money > $scope.widthdrawAble) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = true;
            }
            //小于10元扣除1元手续费
             else if (($scope.widthdrawMoney.money<=10 && $scope.widthdrawMoney.money>1) &&($scope.widthdrawMoney.money <= $scope.widthdrawAble))
             {
                $scope.cantWidthdraw = '需扣除1元手续费';
                $scope.whetherShow1 = false;
                $scope.whetherShow2 = false;
             }
             //小于1 disable
             else if ($scope.widthdrawMoney.money<=1)
             {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
             }
             else if (($scope.widthdrawAble<=200 && $scope.widthdrawAble>10) &&  $scope.widthdrawMoney.money!=$scope.widthdrawAble )
             {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = true;
             }

            else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow1 = true;
                $scope.whetherShow2 = false;
            };
            // $scope.widthdrawMoney.money = widthdrawMoney;
        };

        

        //提现所有可用余额
        $scope.widthdrawAll = function () {
            $scope.widthdrawMoney.money = $scope.widthdrawAble;
            // console.log($scope.widthdrawMoney.money);
            $scope.whetherOK();
        };

        $scope.confirmWidthdraw = function (widthdrawMoney) {
            
            $ionicLoading.show ({
                hideOnStateChange: true
            });
            var token = userInfo.data.token;
           // console.log (token);
           // console.log ($rootScope.channel);
           // console.log ($scope.widthdrawMoney);
           
            getUser.getInfo (url + '/service/cash/add' + '?channel=' + $rootScope.channel + '&money=' + $scope.widthdrawMoney.money + '&token=' + token)
                .then (function (data) {
                    console.log(data);
                    $rootScope.WidthdrawStatus = data.error;    //保存返回的状态,用于决定widthdrawResult的页面
                    $ionicLoading.hide ();
                    $state.go ('widthdrawResult')
                }, function () {
                    alert ('网络异常,未能提交提现')
                })
        };
    });

