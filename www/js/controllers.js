angular.module('starter.controllers', []).controller('ExchangeCtrl', function($scope) {})
    //ngMessages
    //账户页面
    .controller('AccountCtrl', ['$scope','$rootScope','$ionicPopup','$state','$ionicModal','$http','locals','getData',function($scope,$rootScope, $ionicPopup, $state,$ionicModal,$http,locals,getData) {

        //验证是否资料完善
         var url="http://192.168.0.137:8080/common/index?token=28fa9fa2c554268d4c0721b05c29908064bcec105a4b6865cec9b08a6fbbf2c2eb1104b0e43019e4ae600575d40d5f4ddcd145c5f0c61013aabe538ca71c3b3df3f822af1e7cb86f292af6ef8c0ea664c9ccecd6c7f682be7a6316bde41f6618e4b28bbd9168bc5d0c135618f5a2710ddf004b45301bd90112e6ba4f540ed792416ce9";
         
         getData.getInfo(url).then(function (response) {
          console.log(response)
          
           $rootScope.user={}  //保存token和用户信息
          locals.setObject($rootScope.user,response.data)
          console.log(locals.getObject($rootScope.user))
          $scope.useableMoney=locals.getObject($rootScope.user).user.money;

          $scope.frozedMoney=locals.getObject($rootScope.user).user.freeze;

          $scope.totalMoney=$scope.useableMoney + $scope.frozedMoney;

        },function () {
            console.log('no')
        })

        /*getData.then(function (data) {
          console.log(data)  
        },function () {
            alert(11)
        })*/

        $scope.withdrawConfirm = function() {

            if (locals.getObject($scope.user).user.realName) 
            {
                 $scope.modal.show();
            }
            else
            {
                var confirmPopup = $ionicPopup.confirm({
                    title: '完善资料',
                    template: '<p style="text-align:center;"><img src="./img/completeInf.png"></p>' + '当前个人资料尚未完善，无法提现；完善个人资料后即可立即提现！',
                    // templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                    cancelText: '暂不完善', // String (默认: 'Cancel')。一个取消按钮的文字。
                    cancelType: '', // String (默认: 'button-default')。取消按钮的类型。
                    okText: '立即完善', // String (默认: 'OK')。OK按钮的文字。
                    okType: 'button-positive', // String (默认: 'button-positive')。OK按钮的类型。
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $state.go('completeInfo')
                    } else {
                        $state.go('widthdraw'); //暂时先把提现页面放这里
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
        $scope.toggleShowAnswer=function () {
            $scope.showAnswer=!$scope.showAnswer;
        };

        $scope.showAnswer=false;

        //转到奖金纪录页面
        $scope.toPrizeRecords=function () 
        {
            $state.go('prizeRecords')
        };

        //转到全部订单页面
        $scope.toAllOrders=function () 
        {
            $state.go('allOrders')
        };

        //转到提现明细页面
        $scope.toWidthdrawRecords=function () 
        {
            $state.go('widthdrawRecords')
        };


        //弹出提现框
        $ionicModal.fromTemplateUrl('accountModal.html',{
            scope:$scope
        }).then(function (modal) {
            $scope.modal=modal;
        });

        $scope.openModal = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        $scope.widthdraw=function () {
            // body...
        }
        
    }])

    //完善个人资料
    .controller('completeInfoCtrl', ['$scope','$rootScope','$state','locals','getData',function($scope,$rootScope, $state,locals,getData) {
        $scope.users={
            realName:'',
            phone:'',
            idcard: '',
            weixin:''
        };

        var noThing=locals.getObject($rootScope.user)
        console.log(noThing)

        $scope.submitInfo = function() {

            /**
             * 功能:把提交的值保存到localstorage
             *     1.先用对象noThing存储localstorage
             *     2.再把ng-model值赋进来
             *     3.再把这个对象赋给localstorage
             */
            noThing.user.realName=$scope.users.realName;
            noThing.user.phone=$scope.users.phone;
            noThing.user.idcard=$scope.users.idcard;
            noThing.user.weixin=$scope.users.weixin;

            locals.setObject($rootScope.user,noThing)
            console.log(locals.getObject($rootScope.user))


            /**
             * 功能:把提交的值提交到服务器
             */
            // var addToken=locals.getObject($rootScope.user).toen;
            // getData.getInfo('http://121.42.253.149:18820/service/customer/add',token)


            $state.go('completeInfoSucceed')
        }
    }])

    //完善个人资料成功
    .controller('completeInfoSucceedCtrl', ['$scope','$state',function($scope,$state) {
        $scope.toAccount=function () {
            $state.go('tab.account')
        }
    }])

    //提现页面
    .controller('widthdrawCtrl',['$scope','$state',function ($scope,$state) {
      $scope.confirmWidthdraw=function () 
      {
        $state.go('widthdrawResult')
      }
    }])

    //提现结果页面
    .controller('widthdrawResultCtrl',['$scope',function ($scope) {
      // body...
    }])

    //奖金纪录页面
    .controller('prizeRecordsCtrl',['$scope','$rootScope','getData',function ($scope,$rootScope,getData) {
      $rootScope.infos=[
      {
      isIncome : false,
      exchangeClass:'奖金兑换',
      exchangeTime:'2017-05-16 08:88:88',
      exchangeMoney:-3.00,
      exchangeType:'支出'
      },
      {
      isIncome:false,
      exchangeClass:'奖金兑换',
      exchangeTime:'2017-05-16 08:88:88',
      exchangeMoney:-3.00,
      exchangeType:'支出'
      }
    ]
    }])

    //全部订单页面
    .controller('allOrdersCtrl',['$scope','$state','getData',function ($scope,$state,getData) {
      $scope.toOrderDetail=function () 
      {
          $state.go('orderDetail')
      }
    }])

    //订单详情
    .controller('orderDetailCtrl',['$scope','getData',function ($scope,getData) {
      
    }])

    //提现明细
    .controller('widthdrawRecordsCtrl',['$scope','$rootScope','$rootScope','locals','getData',function ($scope,$rootScope,$rootScope,locals,getData) {
      $scope.widthdrawItems={}
      
      // getData.getInfo("http://121.42.253.149:18820/service/customer/getList",locals.getObject($scope.user).toke)
      console.log(locals.getObject($rootScope.user))


    }]);
