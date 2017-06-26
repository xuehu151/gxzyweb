/**
 * Created by admin on 2017/6/23.
 */
//开奖
angular.module ('starter.TrendCtrl', ['starter.services'])
    
    .controller ('TrendCtrl', function ($scope, $ionicSlideBoxDelegate) {
        $scope.tabNames = ['大乐透', '排列 3', '排列 5'];
        $scope.slectIndex = 0;
        $scope.activeSlide = function (index) {//点击时候触发
            $scope.slectIndex = index;
            $ionicSlideBoxDelegate.slide (index);
        };
        $scope.slideChanged = function (index) {//滑动时候触发
            $scope.slectIndex = index;
        };
        $scope.pages = ["templates/bigTrendChart.html", "templates/3DTrendChart.html", "templates/5DTrendChart.html"];
        
    });
