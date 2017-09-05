/**
 * Created by admin on 2017/6/14.
 */
//var ipUrl = 'http://lottery.zhenlong.wang';
//var ipUrl = 'http://103.235.237.134';      //本地ip地址或者域名

angular.module ('starter.BigLotto-2Ctrl', ['starter.services'])

//兑换  大乐透不追加
    .controller ('BigLotto-2Ctrl', function ($scope, $state, $ionicPopover, $interval, $ionicPopup, $stateParams, $ionicModal, $http, $ionicLoading, $rootScope, $util, getWareIssueService, $timeout) {
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
        var redBall = [];
        $scope.addRedClick = function (item) {
            redBall = [];
            $scope.filterDataRed = [];
            //先看选中了几个
            for (var i = 0; i < $scope.numDataRed.length; i++) {
                if ($scope.numDataRed[i].check == true) {
                    $scope.filterDataRed.push ($scope.numDataRed[i]);
                    redBall.push($scope.numDataRed[i]);
                }
            }
            /*判断原来的状态*/
            if (item.check != true) {
                if ($scope.filterDataRed.length >= 5) {
                    alert ("选择的红球号码不能大于五个");
                    return
                }
                else {
                    selectedRedBallNum ();
                }
            }
            else {
                selectedRedBallNum ();
            }

            console.log ($scope.filterDataRed[0].num);
            console.info(redBall);
            /*封装选择后的红色号码数*/
            function selectedRedBallNum () {
                item.check = !item.check;
                $scope.filterDataRed = [];
                for (var i = 0; i < $scope.numDataRed.length; i++) {
                    if ($scope.numDataRed[i].check == true) {
                        $scope.filterDataRed.push ($scope.numDataRed[i]);
                        // $scope.filterDataRed.push($scope.numDataRed[i]);
                    }
                }
            }
        };
        // Create the blue items  蓝球
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
            //随机打撒
            var arr =getArrayItems($scope.numDataRed,5);
            for (var i = 0; i < 5; i++) {
                $scope.numDataRed[parseInt(arr[i].num)-1].check = true;
                $scope.filterDataRed.push ($scope.numDataRed[parseInt(arr[i].num)-1]);
            }

            //处理随机选取蓝色球*************
            for (var i = 0; i < 12; i++) { //首先清空选中的号码效果
                $scope.numDataBlue[i].check = false;
                $scope.filterDataBlue = [];
            }
            //随机打撒\
            var arr =getArrayItems($scope.numDataBlue,2);
            for (var i = 0; i < 2; i++) {
                $scope.numDataBlue[parseInt(arr[i].num)-1].check = true;
                $scope.filterDataBlue.push ($scope.numDataBlue[parseInt(arr[i].num)-1]);
            }
        };
        function getArrayItems(arr, num) {
            //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
            var temp_array = new Array();
            for (var index in arr) {
                temp_array.push(arr[index]);
            }
            //取出的数值项,保存在此数组
            var return_array = new Array();
            for (var i = 0; i<num; i++) {
                //判断如果数组还有可以取出的元素,以防下标越界
                if (temp_array.length>0) {
                    //在数组中产生一个随机索引
                    var arrIndex = Math.floor(Math.random()*temp_array.length);
                    //将此随机索引的对应的数组元素值复制出来
                    return_array[i] = temp_array[arrIndex];
                    //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                    temp_array.splice(arrIndex, 1);
                } else {
                    //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                    break;
                }
            }
            return return_array;
        }

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

        if(type == 0 || type == undefined){
            if (PayType == 0) {
                $scope.saveBallSelect = function () {
                    joinMenuBigPayType0 ();
                }
            }else {
                //加入选单按钮
                $scope.saveBallSelect = function () {
                    joinMenuBigPayType1 ();
                };
            }
        }else if(type == 1){
            if (PayType == 0) {
                $scope.saveBallSelect = function () {
                    joinMenuBigPayType0 ();
                }
            }
            else {
                //加入选单按钮
                $scope.saveBallSelect = function () {
                    joinMenuBigPayType1 ();
                };
            }
        }

        //PayType =0 用抵用券扫码
        function joinMenuBigPayType0 () {
            if ($scope.multiple * 1 <= 0 || $scope.multiple * 1 == '') { //投注倍数限制
                alert('倍数不能为0或为空');
                return
            }
            //获取大乐透期号
            var reques = {};
            var userInfo = $util.getUserInfo ();
//            console.log(userInfo);
            var data = {
                lotteryID : 2
            };
            $ionicLoading.show ({
                template: 'Loading...'
            });
            getWareIssueService.getWareIssue (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    reques = response.data;
                    //console.log (reques);
                    if(response.error !='0'){
                        $scope.errorInfo = reques.info;
                        $rootScope.errorInfo();
                    }else {
                        getdltadd ();
                    }
                }, function (response) {
                    alert("获取期号失败，请重新登录");
                });
            // 大乐透投注接口信息
            function getdltadd () {
                var userInfo = $util.getUserInfo ();

                var dataArrayBig = [];
                var dataObj = {
                    investCode : "", //"investCode":"01,03,05,07,09*06,08"
                    multiple : 1
                };
                var investCodeRed = [];
                var investCodeBlue = [];
                var investCodeStr;
                for (var i = 0; i < 5; i++) {
                    if($scope.filterDataRed[i]){
                        if($scope.filterDataRed[i].num){
                            investCodeRed.push($scope.filterDataRed[i].num);
                        }
                    } else {
                        alert('请正确选择红色号码!!!');
                        return;
                    }
                    /*if($scope.filterDataRed[i] != undefined){
                        if($scope.numDataRed[randomRed[i] - 1]){
                            investCodeRed.push($scope.numDataRed[randomRed[i] - 1].num);
                        }else if($scope.filterDataRed[i].num){
                            investCodeRed.push($scope.filterDataRed[i].num);
                        }
//                        else {
                            alert('请正确选择红色号码!!!');
                            return;
                        }
                    }else {
                        alert('请正确选择红色号码!!!');
                        return;
                    }*/
                }
                for (var i = 0; i < 2; i++) {
                    if($scope.filterDataBlue[i]){
                        if($scope.filterDataBlue[i].num){
                            investCodeBlue.push($scope.filterDataBlue[i].num);
                        }
                    }else {
                        alert('请正确选择蓝色号码!!!');
                        return
                    }

                    /*if($scope.filterDataBlue[i] != undefined){
                        if($scope.numDataBlue[randomBlue[i] - 1]){
                            investCodeBlue.push($scope.numDataBlue[randomBlue[i] - 1].num);
                        }else if($scope.filterDataBlue[i].num){
                            investCodeBlue.push($scope.filterDataBlue[i].num);
                        }
                        else{
                            alert('请正确选择蓝色号码!!!');
                            return
                        }
                    }else {
                        alert('请正确选择蓝色号码!!!');
                        return
                    }*/
                }
                investCodeStr = investCodeRed + '*' + investCodeBlue;
                dataObj.investCode = investCodeStr;
                dataArrayBig.push (dataObj);
                console.log (dataArrayBig);

                $ionicLoading.show ();
                var vid = '';
                if(type == 0){
                    if (userInfo.data.vouchers){
                        for(var k = 0; k < userInfo.data.vouchers.length; k++ ){
                            if (userInfo.data.vouchers == undefined) {
                                vid = '';
                            }
                            else {
                                vid = userInfo.data.vouchers[k].vid;
                            }
                        }
                    }else {
                        vid = ''
                    }
                }else if(type == 1) {
                    if (userInfo.data.voucher == undefined) {
                        vid = $rootScope.nowVid;
                    }
                    else {
                        vid = userInfo.data.voucher.vid;
                    }
                }

                var data = {
//              "lotteryID": "2",
                    wareIssue : reques.wareIssue,
                    payType : PayType,
                    vid : vid,
                    addFlag : "0",
                    data : dataArrayBig
                };
                $http ({
                    method : "POST",
                    url : ipUrl + '/service/lottery/dltadd?token=' + userInfo.data.token,
                    data : data,
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    timeout: 1000 * 10
                })
                    .then (function (response) {
                        $ionicLoading.hide ();
                        console.info (response);
                        console.dir (data);
                        if(response.data.error != '0'){
                            $scope.errorInfo = response.data.info;
                            $rootScope.errorInfo();
                        }else {
                            //提交成功窗口配置
                            $ionicModal.fromTemplateUrl ('templates/bigSubmission.html', {
                                scope: $scope,
                                backdropClickToClose:true
                            })
                                .then (function (modal) {
                                    modal.show ();
                                    $rootScope.makeSureText = '确 定';
                                    $scope.info = response.data.info;
                                    $scope.realName = userInfo.data.user.realName;
                                    $scope.phones = userInfo.data.user.phone;
                                    $scope.receives =  reques.createDate; //投注时间
                                    $scope.draw_time = reques.drawTime;    //开奖时间

                                    $scope.receiveNumArr = data.data;//获赠号码
                                    $scope.receiveNum = [];
                                    $scope.receiveNumRed = [];
                                    $scope.receiveNumBlue = [];
                                    for(var i in $scope.receiveNumArr){
                                        var receiveNum = $scope.receiveNumArr[i].investCode;
                                        var receiveNumRedBlue = receiveNum.split('*');
                                        var receiveNumArrRed = receiveNumRedBlue[0].split(',');
                                        var receiveNumArrBlue = receiveNumRedBlue[1].split(',');

                                        $scope.receiveNumRed.push(receiveNumArrRed);
                                        $scope.receiveNumBlue.push(receiveNumArrBlue);
                                    }
                                    $scope.receiveNum.push($scope.receiveNumRed.concat($scope.receiveNumBlue));

                                    //console.info($scope.receiveNumArr);
//                                console.info($scope.receiveNum);
                                    //$scope.modal3 = modal;
                                    $scope.makeSure = function () {
                                        modal.hide ();
                                        $state.go ('allOrders');
                                        jsonWrapBit5D = [];
                                        sessionStorage.jsonWrap5D = '';
                                    }
                                });
                        }
                        //console.log (response.data.info);
                    }, function (response) {
                        alert('获取投注信息失败，请检查您的网络');
                        /*var confirmPopup = $ionicPopup.confirm ({
                            title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                            template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                            okText: '确认',
                            cancelText: '返回',
                            okType: 'button-darkBlue'
                        }).then (function () {
                            $state.go ('tab.account');
                        });*/
                    });
            }

            //错误码窗口配置
            $rootScope.errorInfo = function () {
                $ionicModal.fromTemplateUrl('templates/errorInfo.html', {
                    scope: $scope,
                    backdropClickToClose: true
                }).then(function(modal) {
                    $scope.modalError = modal;
                    modal.show ();
                });
                $scope.cancelPopError = function() {
                    $scope.modalError.hide();
                };
            };
        }
        //PayType = 1 用抵用券扫码
        function joinMenuBigPayType1 (){
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
                alert('请正确选择号码!!!');
                return;
            }
        }
        //玩法说明时间
        var userInfo = $util.getUserInfo ();
        var data = {
            lotteryID: 2
        };
        console.info(userInfo);
        getWareIssueService.getWareIssue(data, userInfo.data.token)
            .then(function (response) {
               $timeout(countTime,1);
                //$ionicLoading.hide();
                //console.info(response);
                $scope.reques = response.data;
                //console.log ($scope.reques);

                var end_sale_time = $scope.reques.end_sale_time.replace(/-/g,'/');
                var timer = $interval (countTime, 1000);

                function countTime () {
                    var date = new Date ();//获取当前时间
                    var now = date.getTime ();

                    var endDate = new Date (end_sale_time); //设置截止时间
                    var end = endDate.getTime ();

                    var leftTime = end - now;//计算时间差

                    var d, h, m, s;
                    if (leftTime >= 0) {//定义变量 d,h,m,s保存倒计时的时间
                        d = Math.floor (leftTime / 1000 / 60 / 60 / 24);
                        h = Math.floor (leftTime / 1000 / 60 / 60 % 24);
                        m = Math.floor (leftTime / 1000 / 60 % 60);
                        s = Math.floor (leftTime / 1000 % 60);
                    }
                    $scope.hours = checkTime ((d * 24) + h);
                    $scope.minute = checkTime (m);
                    $scope.second = checkTime (s);

                    function checkTime (i) { //将0-9的数字前面加上0，例1变为01
                        if (i < 10) {
                            i = "0" + i;
                        }
                        return i;
                    }
                }
            }, function (response) {
                alert("获取期号或时间失败，请退出重新登录");
            });

        //网期开奖
        $scope.historyBiglotto = function () {
            $state.go ('bigLottoHistoryDetails');
        }
    });

