/**
 * Created by admin on 2017/6/14.
 */
angular.module ('starter.Exchangehistory3DCtrl', ['starter.services'])

//兑换 排列 3 网期开奖详情
    .controller ('Exchangehistory3DCtrl', function ($scope, $http, $interval, $ionicPopup, $ionicLoading, $rootScope, $util, historyPastService, $filter) {
        var userInfo = $util.getUserInfo ();
        var pageSize = 8;
        var pageNum = 1;
        /*
         * 上拉加载，分批加载服务端剩余的数据
         */
        // loadajax ();
        $ionicLoading.show ();
        $scope.hasMore = true;
        $scope.historyPast3 = [];
        $scope.loadMore = function () {
            data = {
                lotteryID : '31',
                pageSize : pageSize,
                pageNum : pageNum,
                sort : 1
            };
            loadajax ();
        };
        
        function loadajax () {
            console.log (data);
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    console.log (response);
                    if (response.data) {
                        if (response.data.length != 0) {
                            $scope.historyPast3 = $scope.historyPast3.concat (response.data);
                            for (var i = 0; i < $scope.historyPast3.length; i++) {
                                var createDate = $scope.historyPast3[i].createDate;
                                
                                var colon_createDate = createDate.split (':')[0];
                                var blank_createDate = colon_createDate.split (' ')[0];
                                var _createDate = blank_createDate.split ('-');
                                $scope.createDate = _createDate.splice (-2, 4).join ('-');
                                
                                $scope.historyPast3[i].createDate = $scope.createDate;
                                $scope.historyPast3[i].getDayDate = getWeekByDay (blank_createDate);
                            }
                            
                            //根据日期 得到是星期几
                            function getWeekByDay (blank_createDate) { //dayValue=“2014-01-01”
                                var day = new Date (Date.parse (blank_createDate)); //将日期值格式化
                                var today = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; //创建星期数组
                                return today[day.getDay ()];  //返一个星期中的某一天，其中0为星期日
                            }
                            
                            if ($scope.historyPast3.length === 0) {
                                var alertPopup = $ionicPopup.alert ({
                                    title : '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                                    template : '<div class="alert-left"><p style="text-align: center">暂无数据</p></div>',
                                    okText : '确 定',
                                    okType : 'button-light'
                                })
                                    .then (function () {
                                        ///////
                                    });
                            }
                            pageNum++;
                        }
                        else {
                            $scope.hasMore = false;
                            alert ('已经展示了全部开奖历史')
                        }
                        $scope.$broadcast ('scroll.refreshComplete');
                        $scope.$broadcast ('scroll.infiniteScrollComplete');
                    }
                    else {
                        $ionicLoading.hide ();
                        $rootScope.errorInfo ();
                    }
                }, function (response) {
                    $ionicLoading.hide ();
                    alert ("获取列表失败");
                });
        }
        
        $scope.doRefresh = function () {
            pageNum = 1;
            $scope.historyPast3 = [];
            $scope.loadMore ();
        };
        
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });
