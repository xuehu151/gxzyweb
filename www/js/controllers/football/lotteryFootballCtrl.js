angular.module('starter.lotteryFootball', [])
    .controller('lotteryFootballCtrl', function ($scope, $state, $util, $stateParams, $WeekFactory, $footballInfo, $http, $errorPopupFactory, $ionicLoading, $rootScope) {
        var playData = $stateParams.playData;  //活动期间数据
        console.log("单关数据", playData);
        $scope.betnum = [false, false, false];
        $scope.multiple = 1; //倍数
        console.info(PayType);
        if (playData !== null) {
            $scope.headwin = playData[1].ballOneWinCount; //压赢的
            $scope.headdraw = playData[1].ballOneTieCount; //压平局的
            $scope.headlose = playData[1].ballOneLossCount; //压输的

            $scope.headcount = ($scope.headwin + $scope.headdraw + $scope.headlose);
            if ($scope.headcount !== 0) {
                $scope.winpercent = ($scope.headwin / $scope.headcount * 100).toFixed(3);
                $scope.drawpercent = ($scope.headdraw / $scope.headcount * 100).toFixed(3);
                $scope.losepercent = ($scope.headlose / $scope.headcount * 100).toFixed(3);
            }
            else {
                $scope.winpercent = 0;
                $scope.drawpercent = 0;
                $scope.losepercent = 0;
            }

            var week = playData[0].week;
            $scope.playId = playData[0].playId;
            $scope.weekText = $WeekFactory.weekDict(Number(week));
            $scope.titleDate = playData[0].endTime.split(' ')[0];
            $scope.titleTime = playData[0].endTime.split(' ')[1].substr(0, 5);
        }
        else {
            $state.go('tab.exchange');
        }

        var userInfo = $util.getUserInfo();
        var longBi = 2;
        $scope.singlePassGame = playData;
        $scope.topPrize = 0;//最高奖金
        $scope.money = 0;//支付龙币数
        $scope.noteNumber = 0; //注数

        var lossPercentArr = [];
        var maxLossPercent = 0;
        var injection = 0;
        var playWayMethod = '';
        var spfStatus_3 = '';
        var spfStatus_1 = '';
        var spfStatus_0 = '';
        $scope.bunkoBtn = function (num, lossPercent) { //选择方案
            var status = [];
            $scope.betnum[num] = !$scope.betnum[num];
            if ($scope.betnum[num] === true) {
                lossPercentArr.push(lossPercent);
            }
            else {
                lossPercentArr.splice(lossPercentArr.indexOf(lossPercent), 1);
            }
            $scope.betnum.forEach(function (value, index, array) {
                if (value) {
                    status.push(value);
                }
            });

            if (lossPercentArr.length) {
                maxLossPercent = Math.max.apply(null, lossPercentArr);
            } else {
                maxLossPercent = 0;
            }
            if (num === 0) {
                if ($scope.betnum[0]) {
                    spfStatus_3 = '3';
                } else {
                    spfStatus_3 = '';
                }
            } else if (num === 1) {
                if ($scope.betnum[1]) {
                    spfStatus_1 = '1';
                } else {
                    spfStatus_1 = '';
                }
            } else if (num === 2) {
                if ($scope.betnum[2]) {
                    spfStatus_0 = '0';
                } else {
                    spfStatus_0 = '';
                }
            }
            playWayMethod = spfStatus_3 + spfStatus_1 + spfStatus_0;
            injection = status.length;
            calculatePrize(injection, $scope.multiple);
        };

        $scope.multSmall = function () { //减少倍数
            $scope.multiple <= 1 ? $scope.multiple = 1 : $scope.multiple--;
            calculatePrize(injection, $scope.multiple)
        };

        $scope.multBig = function () { //增加倍数
            $scope.multiple++;
            calculatePrize(injection, $scope.multiple)
        };

        $scope.noteChange = function (multiple) {
            if (multiple < 2000) {
                calculatePrize(injection, multiple);
            }
            else {
                $scope.multiple = 1;
                calculatePrize(injection, $scope.multiple);
            }
        };

        function calculatePrize(statusLength, multiple) {
            $scope.noteNumber = statusLength;
            $scope.money = $scope.noteNumber * longBi * multiple;
            $scope.topPrize = (2 * maxLossPercent * multiple).toFixed(2);
        }

        $scope.clearBtnChecked = function () {//取消选中
            cancelBtnStatus();
        };

        var investCode = '';
        var planId = playData[1].id;
        var date = playData[0].date;
        var playId = playData[0].playId;
        var _vid = '';
        $scope.descrip = false;
        if (PayType === 0) {
            $scope.descrip = true;
        }
        else if (PayType === 1) {
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
        else  {
            if ($rootScope.nowVid) {
                _vid = $rootScope.nowVid;
            }
            else {
                _vid = userInfo.data.voucher.vid;
            }
        }
        $scope.makeSureSinglePass = function () {
            $ionicLoading.show();
            investCode = date + '|' + week + '|' + playId + '|' + playWayMethod + '^';

            if (!playWayMethod) {
                $ionicLoading.hide();
                $scope.imgagesUrl = './img/completeInf.png';
                $scope.successOrFaild = '至少选择一种比赛结果';
                $errorPopupFactory.errorInfo($scope, $state, 'lotteryFootball');
                return
            }
            var data = {
                lotteryID: '20201',
                payType: PayType,
                businessmanId: "0",
                addFlag: "0",
                vid: _vid,
                data: [{
                    investCode: investCode,
                    multiple: $scope.multiple,
                    betWay: '500',
                    planId: planId
                }]
            };
            console.info('单关参数', data);
            $http({
                method: "POST",
                url: ipUrl + '/service/lottery/footBallAdd?token=' + userInfo.data.token,
                data: data,
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 1000 * 10 * 6
            })
                .then(function (response) {
                    $ionicLoading.hide();
                    if (response.data.error === '0') {
                        $rootScope.giveMoney = '0';
                        $scope.imgagesUrl = './img/completeInfoSucceed.png';
                        $scope.successOrFaild = '投注' + response.data.info + '请到订单中查看!';
                        $errorPopupFactory.errorInfo($scope, $state, 'allOrders');
                        cancelBtnStatus();
                    }
                    else {
                        $scope.imgagesUrl = './img/completeInf.png';
                        $scope.successOrFaild = response.data.info + '错误码' + response.data.error;
                        $errorPopupFactory.errorInfo($scope, $state, 'lotteryFootball');
                    }
                })
        };

        function cancelBtnStatus() {
            investCode = '';
            playWayMethod = '';
            injection = 0;
            maxLossPercent = 0;
            $scope.betnum.forEach(function (value, index, array) {
                array[index] = false;
            });
            calculatePrize(injection, $scope.multiple);
        }


    });




