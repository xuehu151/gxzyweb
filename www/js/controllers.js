var jsonWrap = [];//存放所有的注数
var jsonWrapBit3D = [];//点击向右的修改后返回来时数据的存放
var jsonWrapBit5D = [];//点击向右的修改后返回来时数据的存放

//var ipUrl = 'http://192.168.0.137:8080';
var ipUrl = 'http://121.42.253.149:18820/service';
var initUrl = ipUrl + '/common/index';

angular.module ('starter.controllers', ['ngMessages'])
//兑换
    .controller ('ExchangeCtrl', function ($scope, $http, $state, $ionicLoading) {
        var data = {
            token: '28fa9fa2c554268d4c0721b05c29908064bcec105a4b6865cec9b08a6fbbf2c3ee1104b0e43019e4ae600575d40d5f4ddad145c5f0c61013aabe538ca71c3b3df3f822af1e7cb86f292af6ef8c0ea664c9ccecd6c7f682be7a6316bde41f6618e4b28bbd9168bc5d0c135618f5a2710ddf004b45301bd90112e6ba4f540ed792416ce9'
        };
        $http ({
            method: "POST",
            url: initUrl,
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function (obj) {
                var str = [];                for (var s in obj) {
                    str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                }
                return str.join ("&");
            },
            timeout: 3000
        })
            .then (function (response) {
                /* 获取初始化数据 */
                window.localStorage.setItem ("userInitInfo", JSON.stringify (response.data));
                console.log (response.data);
            }, function (response) {
                alert ("初始化数据失败");
            });
        
        $scope.goToExchange3D = function () {
            $state.go ('exchange-3');
        };
        $scope.goToExchange5D = function () {
            $state.go ('exchange-5');
        };
        $scope.goToExchangeBigLotto2 = function () {
            $state.go ('BigLotto-2');
        };
        $scope.goToExchangeBigLotto3 = function () {
            $state.go ('BigLotto-2');
        };
    })
    
    //兑换 排列3
    .controller ('Exchange-3Ctrl', function ($scope, $state, $ionicLoading, $rootScope) {
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
        $scope.generate100 = 0;
        $scope.generate10 = 0;
        $scope.generate1 = 0;
        // Create the ball items   百位
        for (var j = 0; j < 10; j++) {
            var itemsBit = {
                num: j,
                check: false
            };
            $scope.numDataBit100.push (itemsBit);
        }
        
        //给百位添加点击事件
        filterBit100 = [];
        $scope.addBit100Click = function (item) {
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit100.length; i++) {
                if ($scope.numDataBit100[i].check == true) {
                    filterBit100.push ($scope.numDataBit100[i]);
                }
            }
            
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit100.length >= 1) {
                    alert ("选择的百位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit100);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit100 = [];
                for (var i = 0; i < $scope.numDataBit100.length; i++) {
                    if ($scope.numDataBit100[i].check == true) {
                        filterBit100.push ($scope.numDataBit100[i]);
                    }
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
        filterBit10 = [];
        $scope.addBit10Click = function (item) {
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit10.length; i++) {
                if ($scope.numDataBit10[i].check == true) {
                    filterBit10.push ($scope.numDataBit10[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit10.length >= 1) {
                    alert ("选择的十位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit10);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit10 = [];
                for (var i = 0; i < $scope.numDataBit10.length; i++) {
                    if ($scope.numDataBit10[i].check == true) {
                        filterBit10.push ($scope.numDataBit10[i]);
                    }
                }
            }
            
            //判断filterBit100的长度确定generate100值
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
        filterBit1 = [];
        $scope.addBit1Click = function (item) {
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit1.length; i++) {
                if ($scope.numDataBit1[i].check == true) {
                    filterBit1.push ($scope.numDataBit1[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit1.length >= 1) {
                    alert ("选择的个位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit1);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit1 = [];
                for (var i = 0; i < $scope.numDataBit1.length; i++) {
                    if ($scope.numDataBit1[i].check == true) {
                        filterBit1.push ($scope.numDataBit1[i]);
                    }
                }
            }
            
            //判断filterBit100的长度确定generate100值
            filterBit1Data ();
        };
        
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
        var randomBall = [];//原数组
        $scope.randomBallExchage = function () {
            randomBall = [];//一进来清空数组
            //给原数组randomBall赋值
            for (var i = 0; i < 3; i++) {
                var randomExchage = parseInt (Math.random () * 10);
                randomBall.push (randomExchage);
            }
//            console.log (randomBall);
            randomBall.sort (function () {
                return Math.random ();
            });
            
            for (var i = 0; i < 10; i++) {//再次点击之前 首先清空上次选中的号码效果
                $scope.numDataBit100[i].check = false;
                $scope.numDataBit10[i].check = false;
                $scope.numDataBit1[i].check = false;
                filterBit100 = [];
                filterBit10 = [];
                filterBit1 = [];
            }
            
            //随机打撒
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
        if (sessionStorage.editThisOrderData3D) {
            var changeToArray3D = JSON.parse (sessionStorage.editThisOrderData3D);
            filterBit100 = changeToArray3D.B_Bit;
            filterBit10 = changeToArray3D.S_Bit;
            filterBit1 = changeToArray3D.G_Bit;
            
            $scope.numDataBit100[changeToArray3D.B_Bit[0].num].check = true;
            $scope.numDataBit10[changeToArray3D.S_Bit[0].num].check = true;
            $scope.numDataBit1[changeToArray3D.G_Bit[0].num].check = true;
            
            $scope.generate100 = changeToArray3D.B_Bit[0].num;
            $scope.generate10 = changeToArray3D.S_Bit[0].num;
            $scope.generate1 = changeToArray3D.G_Bit[0].num;
        }
        
        //加入选单
        $scope.saveBallSelect3D = function ($index) {
            var json3D = {
                B_Bit: filterBit100,
                S_Bit: filterBit10,
                G_Bit: filterBit1
            };
            if (sessionStorage.jsonWrap3D) {//判断是否第一次点击确定 并且对进行完删除后赋值
                var changeToArray3D = JSON.parse (sessionStorage.jsonWrap3D);
                //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                jsonWrapBit3D = changeToArray3D;
            }
            
            if (filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                
                jsonWrapBit3D.push (json3D);
//                console.log($rootScope.jsonWrapBit3D);
                
                var sessionJsonWarp3D = JSON.stringify (jsonWrapBit3D);//解析数组
                //console.log (sessionJsonWarp3D);
                
                sessionStorage.jsonWrap3D = sessionJsonWarp3D;//session保存数据
                //console.log(sessionStorage.jsonWrap3D);
                
                $scope.generate100 = 0;
                $scope.generate10 = 0;
                $scope.generate1 = 0;
                
                for (var i = 0; i < 10; i++) {//再次点击之前 首先清空上次选中的号码效果
                    $scope.numDataBit100[i].check = false;
                    $scope.numDataBit10[i].check = false;
                    $scope.numDataBit1[i].check = false;
                    filterBit100 = [];
                    filterBit10 = [];
                    filterBit1 = [];
                }
                $state.go ('exchange-3Details');
            }
            else {
                alert ('请正确选择号码');
            }
        };
        //网期开奖
        $scope.past3D = function () {
            $state.go ('exchaangehistory3D');
        }
    })
    
    //兑换 排列 3 网期开奖详情
    .controller ('Exchaangehistory3DCtrl', function ($scope) {
    
    })
    
    //兑换 排列 3 详情
    .controller ('Exchange-3DetailsCtrl', function ($scope, $state, $http) {
        $scope.sessionJsonWarp3D = JSON.parse (sessionStorage.jsonWrap3D);//反解析
//        console.log ($scope.sessionJsonWarp3D);
        
        //手动添加一组
        $scope.manualAdd3D = function () {
            $state.go ('exchange-3');
            sessionStorage.editThisOrderData3D = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };
        
        //店家机选，在本页面随机添加一注
        $scope.autoAdd3D = function () {
        
        
        
        
        };
        
        //点击删除一组
        $scope.deleteRow3D = function ($index) {
            $scope.sessionJsonWarp3D.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp3D);
            sessionStorage.jsonWrap3D = changeToStr;
//            console.log (sessionStorage.jsonWrap3D);
        };
        
        //点击返回选择号码页面
        $scope.editThisOrder3D = function ($index) {
            var thisIndexOrder3D = $scope.sessionJsonWarp3D[$index];
            /*var arrowRightArr = [];
             for (var i in thisIndexOrder3D) {
             for (var j in thisIndexOrder3D[i]) {
             if (typeof thisIndexOrder3D[i][j]==='object') {
             arrowRightArr.push(thisIndexOrder3D[i][j].num)
             }
             }
             }*/
//           console.log (thisIndexOrder3D);
            
            var changeToStr3D = JSON.stringify (thisIndexOrder3D);
//            console.info (changeToStr3D);
            sessionStorage.editThisOrderData3D = changeToStr3D;//在本地保存选中的那组数据
            
            $state.go ('exchange-3');
            $scope.deleteRow3D ($index);
        };
        
        //提交彩店
        $scope.submitCms = function (userInfo) {
            // 排列三投注信息
            
            var data = {
                LotteryID: ''
            };
            $http ({
                method: "POST",//http://121.42.253.149:18820/service/lottery/getWareIssue?LotteryID=51
                url: ipUrl + '/lottery/getWareIssue',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var s in obj) {
                        str.push (encodeURIComponent (s) + "=" + encodeURIComponent (obj[s]));
                    }
                    return str.join ("&");
                },
                timeout: 3000
            })
                .then (function (response) {
                    /* 获取初始化数据 */
                    var localUserInfo = window.localStorage.getItem ("userInitInfo");
                    
                    console.log (responselocalUserInfo);
                    /*try {
                     response.userInfo = JSON.parse (localUserInfo);
                     } catch (error) {
                     response.userInfo = null;
                     }*/
                }, function (response) {
                    alert ("初始化数据失败");
                });
            
            
            
            
        }
    })
    
    //兑换 排列5
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
        filterBit10000 = [];
        $scope.addBit10000Click = function (item) {
            filterBit10000 = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit10000.length; i++) {
                if ($scope.numDataBit10000[i].check == true) {
                    filterBit10000.push ($scope.numDataBit10000[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit10000.length >= 1) {
                    alert ("选择的百位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit10000);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit10000 = [];
                for (var i = 0; i < $scope.numDataBit10000.length; i++) {
                    if ($scope.numDataBit10000[i].check == true) {
                        filterBit10000.push ($scope.numDataBit10000[i]);
                    }
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
        filterBit1000 = [];
        $scope.addBit1000Click = function (item) {
            filterBit1000 = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit1000.length; i++) {
                if ($scope.numDataBit1000[i].check == true) {
                    filterBit1000.push ($scope.numDataBit1000[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit1000.length >= 1) {
                    alert ("选择的百位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit1000);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit1000 = [];
                for (var i = 0; i < $scope.numDataBit1000.length; i++) {
                    if ($scope.numDataBit1000[i].check == true) {
                        filterBit1000.push ($scope.numDataBit1000[i]);
                    }
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
        filterBit100 = [];
        $scope.addBit100Click = function (item) {
            filterBit100 = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit100.length; i++) {
                if ($scope.numDataBit100[i].check == true) {
                    filterBit100.push ($scope.numDataBit100[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit100.length >= 1) {
                    alert ("选择的百位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit100);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit100 = [];
                for (var i = 0; i < $scope.numDataBit100.length; i++) {
                    if ($scope.numDataBit100[i].check == true) {
                        filterBit100.push ($scope.numDataBit100[i]);
                    }
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
        filterBit10 = [];
        $scope.addBit10Click = function (item) {
            filterBit10 = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit10.length; i++) {
                if ($scope.numDataBit10[i].check == true) {
                    filterBit10.push ($scope.numDataBit10[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit10.length >= 1) {
                    alert ("选择的百位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit10);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit10 = [];
                for (var i = 0; i < $scope.numDataBit10.length; i++) {
                    if ($scope.numDataBit10[i].check == true) {
                        filterBit10.push ($scope.numDataBit10[i]);
                    }
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
        filterBit1 = [];
        $scope.addBit1Click = function (item) {
            filterBit1 = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBit1.length; i++) {
                if ($scope.numDataBit1[i].check == true) {
                    filterBit1.push ($scope.numDataBit1[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterBit1.length >= 1) {
                    alert ("选择的百位号码只能是一个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterBit1);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterBit1 = [];
                for (var i = 0; i < $scope.numDataBit1.length; i++) {
                    if ($scope.numDataBit1[i].check == true) {
                        filterBit1.push ($scope.numDataBit1[i]);
                    }
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
        var randomBall = [];//原数组
        $scope.randomBallExchage5D = function () {
            randomBall = [];//一进来清空数组
            //给原数组randomBall赋值
            for (var i = 0; i < 5; i++) {
                var randomExchage = parseInt (Math.random () * 10);
                randomBall.push (randomExchage);
            }
//            console.log (randomBall);
            randomBall.sort (function () {
                return Math.random ();
            });
            
            for (var i = 0; i < 10; i++) {//再次点击之前 首先清空上次选中的号码效果
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
            if (sessionStorage.jsonWrap5D) {//判断是否第一次点击确定 并且对进行完删除后赋值
                var changeToArray5D = JSON.parse (sessionStorage.jsonWrap5D);
                //把controller(bettingHaveSaved)中获取的sessionStorage.jsonWrap放到此controller中来，在这个pushWrap上push新号码
                jsonWrapBit5D = changeToArray5D;
            }
            
            if (filterBit10000.length != 0 && filterBit1000.length != 0 && filterBit100.length != 0 && filterBit10 != 0 && filterBit1 != 0) {
                
                jsonWrapBit5D.push (json5D);
//                console.log($rootScope.jsonWrapBit3D);
                
                var sessionJsonWarp5D = JSON.stringify (jsonWrapBit5D);//解析数组
                //console.log (sessionJsonWarp3D);
                
                sessionStorage.jsonWrap5D = sessionJsonWarp5D;//session保存数据
                //console.log(sessionStorage.jsonWrap3D);
                
                $scope.generate10000 = 0;
                $scope.generate1000 = 0;
                $scope.generate100 = 0;
                $scope.generate10 = 0;
                $scope.generate1 = 0;
                
                for (var i = 0; i < 10; i++) {//再次点击之前 首先清空上次选中的号码效果
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
        $scope.past5D = function () {
            $state.go ('exchangehistory5D');
        }
    })
    
    //兑换 排列 5 网期开奖详情
    .controller ('Exchangehistory5DCtrl', function ($scope) {
    
    })
    
    //兑换 排列 5 详情
    .controller ('Exchange-5DetailsCtrl', function ($scope, $state) {
        $scope.sessionJsonWarp5D = JSON.parse (sessionStorage.jsonWrap5D);//反解析
//        console.log ($scope.sessionJsonWarp3D);
        
        //点击删除一组
        $scope.deleteRow5D = function ($index) {
            $scope.sessionJsonWarp5D.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp5D);
            sessionStorage.jsonWrap5D = changeToStr;
//            console.log (sessionStorage.jsonWrap3D);
        };
        
        //点击返回选择号码页面
        $scope.editThisOrder5D = function ($index) {
            var thisIndexOrder5D = $scope.sessionJsonWarp5D[$index];
            /*var arrowRightArr = [];
             for (var i in thisIndexOrder3D) {
             for (var j in thisIndexOrder3D[i]) {
             if (typeof thisIndexOrder3D[i][j]==='object') {
             arrowRightArr.push(thisIndexOrder3D[i][j].num)
             }
             }
             }*/
//           console.log (thisIndexOrder3D);
            
            var changeToStr5D = JSON.stringify (thisIndexOrder5D);
//            console.info (changeToStr3D);
            sessionStorage.editThisOrderData5D = changeToStr5D;//在本地保存选中的那组数据
            
            $state.go ('exchange-5');
            $scope.deleteRow5D ($index);
        };
    })
    
    //兑换  大乐透不追加
    .controller ('BigLotto-2Ctrl', function ($scope, $state, $ionicPopover, $interval, $ionicPopup, $rootScope) {
        //设置红球和篮球号码
        $scope.numDataRed = [];
        $scope.numDataBlue = [];
        var filterDataRed = [];//存放选中后的红色号码
        var filterDataBlue = [];//存放选中后的蓝色号码
        $scope.Note = '0';  //初始化注数
        $scope.NoteMoney = '0';//初始化钱数
        
        // Create the red items   红球
        for (var j = 0; j < 35; j++) {
            var itemsRed = {
                num: j + 1,
                check: false
            };
            $scope.numDataRed.push (itemsRed);
        }
        
        //给红色球添加点击事件
        $scope.addRedClick = function (item) {
            filterDataRed = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    filterDataRed.push ($scope.numDataRed[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterDataRed.length >= 5) {
                    alert ("选择的红球号码不能大于五个");
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }
            console.log (filterDataRed);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                filterDataRed = [];
                for (var i = 0; i < $scope.numDataRed.length; i++) {
                    if ($scope.numDataRed[i].check == true) {
                        filterDataRed.push ($scope.numDataRed[i]);
                    }
                }
            }
            
            noteCount ();//调取多少注以及多少钱
        };
        
        // Create the blue items  篮球
        for (var i = 0; i < 12; i++) {
            var itemsBlue = {
                num: i + 1,
                check: false
            };
            $scope.numDataBlue.push (itemsBlue);
        }
        
        //给蓝色球添加点击事件
        $scope.addBlueClick = function (item) {
            filterDataBlue = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataBlue.length; i++) {
                if ($scope.numDataBlue[i].check == true) {
                    filterDataBlue.push ($scope.numDataBlue[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if (filterDataBlue.length >= 2) {
                    alert ("选择的篮球号码不能大于两个");
                }
                else {
                    selectedBlueBallNum ();
                }
            }
            else {
                selectedBlueBallNum ();
            }
            console.log (filterDataBlue);
            /*放置选择后的号码数 函数 */
            function selectedBlueBallNum () {
                item.check = !item.check;
                filterDataBlue = [];
                for (var i = 0; i < $scope.numDataBlue.length; i++) {
                    if ($scope.numDataBlue[i].check == true) {
                        filterDataBlue.push ($scope.numDataBlue[i]);
                    }
                }
            }
            
            noteCount ();//调取多少注以及多少钱函数
        };
        
        //清空已选中的红蓝色球
        $scope.clearSelected = function () {
            filterDataRed = [];//清空选中后的红色号码数据
            filterDataBlue = [];//清空选中后的蓝色号码数据
            
            //清空选中后的红色号码
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    $scope.numDataRed[i].check = !$scope.numDataRed[i].check;
                }
            }
            //清空选中后的蓝色号码
            for (var i = 0; i < $scope.numDataBlue.length; i++) {
                if ($scope.numDataBlue[i].check == true) {
                    $scope.numDataBlue[i].check = !$scope.numDataBlue[i].check;
                }
            }
            noteCount ();//调取多少注以及多少钱函数
            console.log (filterDataBlue);
            console.log (filterDataRed);
        };
        
        //随机选择   红蓝  色球
        $rootScope.randomBall = function () {
            //处理随机选取红色球***********************
            for (var i = 0; i < 35; i++) {//首先清空选中的号码效果
                $scope.numDataRed[i].check = false;
                filterDataRed = [];
            }
            var randomRed = [];//原数组
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
                filterDataRed.push (randomRed[i]);
            }
            
            //处理随机选取蓝色球***********************
            for (var i = 0; i < 12; i++) {//首先清空选中的号码效果
                $scope.numDataBlue[i].check = false;
                filterDataBlue = [];
            }
            var randomBlue = [];//原数组
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
                filterDataBlue.push (randomBlue[i]);
            }
            noteCount ();//调取多少注以及多少钱函数
            // console.log (filterDataRed);
            // console.log (filterDataBlue);
        };
        //根据选中的多少注来确定  注数和金额数；
        function noteCount () {
            if (filterDataRed.length == 5 && filterDataBlue.length == 2) {
                $scope.Note = '1';
                $scope.NoteMoney = '2';
            }
            else {
                $scope.Note = '0';
                $scope.NoteMoney = '0';
            }
        }
        
        /* console.log(filterDataRed.length);
         console.log(filterDataBlue.length);*/
        
        /**
         * 1.此if是用来判断是不是在投注详情页面点击修改后跳转过来的
         * 2.如果是点击修改后跳转过来的需要渲染红篮球
         */
        if (sessionStorage.editThisOrderData) {
            var changeToArray1 = JSON.parse (sessionStorage.editThisOrderData);
            filterDataBlue = changeToArray1.blue;
            filterDataRed = changeToArray1.red;
            
            for (var i = 0; i < 5; i++) {
                $scope.numDataRed[changeToArray1.red[i].num - 1].check = true;
            }
            
            for (var i = 0; i < 2; i++) {
                $scope.numDataBlue[changeToArray1.blue[i].num - 1].check = true;
            }
            $scope.Note = '1'; // 判断如果点击修改查看按钮返回到详情投注页面后添加注数以及金额
            $scope.NoteMoney = '2';
        }
        //确认提交按钮
        $scope.saveBallSelect = function () {
            var filterDataRed1 = [];        //用来保存本次点击确定后的红球
            var filterDataBlue1 = [];       //用来保存本次点击确定后的蓝球
            
            if (filterDataRed.length == 5 && filterDataBlue.length == 2) {//判断用户未选择号码时点击确定无效
                var alertPopup = $ionicPopup.alert ({
                    template: '<p style="text-align: center; letter-spacing: 2px;">您获赠的大乐透号码已加入选单</p>',
                    okText: "确定"
                })
                    .then (function () {
                        if (sessionStorage.jsonWrap)    //判断是否第一次点击确定
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
                        var jsonInner = {red: filterDataRed1, blue: filterDataBlue1};
                        jsonWrap.push (jsonInner);
                        // console.log (jsonWrap);
                        var sessionJsonWarp = JSON.stringify (jsonWrap);//解析数组
                        sessionStorage.jsonWrap = sessionJsonWarp;//保存解析后的数组
                        
                        // console.log (sessionStorage.jsonWrap);
                        $state.go ('bettingDetail');
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
    })
    
    //兑换  大乐透不追加详情
    .controller ('bettingDetailCtrl', function ($scope, $ionicPopup, $timeout, $state) {
        $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);//反解析
        // console.log ($scope.sessionJsonWarp);
        
        //手动添加一组，返回大乐透选中页面
        $scope.manualAdd = function () {
            $state.go ('BigLotto-2');
            sessionStorage.editThisOrderData = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };
        
        //点击店家机选，添加机选一注
        $scope.liAutoAdds = [];   //初始化
        $scope.autoAdd = function () {
            /* $rootScope.randomBall();
             
             var liAutoAddJson = JSON.stringify(jsonWrap);
             $scope.liAutoAdds.push(liAutoAddJson);*/
        };
        
        //点击删除一组
        $scope.deleteRow = function ($index) {
            $scope.sessionJsonWarp.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp);
            sessionStorage.jsonWrap = changeToStr;
            // console.log(sessionStorage.jsonWrap);
        };
        
        $scope.editThisOrder = function ($index) {
            /**
             * 1.先转成数组
             * 2.数组中获取当前修改的一组
             * 3.sessionStorage保存当前修改的一组
             */
            var changeToArr = JSON.parse (sessionStorage.jsonWrap);
            var thisIndexOrder = changeToArr[$index];
            
            var changeToArr1 = JSON.stringify (thisIndexOrder);
            sessionStorage.editThisOrderData = changeToArr1;
            
            // console.log(thisIndexOrder);
            $state.go ('BigLotto-2');
            $scope.deleteRow ($index);
            
        };
        
        // 方案保存成功提示框
        var res = true;
        $scope.showOrderAlertCms = function () {
            //订单提交成功
            if (res) {
                var alertPopup = $ionicPopup.alert ({
                    title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>', // String. 弹窗的标题。
                    template: '<div class="alert-left">' +
                    '<p><span>电 话:</span>订单提交成功</p>' +
                    '<p><span>姓 名:</span>订单提交成功</p>' +
                    '<p><span>获赠时间:</span>订单提交成功</p>' +
                    '<p><span>开奖时间:</span>订单提交成功</p>' +
                    '<p><span>获赠号码:</span>订单提交成功</p>' +
                    '</div>', // String (可选)。放在弹窗body内的html模板。
                    okText: '确 定', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-light' // String (默认: 'button-positive')。OK按钮的类型。
                })
                    .then (function () {
//                    $state.go ('orderStatus');
                    });
            }
            else {
                //扫码后，所获赠注数的限制提示。
//                $scope.showConfirm = function () {
                var confirmPopup = $ionicPopup.confirm ({
                    title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>', // String. 弹窗标题。
                    template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>', // String (可选)。放在弹窗body内的html模板。
                    okText: '确认',// String (默认: 'OK')。OK按钮的文字。
                    cancelText: '返回', // String (默认: 'Cancel')。一个取消按钮的文字。
                    okType: 'button-darkBlue'
                })
                    .then (function () {
                        $state.go ('bigLottoHistoryDetails');//大乐透往期详情
                    });
//                };
            }
        };
    })
    
    //大乐透往期详情
    .controller ('bigLottoHistoryDetailsCtrl', function ($scope) {
    
    })
    
    //账户页面
    .controller ('AccountCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$ionicModal', '$http', 'locals', 'getUser', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, locals, getUser) {
        
        //验证是否资料完善
        var url = "http://121.42.253.149:18820/service/common/index";
        var token = "28fa9fa2c554268d4c0721b05c29908064bcec105a4b6865cec9b08a6fbbf3c0e31104b0e43019e4ae600575d40d5f4ddcca4be3dac61013a8f1518dac006025ebe832a13856b86f2928a0f28806b063dcc0f184dfee91bb776f13bde6186715efb684a69f4e965d0c135449efac7841c7185c443118de0511e1be4e550dd09555449ed0";
        
        getUser.getInfo (url, token).then (function (response) {
            
            var userInfo = response.data;
            console.log (userInfo);
            // $rootScope.user={}  //保存token和用户信息
            locals.setObject ($rootScope.user, userInfo);
            console.log (locals.getObject ($rootScope.user));
            $scope.useableMoney = locals.getObject ($rootScope.user).user.money;
            
            $scope.frozedMoney = locals.getObject ($rootScope.user).user.freeze;
            
            $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
            
            //提现时候的账户号码
            $rootScope.accountNum = [
                {chanel: 1, num: '(' + userInfo.user.alipay + ')'},
                {chanel: 2, num: '(' + userInfo.user.wechat + ')'},
                {chanel: 3, num: '(' + userInfo.user.bankNo + ')'}
            ];
            console.log ($rootScope.accountNum)
        }, function () {
            console.log ('no')
        });
        
        /*postData.then(function (data) {
         console.log(data)
         },function () {
         alert(11)
         })*/
        
        $scope.withdrawConfirm = function () {
            
            if (locals.getObject ($scope.user).user.realName) {
                $scope.modal.show ();
            }
            else {
                var confirmPopup = $ionicPopup.confirm ({
                    title: '完善资料',
                    template: '<p style="text-align:center;"><img src="./img/completeInf.png"></p>' + '当前个人资料尚未完善，无法提现；完善个人资料后即可立即提现！',
                    // templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                    cancelText: '暂不完善', // String (默认: 'Cancel')。一个取消按钮的文字。
                    cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
                    okText: '立即完善', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
                });
                confirmPopup.then (function (res) {
                    if (res) {
                        $state.go ('completeInfo')
                    }
                    else {
                    
                    }
                });
            }
        };
        
        /*//点击暂不完善,隐藏提示界面
         $scope.notCompleteInfo=function () {
         $scope.confirmInfoComplete=false;
         }*/
        
        //点击完善资料,转到完善资料页面
        /* $scope.toCompleteInfo=function () {
         $state.go('completeInfo')
         };*/
        
        //冻结金额的解释
        $scope.toggleShowAnswer = function () {
            $scope.showAnswer = !$scope.showAnswer;
        };
        
        $scope.showAnswer = false;
        
        //转到奖金纪录页面
        $scope.toPrizeRecords = function () {
            $state.go ('prizeRecords')
        };
        
        //转到全部订单页面
        $scope.toAllOrders = function () {
            $state.go ('allOrders')
        };
        
        //转到提现明细页面
        $scope.toWidthdrawRecords = function () {
            $state.go ('widthdrawRecords')
        };
        
        
        //弹出提现框
        $ionicModal.fromTemplateUrl ('accountModal.html', {
            scope: $scope
        }).then (function (modal) {
            $scope.modal = modal;
        });
        
        
        
        
        $scope.openModal = function () {
            $scope.modal.show ();
        };
        
        $scope.closeModal = function () {
            $scope.modal.hide ();
        };
        
        $scope.widthdraw = function () {
            // body...
        };
        
        $scope.toWidthdraw = function (chanel) {
            
            $rootScope.chanel = chanel;
            $scope.modal.hide ();
            $state.go ('widthdraw')
        }
        
    }])
    
    //完善个人资料
    .controller ('completeInfoCtrl', ['$scope', '$rootScope', '$state', 'locals', 'postData', function ($scope, $rootScope, $state, locals, postData) {
        $scope.users = {
            realName: '',
            phone: '',
            idcard: '',
            wechat: '',
            alipay: '',
            bankNo: '',
        };
        
        $rootScope.addData = locals.getObject ($rootScope.user)
        console.log ($rootScope.addData)
        
        $scope.submitInfo = function () {
            
            /**
             * 功能:把提交的值保存到localstorage
             *     1.先用对象$rootScope.addData存储localstorage
             *     2.再把ng-model值赋进来
             *     3.再把这个对象赋给localstorage
             */
            $rootScope.addData.user.realName = $scope.users.realName;
            $rootScope.addData.user.phone = $scope.users.phone;
            $rootScope.addData.user.idcard = $scope.users.idcard;
            $rootScope.addData.user.wechat = $scope.users.wechat;
            $rootScope.addData.user.alipay = $scope.users.alipay;
            $rootScope.addData.user.bankNo = $scope.users.bankNo;
            
            locals.setObject ($rootScope.user, $rootScope.addData)
            
            
            /**
             * 功能:把提交的值提交到服务器
             */
            // $rootScope.addData=locals.getObject($rootScope.user);
            console.log ($rootScope.addData)
            postData.getInfo ('http://121.42.253.149:18820/service/customer/add', $rootScope.addData)
                .then (function (data) {
                    console.log (data);
                    $state.go ('completeInfoSucceed');
                }, function () {
                    alert ('wrong')
                })
            
        }
    }])
    
    //完善个人资料成功
    .controller ('completeInfoSucceedCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.toAccount = function () {
            $state.go ('tab.account')
        }
    }])
    
    //提现页面
    .controller ('widthdrawCtrl', ['$scope', '$state', '$rootScope', 'getUser', 'locals', 'postData', function ($scope, $state, $rootScope, getUser, locals, postData) {
        var widthdrawLocals = locals.getObject ($rootScope.user);
        var getUserUrl = "http://121.42.253.149:18820/service/customer/getUser"
        var token = widthdrawLocals.toke;
        
        getUser.getInfo (getUserUrl, token)
            .then (function (response) {
                $scope.widthdrawAble = response.data.money
            }, function () {
                alert ('wrong')
            });
        
        $scope.widthdrawMoney = '';
        $scope.whetherShow = true;
        $scope.whetherOK = function (widthdrawMoney) {
            if (widthdrawMoney > $scope.widthdrawAble) {
                $scope.cantWidthdraw = '输入金额超出可提现余额';
                $scope.whetherShow = false;
                
            }
            else {
                $scope.cantWidthdraw = '';
                $scope.whetherShow = true;
            }
            $scope.widthdrawMoney = widthdrawMoney;
        }
        
        $scope.widthdrawAll = function () {
            $scope.widthdrawMoney = $scope.widthdrawAble
        };
        
        $scope.confirmWidthdraw = function (widthdrawMoney) {
            /*//小于10元扣除1元手续费
             if ($scope.widthdrawMoney<=10 && $scope.widthdrawMoney>1)
             {
             widthdrawLocals.money--;
             console.log(widthdrawLocals)
             };*/
            var url = 'http://121.42.253.149:18820/service/cash/add' + '?chanel=' + $rootScope.chanel + '&money=' + $scope.widthdrawMoney
            var token = locals.getObject ($rootScope.user).toke;
            console.log ($rootScope.chanel);
            console.log ($scope.widthdrawMoney);
            
            getUser.getInfo (url, token).then (function () {
                alert ('right')
            }, function () {
                alert ('wrong')
            })
            
            $state.go ('widthdrawResult')
        };
    }])
    
    //提现结果页面
    .controller ('widthdrawResultCtrl', ['$scope', function ($scope) {
        // body...
    }])
    
    //奖金纪录页面
    .controller ('prizeRecordsCtrl', ['$scope', '$rootScope', 'postData', function ($scope, $rootScope, postData) {
        $rootScope.infos = [
            {
                isIncome: false,
                exchangeClass: '奖金兑换',
                exchangeTime: '2017-05-16 08:88:88',
                exchangeMoney: -3.00,
                exchangeType: '支出'
            },
            {
                isIncome: false,
                exchangeClass: '奖金兑换',
                exchangeTime: '2017-05-16 08:88:88',
                exchangeMoney: -3.00,
                exchangeType: '支出'
            }
        ]
    }])
    
    //全部订单页面
    .controller ('allOrdersCtrl', ['$scope', '$state', 'postData', function ($scope, $state, postData) {
        $scope.toOrderDetail = function () {
            $state.go ('orderDetail')
        }
    }])
    
    //订单详情
    .controller ('orderDetailCtrl', ['$scope', 'postData', function ($scope, postData) {
    
    }])
    
    //提现明细
    .controller ('widthdrawRecordsCtrl', ['$scope', '$rootScope', '$rootScope', 'locals', 'postData', function ($scope, $rootScope, $rootScope, locals, postData) {
        $scope.widthdrawItems = {}
        
        // postData.getInfo("http://121.42.253.149:18820/service/customer/getList",locals.getObject($scope.user).toke)
        console.log (locals.getObject ($rootScope.user))
        
        
    }]);
