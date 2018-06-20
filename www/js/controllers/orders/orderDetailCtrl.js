/**
 * Created by admin on 2017/6/15.
 */
//订单详情
angular.module('starter.orderDetailCtrl', ['starter.services'])
    .controller('orderDetailCtrl', function ($scope, $rootScope, $state, $util, $footballInfo, $footBallDetails, $WeekFactory, $errorPopupFactory) {
        var ballInfo = $scope.orderDetail = $rootScope.orderDetail;
        var userInfo = $util.getUserInfo();
        var data = {
            ballPlanId: ballInfo.planId
        };
        var palyWay = '';
        console.info('ballInfo', ballInfo);

        if (ballInfo.lotteryList[0].betWay === '500' || ballInfo.lotteryList[0].betWay === '502') {
            ballInfo.wareIssue = '';
            if (ballInfo.lotteryList[0].betWay === '500') {
                ballInfo.lotteryID = '世界杯（单关）';
                palyWay = '单关';
            } else if (ballInfo.lotteryList[0].betWay === '502') {
                ballInfo.lotteryID = '世界杯（2串1）';
                palyWay = '2串1';
            }
            var lotteryListArr = [];
            var investCode = ballInfo.lotteryList[0].investCode;
            var splitCode = investCode.split('^');
            splitCode.pop();
            $footballInfo.getFootballPlan(data, userInfo.data.token)
                .then(function (response) {
                    console.info('response*******', response);
                    if (response.error === '0') {
                        var lotteryList = $footBallDetails.footBallDetails(response.data[0]);
                        console.info('lotteryList', lotteryList);
                        for (var i = 0; i < splitCode.length; i++) {
                            lotteryListArr = splitCode[i].split('|');
                            lotteryList[i].betWay = ballInfo.betWay;
                            lotteryList[i].code = lotteryListArr[lotteryListArr.length - 1];
                            var result = response.data[0][0].result.split(':');
                            if (ballInfo.betWay === '500') {
                                $scope.lastCode = [];
                                var lastCode = lotteryList[i].code.split('');
                                lastCode.forEach(function (list, p2, p3) {
                                    var codeNum = {};
                                    if(list === '3'){
                                        codeNum.code = '主胜';
                                        codeNum.lossPercent = response.data[0][0].v3;
                                    }
                                    else  if(list === '1'){
                                        codeNum.code = '平';
                                        codeNum.lossPercent = response.data[0][0].v1;
                                    }else  if(list === '0'){
                                        codeNum.code = '主负';
                                        codeNum.lossPercent = response.data[0][0].v0;
                                    }
                                    $scope.lastCode.push(codeNum);
                                });
                                if (result[0] > result[1]) {
                                    lotteryList[i].code = '主胜';
                                    lotteryList[i].lossPercent = lotteryList[i].v3;
                                    lotteryList[i].amidithion = '主胜';
                                }
                                else if (result[0] === result[1]) {
                                    lotteryList[i].code = '平局';
                                    lotteryList[i].lossPercent = lotteryList[i].v1;
                                    lotteryList[i].amidithion = '平';
                                }
                                else if (result[0] < result[1]) {
                                    lotteryList[i].code = '负';
                                    lotteryList[i].lossPercent = lotteryList[i].v0;
                                    lotteryList[i].amidithion = '负';
                                }
                                else {
                                    lotteryList[i].code = '等待开奖';
                                }
                            }
                            else if (ballInfo.betWay === '502') {
                                if (lotteryList[i].code === '3') {
                                    lotteryList[i].code = '主胜';
                                    lotteryList[i].lossPercent = lotteryList[i].v3;
                                }
                                else if (lotteryList[i].code === '0') {
                                    lotteryList[i].code = '客胜';
                                    lotteryList[i].lossPercent = lotteryList[i].letv3;
                                }

                                if(result[0] > result[1]){
                                    lotteryList[i].amidithion = '主胜';
                                }
                                else if (result[0] < result[1]) {
                                    lotteryList[i].amidithion = '客胜';
                                }
                                else if (result[0] === result[1]) {
                                    response.data[0].forEach(function (obj, p2, p3) {
                                        if(obj.rqspfRateCount === '1'){
                                            lotteryList[i].amidithion = '客胜';
                                        }
                                        else if(obj.rqspfRateCount === '-1'){
                                            lotteryList[i].amidithion = '主胜';
                                        }
                                    });
                                }
                            }
                        }
                        $scope.orderInfos = {
                            lotteryList: lotteryList,
                            fewGames: lotteryList.length,
                            palyWay: palyWay,
                            multiple: ballInfo.lotteryList[0].multiple
                        };
                    }else {
                        $scope.imgagesUrl = './img/completeInf.png';
                        $scope.successOrFaild = '服务请求失败， 错误码' + response.error;
                        $errorPopupFactory.errorInfo ($scope, $state ,'allOrders');
                    }
                });
        }
        else {
            ballInfo.openTime = '开奖时间 : ' + ballInfo.openTime;
            ballInfo.wareIssue = '第' + ballInfo.wareIssue + '期';
            if ($scope.orderDetail.payType.indexOf('¥') == -1) {
                $scope.explainInfo = '*兑换资格已返还至待兑换';
            }
            else {
                $scope.explainInfo = '*资金已返还至奖金余额';
            }
            var returnCode = [];  //显示的球号码

            if ($scope.orderDetail.investCode[0].length == 1) {
                returnCode.push($scope.orderDetail.investCode[0][0].slice(0));
            }
            else if ($scope.orderDetail.investCode[0].length == 2) {
                returnCode = $scope.orderDetail.investCode[0];
            }

        }


        /*$scope.failThenExchange = function() {
         if ($scope.orderDetail.investCode.length == 1)
         {
         //字符串转成数字
         if ($scope.orderDetail.investCode[0].length == 1) {
         for (var i = 0; i < returnCode.length; i++) {
         for (var j = 0; j < returnCode[i].length; j++) {
         returnCode[i][j] = returnCode[i][j] * 1;
         }
         };
         }
         //返回排列5
         if (returnCode[0].length == 5 && !returnCode[1]) {
         var wrap5d = {
         W_Bit: [{
         "check": true,
         "num": returnCode[0][0]
         }],
         Q_Bit: [{
         "check": true,
         "num": returnCode[0][1]
         }],
         B_Bit: [{
         "check": true,
         "num": returnCode[0][2]
         }],
         S_Bit: [{
         "check": true,
         "num": returnCode[0][3]
         }],
         G_Bit: [{
         "check": true,
         "num": returnCode[0][4]
         }]
         };
         console.log(wrap5d);
         sessionStorage.editThisOrderData5D = JSON.stringify(wrap5d); //在本地保存选中的那组数据
         $state.go('exchange-5');
         } else if (returnCode[0].length == 3 && !returnCode[1]) {
         var wrap3d = {
         B_Bit: [{
         "check": true,
         "num": returnCode[0][0]
         }],
         S_Bit: [{
         "check": true,
         "num": returnCode[0][1]
         }],
         G_Bit: [{
         "check": true,
         "num": returnCode[0][2]
         }]
         };
         console.log(wrap3d);
         sessionStorage.editThisOrderData3D = JSON.stringify(wrap3d); //在本地保存选中的那组数据
         $state.go('exchange-3');
         } else {
         var wrapBigLotto = {
         red: [{
         "check": true,
         "num": returnCode[0][0]
         }, {
         "check": true,
         "num": returnCode[0][1]
         }, {
         "check": true,
         "num": returnCode[0][2]
         }, {
         "check": true,
         "num": returnCode[0][3]
         }, {
         "check": true,
         "num": returnCode[0][4]
         }],
         blue: [{
         "check": true,
         "num": returnCode[1][0]
         }, {
         "check": true,
         "num": returnCode[1][1]
         }]
         };
         console.log(wrapBigLotto);
         sessionStorage.editThisOrderData = JSON.stringify(wrapBigLotto); //在本地保存选中的那组数据
         $state.go('BigLotto-2');
         }
         }
         else if ($scope.orderDetail.investCode.length > 1)
         {

         if ($scope.orderDetail.lotteryID=='排列三')
         {
         sessionStorage.editThisOrderData3D='';
         $state.go('exchange-3');
         }
         else if ($scope.orderDetail.lotteryID=='排列五')
         {
         sessionStorage.editThisOrderData5D= '';
         $state.go('exchange-5');
         }
         else if ($scope.orderDetail.lotteryID=='大乐透')
         {
         sessionStorage.editThisOrderData = '';
         $state.go('BigLotto-2');
         }
         }
         };*/

    });
