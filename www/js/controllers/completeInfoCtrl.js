/**
 * Created by admin on 2017/6/15.
 */
var url = "http://lottery.zhenlong.wang";
//完善个人资料
angular.module('starter.completeInfoCtrl', ['starter.services'])

    .controller('completeInfoCtrl', function($scope, $rootScope, $state, locals, postData, $ionicLoading,$ionicModal, $util,$timeout,$interval) {
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
        var userInfo = $scope.userInfo = $util.getUserInfo();
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

            console.log(userInfo);
            /**
             * 功能:把提交的值上传到后台
             */

            postData.getInfo(url + "/service/customer/add", userInfo)
                .then(function(response) {
                    console.log(response);
                    if (response.error == '0') {
                        $util.setUserInfo($rootScope.addData);
                        $state.go('completeInfoSucceed');
                    } else {
                        $scope.error = response.info;
                        $timeout(function() {
                            $scope.modalError.show();
                        }, 100);
                    };
                    $ionicLoading.hide();
                }, function(error) {
                    alert('您的网络异常,未能成功完善您的信息');
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

        var scrollTimer = null; //控制延时0.6s后scrollIntoViewIfNeeded
        /**
         * [输入时调整视图位置,使键盘不遮挡input框]
         * @param  {[object]} obj [input框元素]
         * @return {[type]}     [description]
         */
        function scrollInput(obj) {
          scrollTimer = $interval(function() {
            obj.scrollIntoViewIfNeeded(true);
          }, 300)
        }


        /*var idcardInput = document.getElementsById('idCard');
        var weChatInput = document.getElementsById('wechat');
        var bankInput = document.getElementById('bank');*/
        var bankNoInput = document.getElementById('bankNo');


        /*idcardInput.onfocus = function() {
          scrollInput(idcardInput);
        }
        weChatInput.onfocus = function() {
          scrollInput(idcardInput);
        }*/
        /*bankInput.onfocus = function() {
          scrollInput(bankInput);
        }*/
        bankNoInput.onfocus = function() {
          scrollInput(bankNoInput);
        }
        bankNoInput.onblur = function() {
          $interval.cancel(scrollTimer)
        }
    });
