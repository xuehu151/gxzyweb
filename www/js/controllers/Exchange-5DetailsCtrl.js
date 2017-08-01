/**
 * Created by admin on 2017/6/14.
 */
var ipUrl = 'http://121.42.253.149:18820/service';

angular.module ('starter.Exchange-5DetailsCtrl', ['starter.services'])
//兑换 排列 5 详情
    
    .controller ('Exchange-5DetailsCtrl', function ($scope, $state, $http, $ionicPopup, $ionicLoading, $ionicModal, $util, getWareIssueService) {
        $scope.sessionJsonWarp5D = JSON.parse (sessionStorage.jsonWrap5D); //反解析
        //console.log ($scope.sessionJsonWarp5D);
        //设置表单初始值
        $scope.multiple = '1';
        $scope.totalMoney = $scope.sessionJsonWarp5D.length;
        $scope.isDisabled = true;
        disabledBtn5D (); //判断当投注金额大于余额时按钮的点击效果函数
        
        var PayType5D = null;
        function disabledBtn5D () {
            //判断用户要用什么来兑换彩票    余额 || 抵用券
            if (type == 0) {
                if (PayType == 0) {
                    PayType5D = userInfo.data.voucher.money
                }else if(PayType == 1){
                    PayType5D = userInfo.data.user.money
                }
            }else if(type == 1){
                if (PayType == 0) {
                    for(var k = 0; k < userInfo.data.vouchers.length; k++){
                        PayType5D = userInfo.data.vouchers[k].money;
//                        console.info(userInfo.data.vouchers[k]);
                    }
                }
                else if (PayType == 1) {
                    PayType5D = userInfo.data.user.money
                }
            }
            
            if ($scope.totalMoney >= PayType5D) {
                $scope.isDisabled = true;
                var alertPopup = $ionicPopup.alert ({
                    title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>',
                    template: '<div class="alert-left">' + '<p style="text-align: center">余额不足,无法操作,请充值</p>' + '</div>',
                    okText: '确 定',
                    okType: 'button-light'
                })
                    .then (function () {
                        ////////
                    });
            }
            else {
                $scope.isDisabled = false;
            }
        }
        
        //手动添加一组
        $scope.manualAdd5D = function () {
            $state.go ('exchange-5');
            sessionStorage.editThisOrderData5D = ''; //清除点击修改后保存在session.editThisOrderData中的数据
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
            sessionStorage.jsonWrap5D = JSON.stringify ($scope.sessionJsonWarp5D); //再次解析保存机选后的值
            $scope.sessionJsonWarp5D = JSON.parse (sessionStorage.jsonWrap5D);
            $scope.totalMoney = $scope.sessionJsonWarp5D.length; //设置倍数及金额
            disabledBtn5D ();
        };
        //点击删除一组
        $scope.deleteRow5D = function ($index) {
            $scope.sessionJsonWarp5D.splice ($index, 1); //点击删除本行
            //删除本行后的数据保存到sessionStorage
            var changeToStr = JSON.stringify ($scope.sessionJsonWarp5D);
            sessionStorage.jsonWrap5D = changeToStr;
            //console.log (sessionStorage.jsonWrap3D);
            $scope.totalMoney -= 1;
            disabledBtn5D ();
        };
        //点击返回选择号码页面
        $scope.editThisOrder5D = function ($index) {
            var thisIndexOrder5D = $scope.sessionJsonWarp5D[$index];
            console.log (thisIndexOrder5D);
            var changeToStr5D = JSON.stringify (thisIndexOrder5D);
            //console.info (changeToStr3D);
            sessionStorage.editThisOrderData5D = changeToStr5D; //在本地保存选中的那组数据
            $state.go ('exchange-5');
            $scope.deleteRow5D ($index);
        };
        //排列五确认提交
        $scope.submitCms5D = function () {
            $ionicLoading.show ();
            if ($scope.multiple == 0) { //投注倍数限制
                alert ('投注倍数不能为0');
                return
            }
            //获取5D期号
            var reques = {};
            var userInfo = $util.getUserInfo ();
            /*$http({
             method: "POST",
             url: ipUrl + '/lottery/getWareIssue?token=' + userInfo.data.token,
             params: {
             lotteryID: 53
             },
             headers: {
             "Content-Type": "application/json"
             }
             })*/
            var data = {
                lotteryID: 40
            };
            getWareIssueService.getWareIssue (data, userInfo.data.token)
                .then (function (response) {
                    $ionicLoading.hide ();
                    reques = response.data;
                     console.log (reques);
                    getPl5add ();
                }, function (response) {
                    console.log ("获取列表失败");
                });
            // 排列五投注信息
            function getPl5add () {
                $ionicLoading.show ();
                var userInfo = $util.getUserInfo ();
                
                var dataArray = [];
                for (var i in $scope.sessionJsonWarp5D) {
                    var dataObj = {
                        investCode: "",
                        multiple: 1
                    };
                    var investCode = null;
                    investCode = $scope.sessionJsonWarp5D[i].W_Bit[0].num + "*";
                    investCode += $scope.sessionJsonWarp5D[i].Q_Bit[0].num + "*";
                    investCode += $scope.sessionJsonWarp5D[i].B_Bit[0].num + "*";
                    investCode += $scope.sessionJsonWarp5D[i].S_Bit[0].num + "*";
                    investCode += $scope.sessionJsonWarp5D[i].G_Bit[0].num;
                    dataObj.investCode = investCode;
                    dataArray.push (dataObj);
                    //console.log (dataArray);
                }
                
                var vid = '';
                if(type == 0){
                    if (userInfo.data.voucher == undefined) {
                        vid = '';
                    }
                    else {
                        vid = userInfo.data.voucher.vid;
                    }
                }else if(type == 1) {
                    if(userInfo.data.vouchers){
                        for (var k = 0; k < userInfo.data.vouchers.length; k++) {
                            if (userInfo.data.vouchers == undefined) {
                                vid = '';
                            }
                            else {
                                vid = userInfo.data.vouchers[k].vid;
                            }
                        }
                    }else {
                        vid = '';
                    }
                }
                
                var data = {
//                    "lotteryID": "40",
                    wareIssue: reques.wareIssue,
                    payType: PayType,
                    vid: vid,
                    data: dataArray
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
                        $ionicLoading.hide ();
                        console.info (response);
                        console.dir (data);
                        /*var alertPopup = $ionicPopup.alert ({
                            title: '<div class="popup-heads"><img src="./img/alert-success.png" alt=""  width = "100%"></div>',
                            template: '<div class="alert-left">' + '<p style="text-align: center">' + response.data.info + '</p>' + '</div>',
                            okText: '确 定',
                            okType: 'button-light'
                        }).then (function () {
                            $state.go ('tab.account');
                        });*/
                        //提交成功窗口配置
                        $ionicModal.fromTemplateUrl ('submission.html', {
                            scope: $scope,
                            backdropClickToClose:true
                        })
                            .then (function (modal) {
                                modal.show ();
                                $scope.info = response.data.info;
                                $scope.realName = userInfo.data.user.realName;
                                $scope.phones = userInfo.data.user.phone;
                                $scope.receives = userInfo.data.user.updateDate; //获赠时间
                                $scope.draw_time = reques.draw_time.split('T').join(' ');//开奖时间
            
                                $scope.receiveNumArr = data.data;//获赠号码
                                $scope.receiveNum = [];
                                for(var i in $scope.receiveNumArr){
                                    var receiveNum = $scope.receiveNumArr[i].investCode;
                                    var receiveNumStr = receiveNum.split('*');
                
                                    $scope.receiveNum.push(receiveNumStr);
                                }
                                console.info($scope.receiveNumArr);
                                console.info($scope.receiveNum);
//                            $scope.modal3 = modal;
                                $scope.makeSure = function () {
                                    modal.hide ();
                                    $state.go ('tab.account');
                                    jsonWrapBit5D = [];
                                    sessionStorage.jsonWrap5D = '';
                                }
                            });
                        //console.log (response.data.info);
                    }, function (response) {
                        var confirmPopup = $ionicPopup.confirm ({
                            title: '<div class="confirmPopup-heads"><img src="./img/alert-img.png" alt=""  width = "30%"></div>',
                            template: '<div style="color: #132d8e;">您只获赠了真龙赠与您的 3 注彩票,想多来几注，再来一包真龙香烟吧！</div>',
                            okText: '确认',
                            cancelText: '返回',
                            okType: 'button-darkBlue'
                        }).then (function () {
                            $state.go ('tab.account');
                        });
                    });
            }
        }
    });

