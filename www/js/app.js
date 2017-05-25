// Ionic Starter App
angular.module ('starter', ['ionic', 'starter.controllers', 'starter.services'])
    
    .run (function ($ionicPlatform) {
        $ionicPlatform.ready (function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar (true);
                cordova.plugins.Keyboard.disableScroll (true);
                
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault ();
            }
        });
    })
    
    .config (function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        //解决tabs在Android下局域顶部的方法
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
    
        //隐藏ion-nav-back-button的文字
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.backButton.previousTitleText(false);
        
        $stateProvider
            // setup an abstract state for the tabs directive
            .state ('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            
           //兑换
            .state ('tab.exchange', {
                url: '/exchange',
                views: {
                    'tab-exchange': {
                        templateUrl: 'templates/exchange.html',
                        controller: 'ExchangeCtrl'
                    }
                }
            })
            
            //账户
            .state ('tab.account', {
                url: '/account',
                cache:'false',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            //完善资料
            .state('completeInfo',{
                url:'/account/completeInfo',
                cache:'false',
                templateUrl:'templates/completeInfo.html',
                controller:'completeInfoCtrl'
            })

            //完善资料成功
            .state('completeInfoSucceed',{
                url:'/account/completeInfoEditSucceed',
                cache:'false',
                templateUrl:'templates/completeInfoSucceed.html',
                controller:'completeInfoSucceedCtrl'

            })

            //提现页面
            .state('widthdraw',{
                url:'/account/widthdraw',
                cache:'false',
                templateUrl:'templates/widthdraw.html',
                controller:'widthdrawCtrl'
            })

            //提现结果页面
            .state('widthdrawResult',{
                url:'/account/widthdrawResult',
                cache:'false',
                templateUrl:'templates/widthdrawResult.html',
                controller:'widthdrawResultCtrl'
            }) 

            //奖金纪录页面
            .state('prizeRecords',{
                url:'/account/prizeRecords',
                cache:'false',
                templateUrl:'templates/prizeRecords.html',
                controller:'prizeRecordsCtrl'
            })

            //全部订单页面
            .state('allOrders',{
                url:'/account/allOrders',
                cache:'false',
                templateUrl:'templates/allOrders.html',
                controller:'allOrdersCtrl'
            })

            //订单详情
            .state('orderDetail',{
                url:'/account/orderDetail',
                cache:'false',
                templateUrl:'templates/orderDetail.html',
                controller:'orderDetailCtrl'
            })

            //提现明细
            .state('widthdrawRecords',{
                url:'/account/widthdrawRecords',
                cache:'false',
                templateUrl:'templates/widthdrawRecords.html',
                controller:'widthdrawRecordsCtrl'
            });
        
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise ('/tab/exchange');
        
    });
