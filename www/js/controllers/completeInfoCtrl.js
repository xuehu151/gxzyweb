/**
 * Created by admin on 2017/6/15.
 */
var url = "http://114.215.70.179:8088";
//完善个人资料
angular.module ('starter.completeInfoCtrl', ['starter.services'])
    
    .controller ('completeInfoCtrl', function ($scope, $rootScope, $state, locals, postData, $ionicLoading, $util) {
        $scope.users = {
            /* realName: '',
             phone: '',
             idcard: '',*/
            wechat: '',
            alipay: '',
            bankNo: ''
        };
        /**
         * 功能:把提交的值保存到localstorage
         *     1.先用对象$rootScope.addData存储localstorage
         *     2.再把ng-model值赋进来
         *     3.再把这个对象赋给localstorage
         */
        var userInfo = $util.getUserInfo ();
        $rootScope.addData = userInfo;
//        console.log ($rootScope.addData);
        
        $scope.submitInfo = function () {
            $ionicLoading.show ({
                hideOnStateChange: true
            });
            // $rootScope.addData.user.realName = $scope.users.realName;
            // $rootScope.addData.user.phone = $scope.users.phone;
            // $rootScope.addData.user.idcard = $scope.users.idcard;
            $rootScope.addData.data.user.wechat = $scope.users.wechat;
            $rootScope.addData.data.user.alipay = $scope.users.alipay;
            $rootScope.addData.data.user.bankNo = $scope.users.bankNo;
//            locals.setObject ($rootScope.user, $rootScope.addData);
            var datas = $util.setUserInfo ($rootScope.addData);
            var userInfo = $util.getUserInfo ();
            console.log(userInfo);
            /**
             * 功能:把提交的值上传到后台
             */
            postData.getInfo (url + "/service/customer/add", userInfo)
                .then (function (data) {
                    console.log(data);
                    $ionicLoading.hide ();
                    $state.go ('completeInfoSucceed');
                }, function () {
                    alert ('网络异常,未能更新您的资料')
                })
        }
    });
