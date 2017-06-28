/**
 * Created by admin on 2017/6/14.
 */
//兑换 排列5
angular.module ('starter.Exchange-5Ctrl', ['starter.services'])
    
    .controller ('Exchange-5Ctrl', function ($scope, $state) {
        //设置排列3球万位号码
        $scope.numDataBit10000 = [];
        var filterBit10000 = [];
        //设置排列3球千位号码
        $scope.numDataBit1000 = [];
        var filterBit1000 = [];
        //设置排列3球百位号码
        $scope.numDataBit100 = [];
        var filterBit100 = [];
        //设置排列3球十位号码
        $scope.numDataBit10 = [];
        var filterBit10 = [];
        //设置排列3球个位号码
        $scope.numDataBit1 = [];
        var filterBit1 = [];
        //初始化选中的值
        $scope.generate10000 = 0;
        $scope.generate1000 = 0;
        $scope.generate100 = 0;
        $scope.generate10 = 0;
        $scope.generate1 = 0;
        // Create the ball items   万位
        for (var j = 0; j < 10; j++) {
            var itemsBit10000 = {
                num: j,
                check: false
            };
            $scope.numDataBit10000.push (itemsBit10000);
        }
        //给万位添加点击事件
        $scope.addBit10000Click = function (item) {
            $scope.numDataBit10000 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit10000 = {
                        num: j,
                        check: true
                    };
                    filterBit10000[0] = item;
                    $scope.numDataBit10000.push (itemsBit10000);
                }
                else {
                    var itemsBit10000 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit10000.push (itemsBit10000);
                }
            }
            //判断filterBit10000的长度确定generate10000值
            filterBit10000Data ();
        };
        // Create the ball items   千位
        for (var j = 0; j < 10; j++) {
            var itemsBit1000 = {
                num: j,
                check: false
            };
            $scope.numDataBit1000.push (itemsBit1000);
        }
        //给千位添加点击事件
        $scope.addBit1000Click = function (item) {
            $scope.numDataBit1000 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1000 = {
                        num: j,
                        check: true
                    };
                    filterBit1000[0] = item;
                    $scope.numDataBit1000.push (itemsBit1000);
                }
                else {
                    var itemsBit1000 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit1000.push (itemsBit1000);
                }
            }
            //判断filterBit1000的长度确定generate1000值
            filterBit1000Data ();
        };
        // Create the ball items   百位
        for (var j = 0; j < 10; j++) {
            var itemsBit100 = {
                num: j,
                check: false
            };
            $scope.numDataBit100.push (itemsBit100);
        }
        //给百位添加点击事件
        $scope.addBit100Click = function (item) {
            $scope.numDataBit100 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit100 = {
                        num: j,
                        check: true
                    };
                    filterBit100[0] = item;
                    $scope.numDataBit100.push (itemsBit100);
                }
                else {
                    var itemsBit100 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit100.push (itemsBit100);
                }
            }
            //判断filterBit100的长度确定generate100值
            filterBit100Data ();
        };
        // Create the ball items   十位
        for (var j = 0; j < 10; j++) {
            var itemsBit10 = {
                num: j,
                check: false
            };
            $scope.numDataBit10.push (itemsBit10);
        }
        //给十位添加点击事件
        $scope.addBit10Click = function (item) {
            $scope.numDataBit10 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit10 = {
                        num: j,
                        check: true
                    };
                    filterBit10[0] = item;
                    $scope.numDataBit10.push (itemsBit10);
                }
                else {
                    var itemsBit10 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit10.push (itemsBit10);
                }
            }
            //判断filterBit10的长度确定generate10值
            filterBit10Data ();
        };
        // Create the ball items   个位
        for (var j = 0; j < 10; j++) {
            var itemsBit1 = {
                num: j,
                check: false
            };
            $scope.numDataBit1.push (itemsBit1);
        }
        //给个位添加点击事件
        $scope.addBit1Click = function (item) {
            $scope.numDataBit1 = [];
            for (var j = 0; j < 10; j++) {
                if (item.num == j) {
                    var itemsBit1 = {
                        num: j,
                        check: true
                    };
                    filterBit1[0] = item;
                    $scope.numDataBit1.push (itemsBit1);
                }
                else {
                    var itemsBit1 = {
                        num: j,
                        check: false
                    };
                    $scope.numDataBit1.push (itemsBit1);
                }
            }
            //判断filterBit1的长度确定generate1值
            filterBit1Data ();
        };
        
        function filterBit10000Data () {
            if (filterBit10000.length == 0) {
                $scope.generate10000 = 0;
            }
            else {
                $scope.generate10000 = filterBit10000[0].num;
            }
        }
        
        function filterBit1000Data () {
            if (filterBit1000.length == 0) {
                $scope.generate1000 = 0;
            }
            else {
                $scope.generate1000 = filterBit1000[0].num;
            }
        }
        
        function filterBit100Data () {
            if (filterBit100.length == 0) {
                $scope.generate100 = 0;
            }
            else {
                $scope.generate100 = filterBit100[0].num;
            }
        }
        
        function filterBit10Data () {
            if (filterBit10.length == 0) {
                $scope.generate10 = 0;
            }
            else {
                $scope.generate10 = filterBit10[0].num;
            }
        }
        
        function filterBit1Data () {
            if (filterBit1.length == 0) {
                $scope.generate1 = 0;
            }
            else {
                $scope.generate1 = filterBit1[0].num;
            }
        }
        
        //随机选取号码
        var randomBall = []; //原数组
        $scope.randomBallExchage5D = function () {
            randomBall = []; //一进来清空数组
            //给原数组randomBall赋值
            for (var i = 0; i < 5; i++) {
                var randomExchage = parseInt (Math.random () * 10);
                randomBall.push (randomExchage);
            }
            //            console.log (randomBall);
            randomBall.sort (function () {
                return Math.random ();
            });
            for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                $scope.numDataBit10000[i].check = false;
                $scope.numDataBit1000[i].check = false;
                $scope.numDataBit100[i].check = false;
                $scope.numDataBit10[i].check = false;
                $scope.numDataBit1[i].check = false;
                filterBit10000 = [];
                filterBit1000 = [];
                filterBit100 = [];
                filterBit10 = [];
                filterBit1 = [];
            }
            //随机打撒
            $scope.numDataBit10000[randomBall[4]].check = true;
            filterBit10000.push ($scope.numDataBit10000[randomBall[4]]);
            filterBit10000Data ();
            $scope.numDataBit1000[randomBall[3]].check = true;
            filterBit1000.push ($scope.numDataBit1000[randomBall[3]]);
            filterBit1000Data ();
            $scope.numDataBit100[randomBall[2]].check = true;
            filterBit100.push ($scope.numDataBit100[randomBall[2]]);
            filterBit100Data ();
            $scope.numDataBit10[randomBall[1]].check = true;
            filterBit10.push ($scope.numDataBit10[randomBall[1]]);
            filterBit10Data ();
            $scope.numDataBit1[randomBall[0]].check = true;
            filterBit1.push ($scope.numDataBit1[randomBall[0]]);
            filterBit1Data ();
        };
        /**
         * 1.此if是用来判断是不是在投注详情页面点击修改后跳转过来的
         * 2.如果是点击修改后跳转过来的需要渲染红篮球
         */
        if (sessionStorage.editThisOrderData5D) {
            var changeToArray5D = JSON.parse (sessionStorage.editThisOrderData5D);
            console.log (changeToArray5D)
            
            filterBit10000 = changeToArray5D.W_Bit;
            filterBit1000 = changeToArray5D.Q_Bit;
            filterBit100 = changeToArray5D.B_Bit;
            filterBit10 = changeToArray5D.S_Bit;
            filterBit1 = changeToArray5D.G_Bit;
            $scope.numDataBit10000[changeToArray5D.W_Bit[0].num].check = true;
            $scope.numDataBit1000[changeToArray5D.Q_Bit[0].num].check = true;
            $scope.numDataBit100[changeToArray5D.B_Bit[0].num].check = true;
            $scope.numDataBit10[changeToArray5D.S_Bit[0].num].check = true;
            $scope.numDataBit1[changeToArray5D.G_Bit[0].num].check = true;
            
            $scope.generate10000 = changeToArray5D.W_Bit[0].num;
            $scope.generate1000 = changeToArray5D.Q_Bit[0].num;
            $scope.generate100 = changeToArray5D.B_Bit[0].num;
            $scope.generate10 = changeToArray5D.S_Bit[0].num;
            $scope.generate1 = changeToArray5D.G_Bit[0].num;
        }
        //加入选单
        $scope.saveBallSelect5D = function ($index) {
            var json5D = {
                W_Bit: filterBit10000,
                Q_Bit: filterBit1000,
                B_Bit: filterBit100,
                S_Bit: filterBit10,
                G_Bit: filterBit1
            };
            if (sessionStorage.jsonWrap5D) { //判断是否第一次点击确定 并且对进行完删除后赋值
                var changeToArray5D = JSON.parse (sessionStorage.jsonWrap5D);
                //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                jsonWrapBit5D = changeToArray5D;
            }
            if (filterBit10000.length != 0 && filterBit1000.length != 0 && filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                jsonWrapBit5D.push (json5D);
                //                console.log($rootScope.jsonWrapBit3D);
                var sessionJsonWarp5D = JSON.stringify (jsonWrapBit5D); //解析数组
                //console.log (sessionJsonWarp3D);
                sessionStorage.jsonWrap5D = sessionJsonWarp5D; //session保存数据
                //console.log(sessionStorage.jsonWrap3D);
                $scope.generate10000 = 0;
                $scope.generate1000 = 0;
                $scope.generate100 = 0;
                $scope.generate10 = 0;
                $scope.generate1 = 0;
                for (var i = 0; i < 10; i++) { //再次点击之前 首先清空上次选中的号码效果
                    $scope.numDataBit10000[i].check = false;
                    $scope.numDataBit1000[i].check = false;
                    $scope.numDataBit100[i].check = false;
                    $scope.numDataBit10[i].check = false;
                    $scope.numDataBit1[i].check = false;
                    filterBit10000 = [];
                    filterBit1000 = [];
                    filterBit100 = [];
                    filterBit10 = [];
                    filterBit1 = [];
                }
                $state.go ('exchange-5Details');
            }
            else {
                alert ('请正确选择号码');
            }
        };
        //网期开奖
        $scope.history5D = function () {
            $state.go ('exchangehistory5D');
        }
    })