/**
 * Created by admin on 2017/6/15.
 */
var url = "http://lottery.zhenlong.wang";
//完善个人资料
angular.module('starter.completeInfoCtrl', ['starter.services'])

    .controller('completeInfoCtrl', function($scope, $rootScope, $state, locals, postData, $ionicLoading,$ionicModal, $util,$timeout) {
        $scope.users = {
            // realName: '',
            // phone: '',
            idcard: '',
            wechat: '',
            bank: '',
            bankNo: ''
        };
        /**
         * 功能:把提交的值保存到localstorage
         *     1.先用对象$rootScope.addData存储localstorage
         *     2.再把ng-model值赋进来
         *     3.再把这个对象赋给localstorage
         */
        var userInfo = $util.getUserInfo();
        console.log(userInfo);
        $rootScope.addData = userInfo;
        //        console.log ($rootScope.addData);

        $scope.submitInfo = function() {
            $ionicLoading.show({
                hideOnStateChange: true
            });
            $rootScope.addData.data.user.idcard = $scope.users.idcard;
            $rootScope.addData.data.user.wechat = $scope.users.wechat;
            $rootScope.addData.data.user.bank = $scope.users.bank;
            $rootScope.addData.data.user.bankNo = $scope.users.bankNo;
            //            locals.setObject ($rootScope.user, $rootScope.addData);
            var datas = $util.setUserInfo($rootScope.addData);
            var userInfo = $util.getUserInfo();
            console.log(userInfo);
            /**
             * 功能:把提交的值上传到后台
             */

            postData.getInfo(url + "/service/customer/add", userInfo)
                .then(function(response) {
                    console.log(response);
                    if (response.error == '0') {
                        $state.go('completeInfoSucceed');
                    } else {
                        $scope.error = response.info;
                        $timeout(function() {
                            $scope.modalError.show();
                        }, 100);
                    };
                    $ionicLoading.hide();
                }, function(error) {
                    alert(error);
                    $ionicLoading.hide ();
                })
        }

        //错误码窗口配置
        $ionicModal.fromTemplateUrl('templates/errorPop.html', {
            scope: $scope,
            backdropClickToClose: true
        }).then(function(modal) {
            $scope.modalError = modal;
        });
        $scope.cancelPopError = function() {
            $scope.modalError.hide();
        };
    });
