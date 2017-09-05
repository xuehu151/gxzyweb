/**
 * Created by admin on 2017/6/14.
 */
//大乐透往期详情
angular.module ('starter.bigLottoHistoryDetailsCtrl', ['starter.services'])
    
    .controller ('bigLottoHistoryDetailsCtrl', function ($scope, $http, $ionicLoading, $ionicPopup, $rootScope, $ionicModal, $timeout, $util, historyPastService, getWareIssueService) {
        $ionicLoading.show ({
            template : 'Loading...'
        });
        //获取历史投注记录............
        var userInfo = $util.getUserInfo ();
        var pageSize = 8;
        var pageNum = 1;
        
        //loadajax();
        /*
         * 上拉加载，分批加载服务端剩余的数据
         */
        $scope.items = [];
        $scope.hasMore = true;
        $scope.loadMore = function () {
            data = {
                lotteryID : '2',
                pageSize : pageSize,
                pageNum : pageNum,
                sort : 1
            };
            loadajax ();
        };
        
        $scope.bitLotto = [];
        function loadajax () {
            
            historyPastService.PastLottery (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    //$scope.bitLotto = response.data;
                    console.info(response.data);
                    if (response.data) {
                        if (response.data.length != 0) {
                            $scope.bitLotto = $scope.bitLotto.concat (response.data);
                            for (var i = 0; i < $scope.bitLotto.length; i++) {
                                var drawTime = $scope.bitLotto[i].drawTime;
                                console.info(drawTime);
                                var colon_drawTime = drawTime.split (':')[0];
                                var blank_drawTime = colon_drawTime.split (' ')[0];
                                var _drawTime = blank_drawTime.split ('-');
                                $scope.drawTime = _drawTime.splice (-2, 4).join ('-');
                                
                                $scope.bitLotto[i].drawTime = $scope.drawTime;
                                $scope.bitLotto[i].getDayDate = getWeekByDay (blank_drawTime);
                            }
                            
                            //根据日期 得到是星期几
                            function getWeekByDay (blank_createDate) { //dayValue=“2014-01-01”
                                var day = new Date (Date.parse (blank_createDate)); //将日期值格式化
                                var today = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; //创建星期数组
                                return today[day.getDay ()];  //返一个星期中的某一天，其中0为星期日
                            }
                            
                            if ($scope.bitLotto.length === 0) {
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
                    alert ("开奖记录获取失败，请重试!");
                });
            
        }
        
        $scope.doRefresh = function () {
            pageNum = 1;
            $scope.bitLotto = [];
            $scope.loadMore ();
        };
    
        var data = {};
        $scope.margin_10 = false;
        getWareIssueService.getWinamt (data, userInfo.data.token)
            .then (function (response) {
                // console.info(response.data);
                $scope.winningShow = response.data;
                console.info ($scope.winningShow);
                //上下滚动效果
                slide (document.getElementsByTagName ('ul')[0]);
                function slide (parent) {
                    setTimeout (function () {
                        var className = $ ("." + parent.className);
                    
                        var i = 0, sh;
                        var liLength = className.children ("li").length;
                        var liHeight = className.children ("li").height () + parseInt (className.children ("li").css ('border-bottom-width'));
                        className.html (className.html () + className.html ());
                    
                        // 开启定时器
                        sh = setInterval (slide, 3000);
                        function slide () {
                            if (parseInt (className.css ("margin-top")) > (-liLength * liHeight)) {
                                i++;
                                className.animate ({
                                    marginTop : -liHeight * i + "px"
                                }, "slow");
                            }
                            else {
                                i = 0;
                                className.css ("margin-top", "0px");
                            }
                        }
                    
                        // 清除定时器
                        className.hover (function () {
                            clearInterval (sh);
                        }, function () {
                            clearInterval (sh);
                            sh = setInterval (slide, 3000);
                        });
                    }, 0);
                }
            }, function (error) {
                alert ('数据获取失败!');
            });
    
    
        $scope.toArray = function (string2, num) {
            var array1 = string2.split ("*");
            var arrFront = array1[0].split (",");
            var arrBehind = array1[1].split (",");
            var array = arrFront.concat (arrBehind);
            //console.log(array);
            return array[num];
        };
    });
