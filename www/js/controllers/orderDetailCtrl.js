/**
 * Created by admin on 2017/6/15.
 */
var url = "http://114.215.70.179:8088";
//订单详情
angular.module ('starter.orderDetailCtrl', ['starter.services'])
    
    .controller ('orderDetailCtrl', function ($scope, $rootScope, $state) {
        $scope.orderDetail = $rootScope.orderDetail;
        if ($scope.orderDetail.payType == '扫码兑换') {
            $scope.explainInfo = '*兑换资格已返还至待兑换处';
        }
        else {
            $scope.explainInfo = '*资金已返还至奖金余额';
        }
        $scope.failThenExchange = function () {
            
            //字符串转成数字
            for (var i = 0; i < $scope.orderDetail.investCode.length; i++) {
                for (var j = 0; j < $scope.orderDetail.investCode[i].length; j++) {
                    $scope.orderDetail.investCode[i][j] *= 1
                }
            }
            console.log ($scope.orderDetail.investCode);
            
            //返回排列5
            if ($scope.orderDetail.investCode[0].length == 5 && !$scope.orderDetail.investCode[1]) {
                var wrap5d = {
                    W_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][0]}],
                    Q_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][1]}],
                    B_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][2]}],
                    S_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][3]}],
                    G_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][4]}]
                };
                console.log (wrap5d);
                
                sessionStorage.editThisOrderData5D = JSON.stringify (wrap5d); //在本地保存选中的那组数据
                $state.go ('exchange-5');
            }
            else if ($scope.orderDetail.investCode[0].length == 3 && !$scope.orderDetail.investCode[1]) {
                var wrap3d = {
                    B_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][0]}],
                    S_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][1]}],
                    G_Bit: [{"check": true, "num": $scope.orderDetail.investCode[0][2]}]
                };
                console.log (wrap3d);
                
                sessionStorage.editThisOrderData3d = JSON.stringify (wrap3d); //在本地保存选中的那组数据
                $state.go ('exchange-3');
            }
            else {
                var wrapBigLotto = {
                    red: [
                        {"check": true, "num": $scope.orderDetail.investCode[0][0]},
                        {"check": true, "num": $scope.orderDetail.investCode[0][1]},
                        {"check": true, "num": $scope.orderDetail.investCode[0][2]},
                        {"check": true, "num": $scope.orderDetail.investCode[0][3]},
                        {"check": true, "num": $scope.orderDetail.investCode[0][4]}
                    ],
                    blue: [
                        {"check": true, "num": $scope.orderDetail.investCode[1][0]},
                        {"check": true, "num": $scope.orderDetail.investCode[1][1]}
                    ]
                };
                console.log (wrapBigLotto);
                
                sessionStorage.editThisOrderData = JSON.stringify (wrapBigLotto); //在本地保存选中的那组数据
                $state.go ('BigLotto-2');
            }
            
        };
    });
