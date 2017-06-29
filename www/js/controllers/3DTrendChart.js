/**
 * Created by admin on 2017/6/27.
 */
//排列3 走势图
angular.module ('starter.3DTrendChart', [])
    
    .controller ('3DTrendChart', function ($scope, $ionicScrollDelegate) {
        $scope.data = [
            {
                'zoneName': '1',
                'arriveTickets': '6987',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '2',
                'arriveTickets': '2356',
                'moniOutCnt': '331',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '3',
                'arriveTickets': '6744',
                'moniOutCnt': '2621',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '4',
                'arriveTickets': '6542',
                'moniOutCnt': '2881',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '5',
                'arriveTickets': '2367',
                'moniOutCnt': '5621',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '6',
                'arriveTickets': '1129',
                'moniOutCnt': '1221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '7',
                'arriveTickets': '7893',
                'moniOutCnt': '4521',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '8',
                'arriveTickets': '2356',
                'moniOutCnt': '7821',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '9',
                'arriveTickets': '67554',
                'moniOutCnt': '9921',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '10',
                'arriveTickets': '5534',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '11',
                'arriveTickets': '6643',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '12',
                'arriveTickets': '6546',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '13',
                'arriveTickets': '4353',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '14',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '14',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '14',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '66',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '45',
                'moniUndeliveryCnt': '44'
            },
            {
                'zoneName': '45',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '4500',
                'moniUndeliveryCnt': '43334'
            },
            {
                'zoneName': '22',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '455',
                'moniUndeliveryCnt': '4464'
            },
            {
                'zoneName': '20',
                'arriveTickets': '4526',
                'moniOutCnt': '2221',
                'moniStayCnt': '233',
                'moniUndeliveryCnt': '4454'
            }
        ];
        $scope.h = Math.min (document.documentElement.clientHeight, window.innerHeight) - 44 - 50;
        $scope.scrollRightHorizon = function () {
            var rightHandle = $ionicScrollDelegate.$getByHandle ("rightContainerHandle");
            var headHandle = $ionicScrollDelegate.$getByHandle ("headContainerHandle");
            var leftHandle = $ionicScrollDelegate.$getByHandle ("leftContainerHandle");
            headHandle.scrollTo (rightHandle.getScrollPosition ().left, 0, false);
            leftHandle.scrollTo (0, rightHandle.getScrollPosition ().top, false);
        };
        $scope.noScroll = function () {
            var headHandle = $ionicScrollDelegate.$getByHandle ("headContainerHandle");
            headHandle.freezeScroll (true);
            var leftHandle = $ionicScrollDelegate.$getByHandle ("leftContainerHandle");
            leftHandle.freezeScroll (true);
        };
        
        $scope.dataArrange = [];
        $scope.drawCount = [];
        for (var i = 0; i < 10; i++) {
            $scope.dataArrange.push (i);
        }
        for (var j = 1; j < 4; j++) {
            $scope.drawCount.push (j);
        }
        
    });
