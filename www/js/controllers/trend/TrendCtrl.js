/**
 * Created by admin on 2017/6/23.
 */
//开奖
angular.module ('starter.TrendCtrl', ['starter.services'])

    .controller ('TrendCtrl', function ($scope, $state, $ionicModal, $rootScope) {

        $state.go('tab.trend.bigTrendChart');
        $scope.isActive = true;

        /*$scope.tabNames = ['大乐透', '排列 3', '排列 5'];
        $scope.slectIndex = 0;
        $scope.activeSlide = function (index) {//点击时候触发
            $scope.slectIndex = index;
            $ionicSlideBoxDelegate.slide (index);
        };
        $scope.slideChanged = function (index) {//滑动时候触发
            $scope.slectIndex = index;
        };
        $scope.pages = ["templates/bigTrendChart.html", "templates/3DTrendChart.html", "templates/5DTrendChart.html"];*/

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

    });
