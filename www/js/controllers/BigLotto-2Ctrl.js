/**
 * Created by admin on 2017/6/14.
 */
angular.module ('starter.BigLotto-2Ctrl', ['starter.services'])

//兑换  大乐透不追加
    .controller ('BigLotto-2Ctrl', function ($scope, $state, $ionicPopover, $interval, $ionicPopup, $stateParams) {
        var flag2 = $stateParams.flag2;
        //设置红球和篮球号码
        $scope.numDataRed = [];
        $scope.numDataBlue = [];
        $scope.filterDataRed = []; //存放选中后的红色号码
        $scope.filterDataBlue = []; //存放选中后的蓝色号码
        // Create the red items   红球
        for (var j = 1; j <= 35; j++) {
            var itemsRed = {
                num: j + 1,
                check: false
            };
            if (j < 10) {
                itemsRed.num = '0' + j
            }
            else {
                itemsRed.num = j
            }
            $scope.numDataRed.push (itemsRed);
        }
        //给红色球添加点击事件
        $scope.addRedClick = function (item) {
            $scope.filterDataRed = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    $scope.filterDataRed.push ($scope.numDataRed[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if ($scope.filterDataRed.length >= 5) {
                    alert ("选择的红球号码不能大于五个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log ($scope.filterDataRed);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                $scope.filterDataRed = [];
                for (var i = 0; i < $scope.numDataRed.length; i++) {
                    if ($scope.numDataRed[i].check == true) {
                        $scope.filterDataRed.push ($scope.numDataRed[i]);
                        //                        $scope.filterDataRed.push($scope.numDataRed[i]);
                    }
                }
            }
        };
        // Create the blue items  篮球
        for (var i = 1; i <= 12; i++) {
            var itemsBlue = {
                num: i + 1,
                check: false
            };
            if (i < 10) {
                itemsBlue.num = '0' + i
            }
            else {
                itemsBlue.num = i
            }
            $scope.numDataBlue.push (itemsBlue);
        }
        //给蓝色球添加点击事件
        $scope.addBlueClick = function (item) {
            $scope.filterDataBlue = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBlue.length; i++) {
                if ($scope.numDataBlue[i].check == true) {
                    $scope.filterDataBlue.push ($scope.numDataBlue[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if ($scope.filterDataBlue.length >= 2) {
                    alert ("选择的篮球号码不能大于两个");
                }
                else {
                    selectedBlueBallNum ();
                }
            }
            else {
                selectedBlueBallNum ();
            }
            console.log ($scope.filterDataBlue);
            /*放置选择后的号码数 函数 */
            function selectedBlueBallNum () {
                item.check = !item.check;
                $scope.filterDataBlue = [];
                for (var i = 0; i < $scope.numDataBlue.length; i++) {
                    if ($scope.numDataBlue[i].check == true) {
                        $scope.filterDataBlue.push ($scope.numDataBlue[i]);
                    }
                }
            }
        };
        //随机选择   红蓝  色球
        $scope.randomBall = function () {
            $scope.filterDataRed = [];
            $scope.filterDataBlue = [];
            //处理随机选取红色球***********************
            for (var i = 0; i < 35; i++) { //首先清空选中的号码效果
                $scope.numDataRed[i].check = false;
                $scope.filterDataRed = [];
            }
            var randomRed = []; //原数组
            //给原数组randomBlue赋值
            for (var i = 1; i <= 35; i++) {
                randomRed[i] = i;
            }
            randomRed.sort (function () {
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var i = 0; i < 5; i++) {
                // console.log (randomRed[i]);
                $scope.numDataRed[randomRed[i] - 1].check = true;
                $scope.filterDataRed.push ($scope.numDataRed[randomRed[i] - 1]);
            }
            //处理随机选取蓝色球***********************
            for (var i = 0; i < 12; i++) { //首先清空选中的号码效果
                $scope.numDataBlue[i].check = false;
                $scope.filterDataBlue = [];
            }
            var randomBlue = []; //原数组
            //给原数组randomBlue赋值
            for (var i = 1; i <= 12; i++) {
                randomBlue[i] = i;
            }
            randomBlue.sort (function () {
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var i = 0; i < 2; i++) {
                // console.log (randomBlue[i]);
                $scope.numDataBlue[randomBlue[i] - 1].check = true;
                $scope.filterDataBlue.push ($scope.numDataBlue[randomBlue[i] - 1]);
            }
            // console.log ($scope.filterDataRed);
            // console.log ($scope.filterDataBlue);
        };
        /**
         * 1.此if是用来判断是不是在投注详情页面点击修改后跳转过来的
         * 2.如果是点击修改后跳转过来的需要渲染红篮球
         */
        if (sessionStorage.editThisOrderData) {
            var changeToArray1 = JSON.parse (sessionStorage.editThisOrderData);
//            console.log (changeToArray1)
            $scope.filterDataBlue = changeToArray1.blue;
            $scope.filterDataRed = changeToArray1.red;
            for (var i = 0; i < 5; i++) {
                $scope.numDataRed[changeToArray1.red[i].num - 1].check = true;
            }
            for (var i = 0; i < 2; i++) {
                $scope.numDataBlue[changeToArray1.blue[i].num - 1].check = true;
            }
        }
        //加入选单按钮
        $scope.saveBallSelect = function () {
            var filterDataRed1 = []; //用来保存本次点击确定后的红球
            var filterDataBlue1 = []; //用来保存本次点击确定后的蓝球
            if ($scope.filterDataRed.length == 5 && $scope.filterDataBlue.length == 2) { //判断用户未选择号码时点击确定无效
                if (sessionStorage.jsonWrap) //判断是否第一次点击确定
                {
                    var changeToArray = JSON.parse (sessionStorage.jsonWrap);
                    //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                    jsonWrap = changeToArray;
                }
                //如果红篮球就添加进数组
                for (var i = 0; i < 35; i++) {
                    if ($scope.numDataRed[i].check == true) {
                        filterDataRed1.push ($scope.numDataRed[i]);
                    }
                }
                for (var i = 0; i < 12; i++) {
                    if ($scope.numDataBlue[i].check == true) {
                        filterDataBlue1.push ($scope.numDataBlue[i]);
                    }
                }
                // console.log(filterDataBlue1)
                //以对象的方式存放每一注的  红篮球 的数据
                var jsonInner = {
                    red: filterDataRed1,
                    blue: filterDataBlue1
                };
                jsonWrap.push (jsonInner);
                // console.log (jsonWrap);
                var sessionJsonWarp = JSON.stringify (jsonWrap); //解析数组
                sessionStorage.jsonWrap = sessionJsonWarp; //保存解析后的数组
                // console.log (sessionStorage.jsonWrap);
                $state.go ('bettingDetail', {
                    'flag3': flag2
                });
            }
            else {
                var alertPopup = $ionicPopup.alert ({
                    template: '<p style="text-align: center; letter-spacing: 2px;">你还未选择号码，请正确选择号码！</p>',
                    okText: "确定"
                });
                return
            }
        };
        //网期开奖
        $scope.historyBiglotto = function () {
            $state.go ('bigLottoHistoryDetails');
        }
    });

