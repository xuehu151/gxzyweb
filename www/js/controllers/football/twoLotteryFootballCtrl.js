angular.module('starter.twoLotteryFootball', [])
    .controller('twoLotteryFootballCtrl', function ($scope, $state, $stateParams, $WeekFactory, $footballInfo, $http, $errorPopupFactory, $ionicLoading, $rootScope, $util) {
        var playData = $stateParams.playData;  //活动期间数据
        var supportRate;
        var  userInfo = $util.getUserInfo();
        console.log("2串1数据", playData);

        if (playData !== null) {
            supportRate = playData[2];
            console.info(supportRate);
            $scope.twoLotteryGameList = playData;
            $scope.twoLotteryGameList.length = 2;
            // ballOneHostWinCount //二串一对阵一主队为让一球(-1)主胜支持数
            // ballOneHostLossCount //二串一对阵一主队为让一球(-1)主负支持数
            // ballOneHostWinCountOr // 二串一对阵一主队为受让一球(1)主胜支持数
            // ballOneHostLossCountOr // 二串一对阵一主队为受让一球(1)主负支持数

            // ballTwoHostWinCount     // 二串一对阵二主队为让一球(-1)主胜支持数
            // ballTwoHostLossCount    // 二串一对阵二主队为让一球(-1)主负支持数
            // ballTwoHostWinCountOr   // 二串一对阵二主队为受让一球(1)主胜支持数
            // ballTwoHostLossCountOr  // 二串一对阵二主队为受让一球(1)主负支持数

            $scope.titleDate = playData[0].endTime.split(' ')[0];
            $scope.titleTime = playData[0].endTime.split(' ')[1].substr(0, 5);
            playData.forEach(function (item, index, arr) {
                item.btnWinChecked = false;
                item.btnLoseChecked = false;
                item.weekText = $WeekFactory.weekDict(Number(item.week));
                $scope.weekText = item.weekText;
                switch (Number(item.rqspfRateCount)) {
                    case -1:
                        item.mainWin = '主胜';
                        item.mainWinOdds = item.v3;
                        item.guestUnbeaten = '客不败';
                        item.guestLossOdds = item.letv0;
                        item.winTeamApproval = supportRate.ballTwoHostWinCount;
                        item.loseTeamApproval = supportRate.ballTwoHostLossCount;
                        break;
                    case 1:
                        item.mainWin = '主不败';
                        item.mainWinOdds = item.letv3;
                        item.guestUnbeaten = '客胜';
                        item.guestLossOdds = item.v0;
                        item.winTeamApproval = supportRate.ballOneHostWinCountOr;
                        item.loseTeamApproval = supportRate.ballOneHostLossCountOr;
                        break;
                    default:
                        item.mainWin = '主胜';
                        item.guestUnbeaten = '客不败';
                }
                //三元运算符为了解决值太小出现浮点数;
                if (item.winTeamApproval !== 0 || item.loseTeamApproval !== 0) {
                    $scope.headcount = item.winTeamApproval + item.loseTeamApproval;
                }
                else {
                    $scope.headcount = 1;
                }
                $scope.winpercent = parseInt(item.winTeamApproval / $scope.headcount * 100);
                $scope.winpercent <= 0 ? $scope.winpercent = 0 : '';
                $scope.losepercent = 100 - $scope.winpercent;
            });
        }
        else {
            $state.go('tab.exchange');
        }

        var betWay = '';
        var investCode = '';
        var lotteryID = '';
        var btnStatus = [];
        var playWay = '';
        $scope.condition = false;
        $scope.money = 0;//支付龙币数
        $scope.topPrize = 0;//最高奖金
        var _vid = '20170525170402702001';
        $scope.descrip = false;
        if(PayType === 0){
            $scope.descrip = true;
        }
        else if(PayType === 1){
            $scope.descrip = false;
        }

        if (vid == null || vid == undefined) {
            if ($rootScope.nowVid) {
                _vid = $rootScope.nowVid;
            }
            else {
                _vid = '';
            }
        }
        else {
            if ($rootScope.nowVid) {
                _vid = $rootScope.nowVid;
            }
            else {
                _vid = userInfo.data.voucher.vid;
            }
        }
        $scope.mainWinBtn = function (num, item, count) { //选输赢
            var obj = {};
            if(count === 1){
                if(!item.btnWinChecked){
                    betWay = '';
                    if(item.mainWin === '主胜'){
                        betWay = 20201 + '|';
                    }
                    else if(item.mainWin === '主不败'){
                        betWay = 20206 + '|';
                    }
                    item.btnWinChecked = true;
                    item.btnLoseChecked = false;
                    obj.btnWinChecked = item.btnWinChecked;
                    obj.rqspfRateCount = item.rqspfRateCount;
                    obj.index = num;
                    obj.spfStatus = 3;
                    obj.betWay = betWay;
                    obj.date = item.date;
                    obj.week = item.week;
                    obj.playId = item.playId;
                    obj.lossPercent = item.mainWinOdds;
                    if(num === 0){
                        btnStatus[0] = obj;
                    }
                    else {
                        btnStatus[1] = obj;
                    }
                }
            }

            if(count === 2){
                if(!item.btnLoseChecked){
                    betWay = '';
                    if(item.guestUnbeaten === '客胜'){
                        betWay = 20201 + '|';
                    }
                    else if(item.guestUnbeaten === '客不败'){
                        betWay = 20206 + '|';
                    }
                    item.btnWinChecked = false;
                    item.btnLoseChecked = true;
                    obj.btnLoseChecked = item.btnLoseChecked;
                    obj.rqspfRateCount = item.rqspfRateCount;
                    obj.index = num;
                    obj.spfStatus = 0;
                    obj.betWay = betWay;
                    obj.date = item.date;
                    obj.week = item.week;
                    obj.playId = item.playId;
                    obj.lossPercent = item.guestLossOdds;
                    if(num === 0){
                        btnStatus[0] = obj;
                    }
                    else {
                        btnStatus[1] = obj;
                    }
                }
            }
            if(btnStatus.length === 2 && btnStatus[0] !== undefined){
                $scope.condition = true;
                $scope.money = 2;
                $scope.topPrize = 2 * (btnStatus[0].lossPercent * btnStatus[1].lossPercent).toFixed(2);
            }
            //console.info(btnStatus);
        };

        $scope.makeSureSeries = function () {
            $ionicLoading.show();
            investCode = '';
            if(btnStatus.length !== 2 || btnStatus[0] === undefined){
                $ionicLoading.hide();
                $scope.imgagesUrl = './img/completeInf.png';
                $scope.successOrFaild = '至少选择两场比赛';
                $errorPopupFactory.errorInfo ($scope, $state ,'twoLotteryFootball');
                return
            }
            for (var i = 0; i < btnStatus.length; i++) {
                if(btnStatus[0].betWay == btnStatus[1].betWay){
                    playWay = '';
                    lotteryID = btnStatus[0].betWay.replace('|', '');
                }
                else {
                    lotteryID = '20205';
                    playWay = btnStatus[i].betWay;
                }
                investCode += btnStatus[i].date + '|' + btnStatus[i].week + '|' + btnStatus[i].playId + '|' + playWay + btnStatus[i].spfStatus + '^';
            }
            var data = {
                lotteryID: lotteryID,
                payType: PayType,
                businessmanId: "0",
                addFlag: "0",
                vid: _vid,
                data: [
                    {
                        investCode: investCode,
                        multiple: 1,
                        betWay: '502',
                        planId: supportRate.id
                    }
                ]
            };
            //console.info(data);

            $http ({
                method : "POST",
                url : ipUrl + '/service/lottery/footBallAdd?token=' + userInfo.data.token,
                data : data,
                headers : {
                    "Content-Type" : "application/json"
                },
                timeout: 1000 * 10 * 3
            })
                .then (function (response) {
                    $ionicLoading.hide();
                    if(response.data.error === '0'){
                        $rootScope.giveMoney = '0';
                        $scope.imgagesUrl = './img/completeInfoSucceed.png';
                        $scope.successOrFaild = '投注' + response.data.info + '请到订单中查看!';
                        $errorPopupFactory.errorInfo ($scope, $state ,'allOrders');
                        cancelBtnStatus();
                    }
                    else {
                        $scope.imgagesUrl = './img/completeInf.png';
                        $scope.successOrFaild = response.data.info + ' 错误码' + response.data.error;
                        $errorPopupFactory.errorInfo ($scope, $state ,'twoLotteryFootball');
                    }
                })
        };

        $scope.clearBtnChecked = function () {//取消选中
            cancelBtnStatus();
        };

        function cancelBtnStatus() {
            playData.forEach(function (item, index, array) {
                item.btnWinChecked = false;
                item.btnLoseChecked = false;
                btnStatus = [];
                $scope.condition = false;
            });
        }


    });
