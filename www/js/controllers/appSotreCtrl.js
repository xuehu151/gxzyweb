/**
 * Created by admin on 2018/1/25.
 */
angular.module ('starter.appSotreCtrl', [])

    .controller ('appSotreCtrl', function ($scope, $ionicModal) {
        
        var ua = navigator.userAgent.toLowerCase ();
        var isWeixin = ua.indexOf ('micromessenger') != -1;
        if (isWeixin) {
           // $scope.modalTips.show ();
            modalTips();
            window.addEventListener ("popstate", function (e) {
                if ($scope.modalTips.show ()) {
                    $scope.modalTips.hide ();
                }
            }, false);
        }
        else {
            $scope.oncedownloading = function () {
                window.location.href = 'http://s.baibaocp.com/app/bbcp_gouli_v2.apk';
            };
            $scope.iPhoneOpen = function () {
                var phoneUrl = 'http://m.baibaocp.com/index2.php?qd=1001';
                window.open (phoneUrl, '_blank');
            }
        }

        /*$scope.oncedownloading = function () {
            var ua = navigator.userAgent.toLowerCase ();
            var isWeixin = ua.indexOf ('micromessenger') != -1;
            if (isWeixin) {
                $scope.modalTips.show ();
                window.addEventListener ("popstate", function (e) {
                    if ($scope.modalTips.show ()) {
                        $scope.modalTips.hide ();
                    }
                }, false);
            }
            else {
                window.location.href = 'http://s.baibaocp.com/app/bbcp_gouli_v2.apk';
            }
        };
        $scope.iPhoneOpen = function () {
            var ua = navigator.userAgent.toLowerCase ();
            var isWeixin = ua.indexOf ('micromessenger') != -1;
            if (isWeixin) {
                $scope.modalTips.show ();
                window.addEventListener ("popstate", function (e) {
                    if ($scope.modalTips.show ()) {
                        $scope.modalTips.hide ();
                    }
                }, false);
            }
            else {
                var phoneUrl = 'http://m.baibaocp.com/index2.php?qd=1001';
                window.open (phoneUrl, '_blank');
            }
        };*/

        //错误码窗口配置
        function modalTips () {
            $ionicModal.fromTemplateUrl ('templates/tips.html', {
                scope : $scope,
                backdropClickToClose : true
            })
                .then (function (modal) {
                    $scope.modalTips = modal;
                    $scope.modalTips.show ();
                });
        }


    });