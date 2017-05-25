angular.module('starter.controllers', ['ngMessages']).controller('ExchangeCtrl', function($scope) {})
    //ngMessages
    //账户页面
    .controller('AccountCtrl', ['$scope','$rootScope','$ionicPopup','$state','$ionicModal','$http','locals','getUser',function($scope,$rootScope, $ionicPopup, $state,$ionicModal,$http,locals,getUser) {

        //验证是否资料完善
         var url="http://121.42.253.149:18820/service/common/index";
         var token="28fa9fa2c554268d4c0721b05c29908064bcec105a4b6865cec9b08a6fbbf3c0e31104b0e43019e4ae600575d40d5f4ddcca4be3dac61013a8f1518dac006025ebe832a13856b86f2928a0f28806b063dcc0f184dfee91bb776f13bde6186715efb684a69f4e965d0c135449efac7841c7185c443118de0511e1be4e550dd09555449ed0";

         getUser.getInfo(url,token).then(function (response) {
          
          var userInfo=response.data
          console.log(userInfo)
          // $rootScope.user={}  //保存token和用户信息
          locals.setObject($rootScope.user,userInfo)
          console.log(locals.getObject($rootScope.user))
          $scope.useableMoney=locals.getObject($rootScope.user).user.money;

          $scope.frozedMoney=locals.getObject($rootScope.user).user.freeze;

          $scope.totalMoney=$scope.useableMoney + $scope.frozedMoney;

          //提现时候的账户号码
          $rootScope.accountNum=[
          {chanel:1,num: '('+userInfo.user.alipay+')'},
          {chanel:2,num: '('+userInfo.user.wechat+')'},
          {chanel:3,num: '('+userInfo.user.bankNo+')'}
          ];
          console.log($rootScope.accountNum)
        },function () {
            console.log('no')
        })

        /*postData.then(function (data) {
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
        };

        $scope.toWidthdraw=function (chanel) {

            $rootScope.chanel=chanel;
            $scope.modal.hide();
            $state.go('widthdraw')
        }
        
    }])

    //完善个人资料
    .controller('completeInfoCtrl', ['$scope','$rootScope','$state','locals','postData',function($scope,$rootScope, $state,locals,postData) {
        $scope.users={
            realName:'',
            phone:'',
            idcard: '',
            wechat:'',
            alipay:'',
            bankNo:'',
        };

        $rootScope.addData=locals.getObject($rootScope.user)
        console.log($rootScope.addData)

        $scope.submitInfo = function() {

            /**
             * 功能:把提交的值保存到localstorage
             *     1.先用对象$rootScope.addData存储localstorage
             *     2.再把ng-model值赋进来
             *     3.再把这个对象赋给localstorage
             */
            $rootScope.addData.user.realName=$scope.users.realName;
            $rootScope.addData.user.phone=$scope.users.phone;
            $rootScope.addData.user.idcard=$scope.users.idcard;
            $rootScope.addData.user.wechat=$scope.users.wechat;
            $rootScope.addData.user.alipay=$scope.users.alipay;
            $rootScope.addData.user.bankNo=$scope.users.bankNo;

            locals.setObject($rootScope.user,$rootScope.addData)


            /**
             * 功能:把提交的值提交到服务器
             */
            // $rootScope.addData=locals.getObject($rootScope.user);
            console.log($rootScope.addData)
            postData.getInfo('http://121.42.253.149:18820/service/customer/add',$rootScope.addData)
            .then(function (data) {
                console.log(data);
                $state.go('completeInfoSucceed');
            },function () {
                alert('wrong')
            })
            
        }
    }])

    //完善个人资料成功
    .controller('completeInfoSucceedCtrl', ['$scope','$state',function($scope,$state) {
        $scope.toAccount=function () {
            $state.go('tab.account')
        }
    }])

    //提现页面
    .controller('widthdrawCtrl',['$scope','$state','$rootScope','getUser','locals','postData',function ($scope,$state,$rootScope,getUser,locals,postData) {
      var widthdrawLocals=locals.getObject($rootScope.user);
      var getUserUrl="http://121.42.253.149:18820/service/customer/getUser"
      var token=widthdrawLocals.toke;

      getUser.getInfo(getUserUrl,token)
      .then(function (response) {
           $scope.widthdrawAble=response.data.money
      },function () {
          alert('wrong')
      });

      $scope.widthdrawMoney='';
      $scope.whetherShow=true;
      $scope.whetherOK=function (widthdrawMoney) {
          if (widthdrawMoney>$scope.widthdrawAble) 
          {
            $scope.cantWidthdraw='输入金额超出可提现余额';
            $scope.whetherShow=false;

          }
          else
          {
            $scope.cantWidthdraw='';
            $scope.whetherShow=true;
          }
        $scope.widthdrawMoney=widthdrawMoney ;
      }

      $scope.widthdrawAll=function () {
           $scope.widthdrawMoney=$scope.widthdrawAble
      };

      $scope.confirmWidthdraw=function (widthdrawMoney) 
      {
        /*//小于10元扣除1元手续费
        if ($scope.widthdrawMoney<=10 && $scope.widthdrawMoney>1) 
        {
            widthdrawLocals.money--;
            console.log(widthdrawLocals)
        };*/
        var url='http://121.42.253.149:18820/service/cash/add'+'?chanel='+ $rootScope.chanel +'&money='+ $scope.widthdrawMoney
        var token=locals.getObject($rootScope.user).toke;
        console.log($rootScope.chanel);
        console.log($scope.widthdrawMoney);

        getUser.getInfo(url,token).then(function () {
            alert('right')
        },function () {
            alert('wrong')
        })

        $state.go('widthdrawResult')
      };
    }])

    //提现结果页面
    .controller('widthdrawResultCtrl',['$scope',function ($scope) {
      // body...
    }])

    //奖金纪录页面
    .controller('prizeRecordsCtrl',['$scope','$rootScope','postData',function ($scope,$rootScope,postData) {
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
    .controller('allOrdersCtrl',['$scope','$state','postData',function ($scope,$state,postData) {
      $scope.toOrderDetail=function () 
      {
          $state.go('orderDetail')
      }
    }])

    //订单详情
    .controller('orderDetailCtrl',['$scope','postData',function ($scope,postData) {
      
    }])

    //提现明细
    .controller('widthdrawRecordsCtrl',['$scope','$rootScope','$rootScope','locals','postData',function ($scope,$rootScope,$rootScope,locals,postData) {
      $scope.widthdrawItems={}
      
      // postData.getInfo("http://121.42.253.149:18820/service/customer/getList",locals.getObject($scope.user).toke)
      console.log(locals.getObject($rootScope.user))


    }]);
