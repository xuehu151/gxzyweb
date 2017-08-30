/**
 * Created by admin on 2017/6/14.
 */
angular.module ('starter.Exchangehistory3DCtrl', ['starter.services'])

//兑换 排列 3 网期开奖详情
    .controller ('Exchangehistory3DCtrl', function ($scope, $http, $interval, $ionicPopup, $ionicLoading, $rootScope, $util, historyPastService, $filter) {
        $ionicLoading.show ();
        var userInfo = $util.getUserInfo ();
        var pageSize = 12;
        var pageNum = 1;
        var data = {

        };
        /*
         * 上拉加载，分批加载服务端剩余的数据
         */
        // loadajax ();
        $scope.items = [];
        $scope.hasMore = true;
        $scope.loadMore = function () {
            data = {
            lotteryID : '31',
            pageSize : pageSize,
            pageNum : pageNum
        };
            loadajax ();
        };
        $scope.historyPast3 =[];

        function loadajax () {
            console.log(data)
            if (userInfo.data) {
                historyPastService.PastLottery (data, userInfo.data.token)
                    .then (function (response) {
                        console.log(response)

//                        $scope.$broadcast ('scroll.refreshComplete');
//                        $scope.$broadcast ('scroll.infiniteScrollComplete');
                      /*  if (response.data.length <= data.pageNum * data.pageSize) {
                            $scope.hasMore = false;      //这里判断是否还能获取到数据，如果没有获取数据，则不再触发加载事件
                            return;
                        }else {
                            $scope.hasMore = true;
                            return;
                        }

                        if (data.pageNum == 1) {
                            $scope.items = [];
                        }*/

                       // $scope.items = $scope.items.concat (response.data);

                       if (response.data.length != 0)
                       {
                        $scope.historyPast3 = $scope.historyPast3.concat(response.data);
                        for (var i = 0; i < $scope.historyPast3.length; i++) {
                            var createDate = $scope.historyPast3[i].createDate;

                            var colon_createDate = createDate.split (':')[0];
                            var blank_createDate = colon_createDate.split (' ')[0];
                            var _createDate = blank_createDate.split ('-');
                            $scope.createDate = _createDate.splice (-2, 4).join ('-');

                            $scope.historyPast3[i].createDate = $scope.createDate;
                            $scope.historyPast3[i].getDayDate = getWeekByDay(blank_createDate);
                        }

                        //根据日期 得到是星期几
                        function getWeekByDay(blank_createDate){ //dayValue=“2014-01-01”
                            var day = new Date(Date.parse(blank_createDate)); //将日期值格式化
                            var today = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]; //创建星期数组
                            return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日
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
                       else
                       {
                        $scope.hasMore = false;
                        alert('已经展示了全部开奖历史')
                       }
                        $ionicLoading.hide();

                        $scope.$broadcast ('scroll.infiniteScrollComplete');
                    }, function (response) {
                        alert ("获取列表失败");
                    });
            }
            else {
                $ionicLoading.hide ();
                $rootScope.errorInfo ();
            }

        }

        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    });
