// Ionic Starter App

var jsonWrap = []; //存放所有的注数
var jsonWrapBit3D = []; //点击向右的修改后返回来时数据的存放
var jsonWrapBit5D = []; //点击向右的修改后返回来时数据的存放
var sign = '';
var type = '';
var PayType = '';//判断是否为老用户扫码进来 0 新用户 1 老用户扫码

angular.module ('starter', ['ionic','ngCordova', 'ionic-toast', 'starter.controllers', 'starter.services', 'starter.util', 'starter.ExchangeCtrl', 'starter.scanCodeIndexCtrl', 'starter.Exchange-3Ctrl', 'starter.Exchange-3DetailsCtrl', 'starter.Exchangehistory3DCtrl', 'starter.Exchange-5Ctrl', 'starter.Exchange-5DetailsCtrl', 'starter.Exchangehistory5DCtrl', 'starter.BigLotto-2Ctrl', 'starter.bettingDetailCtrl', 'starter.bigLottoHistoryDetailsCtrl', 'starter.AccountCtrl', 'starter.completeInfoCtrl', 'starter.completeInfoSucceedCtrl', 'starter.widthdrawResultCtrl', 'starter.prizeRecordsCtrl', 'starter.allOrdersCtrl', 'starter.orderDetailCtrl', 'starter.widthdrawRecordsCtrl', 'starter.widthdrawCtrl', 'starter.DrawCtrl', 'starter.TrendCtrl', 'starter.3DTrendChart', 'starter.5DTrendChart', 'starter.bigTrendChart'])

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
        //解决tabs在Android顶部的方法
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');// 参数可以是： standard | striped => 带条
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        $ionicConfigProvider.views.maxCache (0);

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
            .state ('exchangehistory3D', {
                url: '/exchangehistory3D',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/exchangehistory3D.html',
                controller: 'Exchangehistory3DCtrl'
            })

            //兑换 排列3  详情
            .state ('exchange-3Details', {
                url: '/exchange-3Details',
                prefetchTemplate:false,
                templateUrl: 'templates/exchange-3Details.html',
                controller: 'Exchange-3DetailsCtrl'
            })

            //兑换 3D玩法说明
            .state ('3DrabbitRules', {
                url: '/3DrabbitRules',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/3DrabbitRules.html'
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

            //兑换 5D 玩法说明
            .state ('5DrabbitRules', {
                url: '/5DrabbitRules',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/5DrabbitRules.html'
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

            //兑换 大乐透 玩法说明
            .state ('bigRabbitRules', {
                url: '/bigRabbitRules',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/bigRabbitRules.html'
            })

            //扫码兑换首页
            .state ('scanCodeIndex', {
                url: '/scanCodeIndex',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/scanCodeIndex.html',
                controller: 'scanCodeIndexCtrl'
            })

            //开奖
            .state ('tab.draw', {
                url: '/draw',
                cache:'false',
                prefetchTemplate:false,
                views: {
                    'tab-draw': {
                        templateUrl: 'templates/draw.html',
                        controller: 'DrawCtrl'
                    }
                }
            })

            .state ('tab.draw.bigLottoHistoryDetails', {
                url: '/bigLottoHistoryDetails',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/bigLottoHistoryDetails.html',
                controller: 'bigLottoHistoryDetailsCtrl'
            })

            .state ('tab.draw.exchangehistory3D', {
                url: '/exchangehistory3D',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/exchangehistory3D.html',
                controller: 'Exchangehistory3DCtrl'
            })

            .state ('tab.draw.exchangehistory5D', {
                url: '/exchangehistory5D',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/exchangehistory5D.html',
                controller: 'Exchangehistory5DCtrl'
            })

            //走势图
            .state ('tab.trend', {
                url: '/trend',
                cache:'false',
                prefetchTemplate:false,
                views: {
                    'tab-trend': {
                        templateUrl: 'templates/trend.html',
                        controller: 'TrendCtrl'
                    }
                }
            })

            .state ('tab.trend.bigTrendChart', {
                url: '/bigTrendChart',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/bigTrendChart.html',
                controller: 'bigTrendChart'
            })

            .state ('tab.trend.3DTrendChart', {
                url: '/3DTrendChart',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/3DTrendChart.html',
                controller: '3DTrendChart'
            })

            .state ('tab.trend.5DTrendChart', {
                url: '/5DTrendChart',
                cache:'false',
                prefetchTemplate:false,
                templateUrl: 'templates/5DTrendChart.html',
                controller: '5DTrendChart'
            })

            //账户
            .state ('tab.account', {
                url: '/account',
                cache:'false',
                prefetchTemplate:false,
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
                cache:'true',
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
                cache:'true',
                prefetchTemplate:false,
                templateUrl:'templates/widthdrawResult.html',
                controller:'widthdrawResultCtrl'
            })

            .state('needExchange',{
                url:'/account/needExchange',
                cache:'true',
                prefetchTemplate:false,
                templateUrl:'templates/needExchange.html',
                controller:'needExchangeCtrl'
            })

            //奖金纪录页面
            .state('prizeRecords',{
                url:'/account/prizeRecords',
                cache:'true',
                prefetchTemplate:false,
                templateUrl:'templates/prizeRecords.html',
                controller:'prizeRecordsCtrl'
            })

            //全部订单页面
            .state('allOrders',{
                url:'/account/allOrders',
                cache:'true',
                prefetchTemplate:false,
                templateUrl:'templates/allOrders.html',
                controller:'allOrdersCtrl'
            })

            //订单详情
            .state('orderDetail',{
                url:'/account/orderDetail',
                cache:'true',
                prefetchTemplate:false,
                templateUrl:'templates/orderDetail.html',
                controller:'orderDetailCtrl'
            })

            //提现明细
            .state('widthdrawRecords',{
                url:'/account/widthdrawRecords',
                cache:'true',
                prefetchTemplate:false,
                templateUrl:'templates/widthdrawRecords.html',
                controller:'widthdrawRecordsCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise ('/tab/exchange');

    });
