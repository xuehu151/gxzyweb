/**
 * Created by admin on 2017/6/23.
 */
//开奖
angular.module ('starter.DrawCtrl', ['starter.services'])

    .controller ('DrawCtrl', function ($scope, $state, $rootScope, $ionicModal, getWareIssueService, $util) {
        $state.go('tab.draw.bigLottoHistoryDetails');
        $scope.slectIndex = 0;
        $scope.activeSlide = function (index) {//点击时候触发
            $scope.slectIndex = index;
        };
        $scope.h80 = true;
        $scope.marginNotice_10 = true;

        //错误码窗口配置
        $rootScope.errorInfo = function () {
            $ionicModal.fromTemplateUrl ('templates/mistakeBox/errorInfo.html', {
                scope : $scope,
                backdropClickToClose : true
            }).then (function (modal) {
                $scope.errorInfo = 'token过期';
                $scope.modalError = modal;
                modal.show ();
            });
            $scope.cancelPopError = function () {
                $scope.modalError.hide ();
            };
        };


    })

    .controller('tabsCtrl', function ($scope,$rootScope) {

    });

