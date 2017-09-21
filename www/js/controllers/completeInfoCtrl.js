/**
 * Created by admin on 2017/6/15.
 */
//var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名

//完善个人资料
angular.module('starter.completeInfoCtrl', ['starter.services'])

    .controller('completeInfoCtrl', function($scope, $rootScope, $state, locals, postData, $ionicLoading, $ionicModal, $util, $timeout, $interval) {
        var userInfo = $scope.userInfo = $util.getUserInfo();
        $rootScope.addData = userInfo;
        console.log(userInfo);

        $scope.users = {
            // realName: '',
            // phone: '',
            name:userInfo.data.user.realName,
            idcard: '',
            wechat: '',
            bank: '',
            bankNo: void 0
        };
        /**
         * 功能:把提交的值保存到localstorage
         *     1.先用对象$rootScope.addData存储localstorage
         *     2.再把ng-model值赋进来
         *     3.再把这个对象赋给localstorage
         */


        //        console.log ($rootScope.addData);

        $scope.submitInfo = function() {
            $ionicLoading.show({
                hideOnStateChange: true
            });
            $rootScope.addData.data.user.name = $scope.users.name;
            $rootScope.addData.data.user.idcard = $scope.users.idcard;
            $rootScope.addData.data.user.wechat = $scope.users.wechat;
            $rootScope.addData.data.user.bank = $scope.users.bank;
            $rootScope.addData.data.user.bankNo = $scope.users.bankNo;
            //            locals.setObject ($rootScope.user, $rootScope.addData);

            /**
             * 功能:把提交的值上传到后台
             */

            postData.getInfo(url + "/service/customer/add", $rootScope.addData)
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
                    $ionicLoading.hide();
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


        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(window).on('resize', function () {
            var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            if (clientHeight > nowClientHeight) {
                //键盘弹出的事件处理
            }
            else {
                $interval.cancel(scrollTimer);
                $('#scrollBug').css('height',clientHeight);

            }
        });

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
        var weChatInput = document.getElementsById('wechat');*/
        var bankInput = document.getElementById('bank');
        var bankNoInput = document.getElementById('bankNo');

        /*idcardInput.onfocus = function() {
          scrollInput(idcardInput);
        }
        weChatInput.onfocus = function() {
          scrollInput(idcardInput);
        }*/
        bankInput.onfocus = function() {
          scrollInput(bankInput);
        }
        bankInput.onblur = function() {
            $interval.cancel(scrollTimer)
        }
        bankNoInput.onfocus = function() {
            scrollInput(bankNoInput);
        }
        bankNoInput.onblur = function() {
            $interval.cancel(scrollTimer)
        }
    });
