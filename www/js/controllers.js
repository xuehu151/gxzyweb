var url = "http://121.42.253.149:18820";
var jsonWrap = [];//存放所有的注数
var jsonWrapBit3D = [];//点击向右的修改后返回来时数据的存放
var jsonWrapBit5D = [];//点击向右的修改后返回来时数据的存放
var initToken = '28fa9fa2c554268d4c0721b05c29908064bcec105a4b6865cec9b08a6fbbf2c0e81104b0e43019e4ae600575d40d5f4edcd145c5f0c61013aabe538ca71c3b3df3f822af1e7cb86f292af6ef8c0ea664c9ccecd6c7f682be7a6316bde41f6618e4b28bbd9168bc5d0c135618f5a2710ddf004b45301bd90112e6ba4f540ed792416ce9';
//var ipUrl = 'http://192.168.0.137:8080';
var ipUrl = 'http://121.42.253.149:18820/service';
var initUrl = ipUrl + '/common/index';

angular.module ('starter.controllers', []).controller ('ExchangeCtrl', function ($scope) {
})
//兑换
    .controller ('ExchangeCtrl', function ($scope, $http, $state, $ionicLoading, $ionicPopup) {
        var data = {
            token: initToken
        };
        //初始化接口
        $http ({
            method: "POST",
            url: initUrl,
            data: data,
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
                window.localStorage.setItem ("userInitInfo", JSON.stringify (response.data));
                var localUserInfo = window.localStorage.getItem ("userInitInfo");
                try {
                    userInfo = JSON.parse (localUserInfo);
                } catch (error) {
                    userInfo = null;
                }
                if (userInfo.data.user.realName === undefined) {
                    var confirmPopup = $ionicPopup.confirm ({
                        title: '完善资料',
                        template: '<p style="text-align:center;"><img src="./img/completeInf.png"></p>' + '当前个人资料尚未完善；请完善！',
                        cancelText: '暂不完善',
                        cancelType: '',
                        okText: '立即完善',
                        okType: 'button-positive'
                    })
                        .then (function (res) {
                            if (res) {
                                $state.go ('completeInfo')
                            }
                        });
                }
                console.log (response.data);
            }, function (response) {
                console.log ("初始化数据失败");
            });
        
        
        //***************************************
        function getWareIssue (LotteryId) {
            var localUserInfo = window.localStorage.getItem ("userInitInfo");
            try {
                userInfo = JSON.parse (localUserInfo);
            } catch (error) {
                userInfo = null;
            }
            $http ({
                method: "POST",
                url: ipUrl + '/lottery/getWareIssue?token=' + userInfo.data.token,
                params: {
                    LotteryID: LotteryId
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then (function (response) {
                    $scope.pl3add = response.data;
                    
                    console.log (response.data);
                    
                }, function (response) {
                    console.log ("获取列表失败");
                });
        }
        
        $scope.goToExchange3D = function () {//获取期号接口
            getWareIssue (54);
            $state.go ('exchange-3');
        };
        $scope.goToExchange5D = function () {
            getWareIssue (53);
            $state.go ('exchange-5');
        };
        $scope.goToExchangeBigLotto2 = function () {
            getWareIssue (51);
            $state.go ('BigLotto-2', {'flag2': 1});
        };
        $scope.goToExchangeBigLotto3 = function () {
            getWareIssue (51);
            $state.go ('BigLotto-2');
        };
    })
    
    //兑换 排列3
    .controller ('Exchange-3Ctrl', function ($scope, $state) {
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
        $scope.history3D = function () {
            $state.go ('exchaangehistory3D');
        };
    })
    
    //兑换 排列 3 网期开奖详情
    .controller ('Exchaangehistory3DCtrl', function ($scope, $http, $interval) {
        var localUserInfo = window.localStorage.getItem ("userInitInfo");
        try {
            userInfo = JSON.parse (localUserInfo);
        } catch (error) {
            userInfo = null;
        }
        var data = {
            lotteryID: '54',
            pageSize: '8',
            pageNum: '1'
        };
        
        $http ({
            method: "POST",
            url: ipUrl + '/lottery/getHistoryList?token=' + userInfo.data.token,
            params: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then (function (response) {
                $scope.historyPast3 = response.data.data;
                if (response.data.data.length === 0) {
                    console.log ('暂无数据');
                }
                console.log (response);
                //for(var i=0;i<response.data.data.length;i++){
                //    $scope.historyPast3[i].result=response.data.data[i].result.split(",");
                //}
                //$scope.WareIssue = response.data.result;
                //console.log($scope.historyPast3);
            }, function (response) {
                console.log ("获取列表失败");
            });
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    })
    
    //兑换 排列 3 详情
    .controller ('Exchange-3DetailsCtrl', function ($scope, $state, $http, $ionicPopup) {
        $scope.sessionJsonWarp3D = JSON.parse (sessionStorage.jsonWrap3D);//反解析
        //console.log ($scope.sessionJsonWarp3D);
        
        //手动添加一组
        $scope.manualAdd3D = function () {
            $state.go ('exchange-3');
            sessionStorage.editThisOrderData3D = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };
        
        //店家机选，在本页面随机添加一注
        $scope.autoAdd3D = function () {
            var arrBit100 = [];
            var arrBit10 = [];
            var arrBit1 = [];
            var addJson3D = {
                B_Bit: arrBit100,
                S_Bit: arrBit10,
                G_Bit: arrBit1
            };
            //店主点击随机产生百位号码
            var randomNum100 = parseInt (Math.random () * 10);
            var itemsBit100 = {
                num: randomNum100,
                check: false
            };
            arrBit100.push (itemsBit100);
            
            //店主点击随机产生十位号码
            var randomNum10 = parseInt (Math.random () * 10);
            var itemsBit10 = {
                num: randomNum10,
                check: false
            };
            arrBit10.push (itemsBit10);
            
            //店主点击随机产生十位号码
            var randomNum1 = parseInt (Math.random () * 10);
            var itemsBit1 = {
                num: randomNum1,
                check: false
            };
            arrBit1.push (itemsBit1);
            //由于路由的切换,需本地保存session
            sessionStorage.saveStr3D = JSON.stringify (addJson3D);
            var addObject3D = JSON.parse (sessionStorage.saveStr3D);
            $scope.sessionJsonWarp3D.push (addObject3D);
            
            sessionStorage.jsonWrap3D = JSON.stringify ($scope.sessionJsonWarp3D);//再次解析保存机选后的值
            $scope.sessionJsonWarp3D = JSON.parse (sessionStorage.jsonWrap3D);
            
            $scope.totalMoney = $scope.sessionJsonWarp3D.length;//设置背时和金额
        };
        
        //点击删除一组
        $scope.deleteRow3D = function ($index) {
            $scope.sessionJsonWarp3D.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp3D);
            sessionStorage.jsonWrap3D = changeToStr;
//            console.log (sessionStorage.jsonWrap3D);
            
            $scope.totalMoney -= 1;
        };
        
        //点击返回选择号码页面
        $scope.editThisOrder3D = function ($index) {
            var thisIndexOrder3D = $scope.sessionJsonWarp3D[$index];
            
            var changeToStr3D = JSON.stringify (thisIndexOrder3D);
//            console.info (changeToStr3D);
            sessionStorage.editThisOrderData3D = changeToStr3D;//在本地保存选中的那组数据
            
            $state.go ('exchange-3');
            $scope.deleteRow3D ($index);
        };
        
        //设置表单初始值
        $scope.multiple = '1';
        $scope.totalMoney = $scope.sessionJsonWarp3D.length;
        
        //排列三确认提交
        $scope.submitCms = function () {
            if ($scope.multiple == 0) {//投注倍数限制
                alert ('倍数不能为0');
                return
            }
            // 排列三投注信息
            var localUserInfo = window.localStorage.getItem ("userInitInfo");
            try {
                userInfo = JSON.parse (localUserInfo);
            } catch (error) {
                userInfo = null;
            }
            
            var dataArray = [];
            for (var i in $scope.sessionJsonWarp3D) {
                var dataObj = {
                    investCode: "",
                    multiple: 1
                };
                var investCode = null;
                investCode = $scope.sessionJsonWarp3D[i].B_Bit[0].num + ",";
                investCode += $scope.sessionJsonWarp3D[i].S_Bit[0].num + ",";
                investCode += $scope.sessionJsonWarp3D[i].G_Bit[0].num;
                
                dataObj.investCode = investCode;
                dataArray.push (dataObj);
                console.log (dataArray);
            }
            var data = {
                "LotteryID": "54",
                "WareIssue": "17145",
                "PayType": "0",
                "data": dataArray
            };
            
            $http ({
                method: "POST",
                url: ipUrl + '/lottery/pl3add?token=' + userInfo.data.token,
                data: data,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then (function (response) {
                    var alertPopup = $ionicPopup.alert ({
                        title: '<div class="popup-heads"><img src="./img/alert-success.png" alt="" width = "100%"></div>',
                        template: '<div class="alert-left">' +
                        '<p style="text-align: center">' + response.data.info + '</p>' +
                        '</div>',
                        okText: '确 定',
                        okType: 'button-light'
                    })
                        .then (function () {
//                    $state.go ('orderStatus');
                        });
                    console.log (response.data);
                }, function (response) {
                    var confirmPopup = $ionicPopup.confirm ({
                        title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                        template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                        okText: '确认',
                        cancelText: '返回',
                        okType: 'button-darkBlue'
                    })
                        .then (function () {
                            $state.go ('bigLottoHistoryDetails');//大乐透往期详情
                        });
                });
            
            /*//订单提交成功
             var res = true;
             if (res) {
             var alertPopup = $ionicPopup.alert ({
             title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>', // String. 弹窗的标题。
             template: '<div class="alert-left">' +
             '<p><span>电 话:</span></p>' +
             '<p><span>姓 名:</span></p>' +
             '<p><span>获赠时间:</span></p>' +
             '<p><span>开奖时间:</span></p>' +
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
             }*/
        }
    })
    
    //兑换 排列5
    .controller ('Exchange-5Ctrl', function ($scope, $state, $http) {
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
                    alert ("选择的万位号码只能是一个");
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
                    alert ("选择的千位号码只能是一个");
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
        $scope.history5D = function () {
            $state.go ('exchangehistory5D');
        }
    })
    
    //兑换 排列 5 往期开奖详情
    .controller ('Exchangehistory5DCtrl', function ($scope, $http, $filter) {
        var localUserInfo = window.localStorage.getItem ("userInitInfo");
        try {
            userInfo = JSON.parse (localUserInfo);
        } catch (error) {
            userInfo = null;
        }
        var data = {
            lotteryID: '53',
            pageSize: '8',
            pageNum: '1'
        };
        
        $http ({
            method: "POST",
            url: ipUrl + '/lottery/getHistoryList?token=' + userInfo.data.token,
            params: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then (function (response) {
                $scope.historyPast5 = response.data.data;
                console.log (response.data);
            }, function (response) {
                console.log ("获取列表失败");
            });
        $scope.toArray = function (string2, num) {
            var array = string2.split (",");
            return array[num];
        };
    })
    
    //兑换 排列 5 详情
    .controller ('Exchange-5DetailsCtrl', function ($scope, $state, $http, $ionicPopup) {
        $scope.sessionJsonWarp5D = JSON.parse (sessionStorage.jsonWrap5D);//反解析
        //console.log ($scope.sessionJsonWarp5D);
        //手动添加一组
        $scope.manualAdd5D = function () {
            $state.go ('exchange-5');
            sessionStorage.editThisOrderData5D = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };
        
        //店家机选，在本页面随机添加一注
        $scope.autoAdd5D = function () {
            var arrBit10000 = [];
            var arrBit1000 = [];
            var arrBit100 = [];
            var arrBit10 = [];
            var arrBit1 = [];
            var addJson5D = {
                W_Bit: arrBit10000,
                Q_Bit: arrBit1000,
                B_Bit: arrBit100,
                S_Bit: arrBit10,
                G_Bit: arrBit1
            };
            //店主点击随机产生万位号码
            var randomNum10000 = parseInt (Math.random () * 10);
            var itemsBit10000 = {
                num: randomNum10000,
                check: false
            };
            arrBit10000.push (itemsBit10000);
            
            //店主点击随机产生千位号码
            var randomNum1000 = parseInt (Math.random () * 10);
            var itemsBit1000 = {
                num: randomNum1000,
                check: false
            };
            arrBit1000.push (itemsBit1000);
            
            //店主点击随机产生百位号码
            var randomNum100 = parseInt (Math.random () * 10);
            var itemsBit100 = {
                num: randomNum100,
                check: false
            };
            arrBit100.push (itemsBit100);
            
            //店主点击随机产生十位号码
            var randomNum10 = parseInt (Math.random () * 10);
            var itemsBit10 = {
                num: randomNum10,
                check: false
            };
            arrBit10.push (itemsBit10);
            
            //店主点击随机产生十位号码
            var randomNum1 = parseInt (Math.random () * 10);
            var itemsBit1 = {
                num: randomNum1,
                check: false
            };
            arrBit1.push (itemsBit1);
            //由于路由的切换,需本地保存session
            sessionStorage.saveStr5D = JSON.stringify (addJson5D);
            var addObject5D = JSON.parse (sessionStorage.saveStr5D);
            $scope.sessionJsonWarp5D.push (addObject5D);
            
            sessionStorage.jsonWrap5D = JSON.stringify ($scope.sessionJsonWarp5D);//再次解析保存机选后的值
            $scope.sessionJsonWarp5D = JSON.parse (sessionStorage.jsonWrap5D);
            
            $scope.totalMoney = $scope.sessionJsonWarp5D.length;//设置倍数及金额
        };
        
        //点击删除一组
        $scope.deleteRow5D = function ($index) {
            $scope.sessionJsonWarp5D.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp5D);
            sessionStorage.jsonWrap5D = changeToStr;
            //console.log (sessionStorage.jsonWrap3D);
            
            $scope.totalMoney -= 1;
        };
        
        //点击返回选择号码页面
        $scope.editThisOrder5D = function ($index) {
            var thisIndexOrder5D = $scope.sessionJsonWarp5D[$index];
            
            var changeToStr5D = JSON.stringify (thisIndexOrder5D);
//            console.info (changeToStr3D);
            sessionStorage.editThisOrderData5D = changeToStr5D;//在本地保存选中的那组数据
            
            $state.go ('exchange-5');
            $scope.deleteRow5D ($index);
        };
        
        //设置表单初始值
        $scope.multiple = '1';
        $scope.totalMoney = $scope.sessionJsonWarp5D.length;
        
        
        //排列五确认提交
        $scope.submitCms5D = function () {
            if ($scope.multiple == 0) {//投注倍数限制
                alert ('投注倍数不能为0');
                return
            }
            // 排列五投注信息
            var localUserInfo = window.localStorage.getItem ("userInitInfo");
            try {
                userInfo = JSON.parse (localUserInfo);
            } catch (error) {
                userInfo = null;
            }
            var dataArray = [];
            for (var i in $scope.sessionJsonWarp5D) {
                var dataObj = {
                    investCode: "",
                    multiple: 1
                };
                var investCode = null;
                investCode = $scope.sessionJsonWarp5D[i].W_Bit[0].num + ",";
                investCode += $scope.sessionJsonWarp5D[i].Q_Bit[0].num + ",";
                investCode += $scope.sessionJsonWarp5D[i].B_Bit[0].num + ",";
                investCode += $scope.sessionJsonWarp5D[i].S_Bit[0].num + ",";
                investCode += $scope.sessionJsonWarp5D[i].G_Bit[0].num;
                
                dataObj.investCode = investCode;
                dataArray.push (dataObj);
                console.log (dataArray);
            }
            var data = {
                "LotteryID": "53",
                "WareIssue": "17145",
                "PayType": "0",
                "data": dataArray
            };
            $http ({
                method: "POST",
                url: ipUrl + '/lottery/pl5add?token=' + userInfo.data.token,
                data: data,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then (function (response) {
                    var alertPopup = $ionicPopup.alert ({
                        title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>',
                        template: '<div class="alert-left">' +
                        '<p style="text-align: center">' + response.data.info + '</p>' +
                        '</div>',
                        okText: '确 定',
                        okType: 'button-light'
                    })
                        .then (function () {
                        
                        });
//                    console.log (response.data.info);
                }, function (response) {
                    var confirmPopup = $ionicPopup.confirm ({
                        title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                        template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                        okText: '确认',
                        cancelText: '返回',
                        okType: 'button-darkBlue'
                    })
                        .then (function () {
                            $state.go ('bigLottoHistoryDetails');//大乐透往期详情
                        });
                });
            
            /*//订单提交成功
             var res = true;
             if (res) {
             var alertPopup = $ionicPopup.alert ({
             title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>', // String. 弹窗的标题。
             template: '<div class="alert-left">' +
             '<p><span>电 话:</span></p>' +
             '<p><span>姓 名:</span></p>' +
             '<p><span>获赠时间:</span></p>' +
             '<p><span>开奖时间:</span></p>' +
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
             }*/
        }
    })
    
    //兑换  大乐透不追加
    .controller ('BigLotto-2Ctrl', function ($scope, $state, $ionicPopover, $interval, $ionicPopup, $stateParams) {
        var flag2 = $stateParams.flag2;
        //alert(flag2);
        //设置红球和篮球号码
        $scope.numDataRed = [];
        $scope.numDataBlue = [];
        $scope.filterDataRed = [];//存放选中后的红色号码
        $scope.filterDataBlue = [];//存放选中后的蓝色号码
        
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
        for (var i = 0; i < 12; i++) {
            var itemsBlue = {
                num: i + 1,
                check: false
            };
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
            for (var i = 0; i < 35; i++) {//首先清空选中的号码效果
                $scope.numDataRed[i].check = false;
                $scope.filterDataRed = [];
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
                $scope.filterDataRed.push ($scope.numDataRed[randomRed[i] - 1]);
            }
            
            //处理随机选取蓝色球***********************
            for (var i = 0; i < 12; i++) {//首先清空选中的号码效果
                $scope.numDataBlue[i].check = false;
                $scope.filterDataBlue = [];
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
            var filterDataRed1 = [];        //用来保存本次点击确定后的红球
            var filterDataBlue1 = [];       //用来保存本次点击确定后的蓝球
            
            if ($scope.filterDataRed.length == 5 && $scope.filterDataBlue.length == 2) {//判断用户未选择号码时点击确定无效
                var alertPopup = $ionicPopup.alert ({
                    template: '<p style="text-align: center; letter-spacing: 2px;">订单已提交到我的订单</p>',
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
                        var jsonInner = {
                            red: filterDataRed1,
                            blue: filterDataBlue1
                        };
                        jsonWrap.push (jsonInner);
                        // console.log (jsonWrap);
                        var sessionJsonWarp = JSON.stringify (jsonWrap);//解析数组
                        sessionStorage.jsonWrap = sessionJsonWarp;//保存解析后的数组
                        
                        // console.log (sessionStorage.jsonWrap);
                        $state.go ('bettingDetail', {'flag3': flag2});
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
    })
    
    //兑换  大乐透不追加详情
    .controller ('bettingDetailCtrl', function ($scope, $ionicPopup, $timeout, $state, $http, $stateParams) {
        $scope.flag3 = $stateParams.flag3;
        //设置表单初始值
        $scope.multiple = '1';
        $scope.countMoney = '2';
        if ($scope.falg3 == 1) {
            $scope.countMoney = '2';
        }
        else {
            $scope.countMoney = '3';
        }
        //alert(flag3);
        $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);//反解析
        // console.log ($scope.sessionJsonWarp);
        
        //手动添加一组，返回大乐透选中页面
        $scope.manualAdd = function () {
            $state.go ('BigLotto-2');
            sessionStorage.editThisOrderData = '';  //清除点击修改后保存在session.editThisOrderData中的数据
        };
        
        //店家点击机选，添加机选一注
        $scope.autoAdd = function () {
            $scope.arrRed = [];
            $scope.arrBlue = [];
            addJson = {
                red: $scope.arrRed,
                blue: $scope.arrBlue
            };
            
            //店主点击随机产生5个红号
            var randomRed = [];//原数组
            for (var i = 1; i <= 35; i++) {
                randomRed[i] = i;
            }
            randomRed.sort (function () {//排序
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var j = 0; j < 5; j++) {
                var itemsRed = {
                    num: randomRed[j],
                    check: false
                };
                $scope.arrRed.push (itemsRed);
            }
            
            //店主点击随机产生2个蓝号
            var randomBlue = [];//原数组
            for (var i = 1; i <= 12; i++) {
                randomBlue[i] = i;
            }
            randomBlue.sort (function () {//排序
                return 0.5 - Math.random ();
            });
            //随机打撒
            for (var j = 0; j < 2; j++) {
                var itemsBlue = {
                    num: randomBlue[j],
                    check: false
                };
                $scope.arrBlue.push (itemsBlue);
            }
            //由于路由的切换,需本地保存session
            sessionStorage.saveStr = JSON.stringify (addJson);
            
            var addObject = JSON.parse (sessionStorage.saveStr);
            $scope.sessionJsonWarp.push (addObject);
            
            sessionStorage.jsonWrap = JSON.stringify ($scope.sessionJsonWarp);
            $scope.sessionJsonWarp = JSON.parse (sessionStorage.jsonWrap);
            
            $scope.totalMoney = $scope.sessionJsonWarp.length;//设置倍数及金额
        };
        
        //点击删除一组
        $scope.deleteRow = function ($index) {
            $scope.sessionJsonWarp.splice ($index, 1);   //点击删除本行
            
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp);
            sessionStorage.jsonWrap = changeToStr;
//             console.log(sessionStorage.jsonWrap);
            
            $scope.totalMoney -= 1;
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
        
        
        $scope.totalMoney = $scope.sessionJsonWarp.length;      /////////////////////////////////////////////
        
        
        // 方案保存成功提示框
        $scope.showOrderAlertCms = function () {
            if ($scope.multiple == 0) {//投注倍数限制
                alert ('请重新设置投注倍数');
                return
            }
            // 大乐透投注信息
            var localUserInfo = window.localStorage.getItem ("userInitInfo");
            try {
                userInfo = JSON.parse (localUserInfo);
            } catch (error) {
                userInfo = null;
            }
            var dataArrayBig = [];
            for (var i in $scope.sessionJsonWarp) {
                var dataObj = {
                    investCode: "",//"investCode":"01,03,05,07,09@06,08"
                    multiple: 1
                };
                var investCode = '';
                for (var j in $scope.sessionJsonWarp[i]) {
                    for (var k in $scope.sessionJsonWarp[i][j]) {
                        if (typeof $scope.sessionJsonWarp[i][j][k] === 'object') {
                            
                            if ($scope.sessionJsonWarp[i][j][k].num * 1 < 10) {
                                investCode += ',' + '0' + $scope.sessionJsonWarp[i][j][k].num
                            }
                            else {
                                investCode += ',' + $scope.sessionJsonWarp[i][j][k].num
                            }
                            
                            if (investCode.substr (0, 1) == ',') investCode = investCode.substr (1);//截取第一位逗号
                            investCode = (investCode.substring (investCode.length - 1) == ',') ? investCode.substring (0, investCode.length - 1) : investCode;//截取最后一位逗号
                            
                            var get_array = investCode.split ('');
                            get_array.splice (-6, 1, '@');
                            var investCodeStr = get_array.join ('');
                        }
                    }
                }
//                console.log (investCodeStr);
                dataObj.investCode = investCodeStr;
                dataArrayBig.push (dataObj);
                console.log (dataArrayBig);
            }
            var data = {
                "LotteryID": "51",
                "WareIssue": "17063",
                "PayType": "0",
                "AddFlag": "0",
                "data": dataArrayBig
            };
            
            $http ({
                method: "POST",
                url: ipUrl + '/lottery/dltadd?token=' + userInfo.data.token,
                data: data,
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then (function (response) {
                    console.log (response.data);
                    var alertPopup = $ionicPopup.alert ({
                        title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>',
                        template: '<div class="alert-left">' +
                        '<p style="text-align: center;">' + response.data.info + '</p>' +
                        '</div>',
                        okText: '确 定',
                        okType: 'button-light'
                    })
                        .then (function () {
                        
                        });
                    
                }, function (response) {
                    //扫码后，所获赠注数的限制提示。
                    var confirmPopup = $ionicPopup.confirm ({
                        title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                        template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                        okText: '确认',
                        okType: 'button-darkBlue'
                    })
                        .then (function () {
                            $state.go ('bigLottoHistoryDetails');//大乐透往期详情
                        });
                    console.log ("提交失败");
                });
        }
    })
    
    //大乐透往期详情
    .controller ('bigLottoHistoryDetailsCtrl', function ($scope, $http) {
        //获取期号和时间............
        var localUserInfo = window.localStorage.getItem ("userInitInfo");
        try {
            userInfo = JSON.parse (localUserInfo);
        } catch (error) {
            userInfo = null;
        }
        var data = {
            lotteryID: '51',
            pageSize: '8',
            pageNum: '1'
        };
        
        $http ({
            method: "POST",
            url: ipUrl + '/lottery/getHistoryList?token=' + userInfo.data.token,
            params: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then (function (response) {
                $scope.bitLotto = response.data.data;
                //for(var i=0;i<response.data.data.length;i++){
                //    $scope.historyPast3[i].result=response.data.data[i].result.split(",");
                //}
                //$scope.WareIssue = response.data.result;
                console.log (response.data);
            }, function (response) {
                console.log ("获取列表失败");
            });
        $scope.toArray = function (string2, num) {
            var array1 = string2.split ("-");
            var arrFront = array1[0].split (",");
            var arrBehind = array1[1].split (",");
            var array = arrFront.concat (arrBehind);
//            console.log(array);
            return array[num];
        };
    })
    
    
    
    //账户页面
    .controller ('AccountCtrl', ['$scope', '$rootScope', '$ionicPopup', '$state', '$ionicModal', '$http', 'locals', 'getUser', function ($scope, $rootScope, $ionicPopup, $state, $ionicModal, $http, locals, getUser) {
        //验证是否资料完善
        getUser.getInfo (url + "/service/common/index?token=" + initToken).then (function (response) {
            var userInfo = response.data;
            console.log (userInfo)
            // $rootScope.user={}  //保存token和用户信息
            locals.setObject ($rootScope.user, userInfo)
            $scope.useableMoney = locals.getObject ($rootScope.user).user.money;
            $scope.frozedMoney = locals.getObject ($rootScope.user).user.freeze;
            $scope.totalMoney = $scope.useableMoney + $scope.frozedMoney;
            //提现时候的账户号码
            $rootScope.accountNum = [{
                chanel: 1,
                num: '(' + userInfo.user.alipay + ')'
            }, {
                chanel: 2,
                num: '(' + userInfo.user.wechat + ')'
            }, {
                chanel: 3,
                num: '(' + userInfo.user.bankNo + ')'
            }];
        }, function () {
            alert ('网络异常,未获取到用户信息')
        });
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
                    okType: 'button-positive' // String (默认: 'button-positive')。OK按钮的类型。
                })
                    .then (function (res) {
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
        //提现框的mordal窗口配置
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
        $scope.toWidthdraw = function (channel) {
            $rootScope.channel = channel;
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
        /**
         * 功能:把提交的值保存到localstorage
         *     1.先用对象$rootScope.addData存储localstorage
         *     2.再把ng-model值赋进来
         *     3.再把这个对象赋给localstorage
         */
        $rootScope.addData = locals.getObject ($rootScope.user)
        $scope.submitInfo = function () {
            $rootScope.addData.user.realName = $scope.users.realName;
            $rootScope.addData.user.phone = $scope.users.phone;
            $rootScope.addData.user.idcard = $scope.users.idcard;
            $rootScope.addData.user.wechat = $scope.users.wechat;
            $rootScope.addData.user.alipay = $scope.users.alipay;
            $rootScope.addData.user.bankNo = $scope.users.bankNo;
            locals.setObject ($rootScope.user, $rootScope.addData)
            /**
             * 功能:把提交的值上传到后台
             */
            postData.getInfo (url + "/service/customer/add", $rootScope.addData).then (function (data) {
                $state.go ('completeInfoSucceed');
            }, function () {
                alert ('网络异常,未能更新您的资料')
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
        var token = widthdrawLocals.token;
        getUser.getInfo (url + "/service/customer/getUser?token=" + token).then (function (response) {
            $scope.widthdrawAble = response.data.money; //可用余额
        }, function () {
            alert ('网络异常,未能获取到您的可用余额');
        });
        $scope.widthdrawMoney = ''; //提现金额
        $scope.whetherShow = true; //控制提现提交按钮disable
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
        //提现所有可用余额
        $scope.widthdrawAll = function () {
            $scope.widthdrawMoney = $scope.widthdrawAble;
        };
        $scope.confirmWidthdraw = function (widthdrawMoney) {
            /*//小于10元扣除1元手续费
             if ($scope.widthdrawMoney<=10 && $scope.widthdrawMoney>1)
             {
             widthdrawLocals.money--;
             console.log(widthdrawLocals)
             };*/
            var token = locals.getObject ($rootScope.user).token;
            console.log (token);
            console.log ($scope.widthdrawMoney);
            getUser.getInfo (url + '/service/cash/add' + '?channel=' + $rootScope.channel + '&money=' + $scope.widthdrawMoney + '&token=' + token).then (function (data) {
                $rootScope.WidthdrawStatus = data.error //保存返回的状态,用于决定widthdrawResult的页面
                $state.go ('widthdrawResult')
            }, function () {
                alert ('网络异常,未能提交提现')
            })
        };
    }])
    //提现结果页面
    .controller ('widthdrawResultCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.whetherWidthdrawSuc = $rootScope.WidthdrawStatus == 0 ? true : false; //决定展示的图片
        $scope.widthdrawInfo = {
            success: '提现成功',
            successInfo: '资金预计2小时内到账',
            fail: '申请审核未成功',
            failInfo: '别担心，说不定再试一次就成功了',
        };
    }])
    //奖金纪录页面
    .controller ('prizeRecordsCtrl', ['$scope', '$rootScope', 'getUser', 'locals', function ($scope, $rootScope, getUser, locals) {
        var token = locals.getObject ($rootScope.user).token;
        getUser.getInfo (url + '/service/bonus/getList?token=' + token).then (function (response) {
            $scope.prizeItems = response.data;
            for (var i = 0; i < $scope.prizeItems.length; i++) {
                if ($scope.prizeItems[i].type == 1) {
                    $scope.prizeItems[i].exchangeType = '收入';
                    $scope.prizeItems[i].isIncome = true;
                    $scope.prizeItems[i].exchangeClass = '彩票奖金';
                }
                else if ($scope.prizeItems[i].type == 2) {
                    $scope.prizeItems[i].exchangeType = '支出';
                    $scope.prizeItems[i].isIncome = false;
                    $scope.prizeItems[i].exchangeClass = '奖金兑换';
                }
                else {
                    $scope.prizeItems[i].exchangeType = '收入';
                    $scope.prizeItems[i].isIncome = true;
                    $scope.prizeItems[i].exchangeClass = '出票失败退款';
                }
                ;
            }
            ;
        }, function () {
            alert ('网络异常,未能获取到奖金纪录');
        })
    }])
    //全部订单页面
    .controller ('allOrdersCtrl', ['$scope', '$rootScope', '$state', 'getUser', 'locals', function ($scope, $rootScope, $state, getUser, locals) {
        var token = locals.getObject ($rootScope.user).token;
        getUser.getInfo (url + '/service/lottery/getList?token=' + token).then (function (response) {
            $scope.allOrders = response.data;
            for (var i = 0; i < $scope.allOrders.length; i++) {
                if ($scope.allOrders[i].lotteryID == 53) {
                    $scope.allOrders[i].lotteryID = '排列五'
                }
                else if ($scope.allOrders[i].lotteryID == 54) {
                    $scope.allOrders[i].lotteryID = '排列三'
                }
                else {
                    $scope.allOrders[i].lotteryID = '大乐透'
                }
                ;
                if ($scope.allOrders[i].status == 0 || $scope.allOrders[i].status == 1 || $scope.allOrders[i].status == 2) {
                    $scope.allOrders[i].whetherRed = true;
                    $scope.allOrders[i].status = '待开奖';
                    $scope.allOrders[i].whetherDate = true;
                    $scope.allOrders[i].LT = $scope.allOrders[i].updateDate;
                    $scope.allOrders[i].RT = '扫码兑换';
                }
                else if ($scope.allOrders[i].status == 4) {
                    $scope.allOrders[i].whetherRed = true;
                    $scope.allOrders[i].status = '已中奖';
                    $scope.allOrders[i].whetherDate = false;
                    $scope.allOrders[i].LT = '奖金: ¥' + $scope.allOrders[i].winamt;
                    $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                }
                else if ($scope.allOrders[i].status == -1) {
                    $scope.allOrders[i].whetherRed = false;
                    $scope.allOrders[i].status = '兑换超时';
                    $scope.allOrders[i].whetherDate = false;
                    $scope.allOrders[i].LT = '  ';
                    $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                }
                else if ($scope.allOrders[i].status == 2) {
                    $scope.allOrders[i].whetherRed = false;
                    $scope.allOrders[i].status = '未中奖';
                    $scope.allOrders[i].whetherDate = false;
                    $scope.allOrders[i].LT = '再接再厉哦~~~';
                    $scope.allOrders[i].RT = '奖金支付: ¥' + $scope.allOrders[i].money;
                }
            }
        }, function () {
            alert ('网络异常,未能获取到全部订单');
        })
        $scope.toOrderDetail = function (ticketID) {
            for (var i = 0; i < $scope.allOrders.length; i++) {
                if (ticketID == $scope.allOrders[i].ticketID) {
                    var investCode = $scope.allOrders[i].investCode.split ('@');
                    var investCodeFormat = [];
                    if (investCode.length == 2) {
                        investCodeFormat[0] = investCode[0].split (',');
                        investCodeFormat[1] = investCode[1].split (',');
                    }
                    else if (investCode.length == 1) {
                        investCodeFormat[0] = investCode[0].split (',');
                    }
                    $rootScope.orderDetail = {
                        lotteryID: $scope.allOrders[i].lotteryID,
                        openTime: $scope.allOrders[i].updateDate,
                        status: $scope.allOrders[i].status,
                        investCode: investCodeFormat,
                        pay: $scope.allOrders[i].money,
                        ticketID: ticketID,
                        orderTime: $scope.allOrders[i].updateDate,
                        winMoney: $scope.allOrders[i].winamt
                    }
                }
            }
            $state.go ('orderDetail');
        }
    }])
    //订单详情
    .controller ('orderDetailCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.orderDetail = $rootScope.orderDetail;
    }])
    //提现明细
    .controller ('widthdrawRecordsCtrl', ['$scope', '$rootScope', 'getUser', 'locals', 'postData', function ($scope, $rootScope, getUser, locals, postData) {
        var token = locals.getObject ($rootScope.user).token;
        getUser.getInfo (url + '/service/cash/getList?token=' + token).then (function (response) {
            $scope.widthdrawItems = response.data;
        }, function () {
            alert ('网络异常,未能获取到提现明细')
        })
    }]);
