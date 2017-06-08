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
    
    .config (function ($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider, $locationProvider) {
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
        
         //添加http请求头文件
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    
        $locationProvider.html5Mode(false);
        
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
    
            //兑换 排列3
            .state ('exchange-3', {
                url: '/exchange-3',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/exchange-3.html',
                controller: 'Exchange-3Ctrl'
            })
    
            //兑换 排列3  网期开奖详情
            .state ('exchaangehistory3D', {
                url: '/exchaangehistory3D',
                prefetchTemplate:false,
                templateUrl: 'templates/exchangehistory3D.html',
                controller: 'Exchaangehistory3DCtrl'
            })
    
            //兑换 排列3  详情
            .state ('exchange-3Details', {
                url: '/exchange-3Details',
                prefetchTemplate:false,
                templateUrl: 'templates/exchange-3Details.html',
                controller: 'Exchange-3DetailsCtrl'
            })
    
            //兑换 排列5
            .state ('exchange-5', {
                url: '/exchange-5',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/exchange-5.html',
                controller: 'Exchange-5Ctrl'
        
            })
    
            //兑换 排列5  网期开奖详情
            .state ('exchangehistory5D', {
                url: '/exchangehistory5D',
                prefetchTemplate:false,
                templateUrl: 'templates/exchangehistory5D.html',
                controller: 'Exchangehistory5DCtrl'
            })
    
            //兑换 排列5 详情
            .state ('exchange-5Details', {
                url: '/exchange-5Details',
                prefetchTemplate:false,
                templateUrl: 'templates/exchange-5Details.html',
                controller: 'Exchange-5DetailsCtrl'
        
            })
    
            //兑换 大乐透 不追加
            .state ('BigLotto-2', {
                url: '/BigLotto-2/:flag2',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/BigLotto-2.html',
                controller: 'BigLotto-2Ctrl'
            })
    
            //兑换 大乐透 不追加详情
            .state ('bettingDetail', {
                url: '/bettingDetail/:flag3',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/bettingDetail.html',
                controller: 'bettingDetailCtrl'
            })
    
            //兑换 大乐透往期开奖详情
            .state ('bigLottoHistoryDetails', {
                url: '/bigLottoHistoryDetails',
                prefetchTemplate:false,
                templateUrl: 'templates/bigLottoHistoryDetails.html',
                controller: 'bigLottoHistoryDetailsCtrl'
            })

            //扫码兑换首页
            .state ('scanCodeIndex', {
                url: '/scanCodeIndex',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/scanCodeIndex.html',
                controller: 'scanCodeIndexCtrl'
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
                prefetchTemplate:false,
                templateUrl:'templates/completeInfo.html',
                controller:'completeInfoCtrl'
            })

            //完善资料成功
            .state('completeInfoSucceed',{
                url:'/account/completeInfoEditSucceed',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/completeInfoSucceed.html',
                controller:'completeInfoSucceedCtrl'

            })

            //提现页面
            .state('widthdraw',{
                url:'/account/widthdraw',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/widthdraw.html',
                controller:'widthdrawCtrl'
            })

            //提现结果页面
            .state('widthdrawResult',{
                url:'/account/widthdrawResult',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/widthdrawResult.html',
                controller:'widthdrawResultCtrl'
            })

            .state('needExchange',{
                url:'/account/needExchange',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/needExchange.html',
                controller:'needExchangeCtrl'
            })

            //奖金纪录页面
            .state('prizeRecords',{
                url:'/account/prizeRecords',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/prizeRecords.html',
                controller:'prizeRecordsCtrl'
            })

            //全部订单页面
            .state('allOrders',{
                url:'/account/allOrders',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/allOrders.html',
                controller:'allOrdersCtrl'
            })

            //订单详情
            .state('orderDetail',{
                url:'/account/orderDetail',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/orderDetail.html',
                controller:'orderDetailCtrl'
            })

            //提现明细
            .state('widthdrawRecords',{
                url:'/account/widthdrawRecords',
                cache:'false',
                prefetchTemplate:false,
                templateUrl:'templates/widthdrawRecords.html',
                controller:'widthdrawRecordsCtrl'
            });
        
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise ('/tab/exchange');
        
    });
