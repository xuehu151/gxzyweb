/**
 * Created by admin on 2017/6/23.
 */
//开奖
angular.module ('starter.DrawCtrl', ['starter.services'])
    
    .controller ('DrawCtrl', function ($scope, $rootScope, $ionicModal, $ionicSlideBoxDelegate) {
        /*$scope.tabNames = ['大乐透', '排列 3', '排列 5'];
         $scope.slectIndex = 0;
         $scope.activeSlide = function (index) {//点击时候触发
         $scope.slectIndex = index;
         $ionicSlideBoxDelegate.slide (index);
         };
         $scope.slideChanged = function (index) {//滑动时候触发
         $scope.slectIndex = index;
         };
         $scope.pages = ["templates/bigLottoHistoryDetails.html", "templates/exchangehistory3D.html", "templates/exchangehistory5D.html"];*/
        //错误码窗口配置
        $rootScope.errorInfo = function () {
            $ionicModal.fromTemplateUrl ('templates/errorInfo.html', {
                scope : $scope,
                backdropClickToClose : true
            }).then (function (modal) {
                $scope.errorInfo = 'token获取失败';
                $scope.modalError = modal;
                modal.show ();
            });
            $scope.cancelPopError = function () {
                $scope.modalError.hide ();
            };
        };
        
    });
