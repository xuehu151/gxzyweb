/**
 * Created by admin on 2017/6/15.
 */
var url = "http://lottery.zhenlong.wang";
//var url = 'http://103.235.237.134';      //本地ip地址或者域名

//订单详情
angular.module('starter.orderDetailCtrl', ['starter.services']).controller('orderDetailCtrl', function($scope, $rootScope, $state) {
  $scope.orderDetail = $rootScope.orderDetail;
  console.log($scope.orderDetail);
  if ($scope.orderDetail.payType.indexOf('¥') == -1) {
    $scope.explainInfo = '*兑换资格已返还至待兑换';
  }

  else {
    $scope.explainInfo = '*资金已返还至奖金余额';
  }
  var returnCode = [];

  if ($scope.orderDetail.investCode[0].length == 1) {
    returnCode.push($scope.orderDetail.investCode[0][0].slice(0));
  } else if ($scope.orderDetail.investCode[0].length == 2) {
    returnCode = $scope.orderDetail.investCode[0];
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
