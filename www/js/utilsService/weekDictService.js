/**
 * Created by admin on 2018/5/24.
 */
//提现记录
angular.module('starter.week', [])
    .factory('$WeekFactory', function () {
        return {
            weekDict: function (week) {
                var weekText;
                switch (week) {
                    case 1:
                        weekText = '周一';
                        break;
                    case 2:
                        weekText = '周二';
                        break;
                    case 3:
                        weekText = '周三';
                        break;
                    case 4:
                        weekText = '周四';
                        break;
                    case 5:
                        weekText = '周五';
                        break;
                    case 6:
                        weekText = '周六';
                        break;
                    case 7:
                        weekText = '周日';
                        break;
                    default:
                }
                return weekText
            }
        };


    });


