/**
 * Created by admin on 2018/6/4.
 */
angular.module('starter.commenComponent', [])

//错误弹框
    .factory('$errorPopupFactory', function ($ionicModal) {
        return {
            errorInfo: function (obj, state, target, hideBtn, showBtn, hideText, showText) {
                $ionicModal.fromTemplateUrl('templates/mistakeBox/mistakeBox.html', {
                    scope: obj,
                    backdropClickToClose: true
                })
                    .then(function (modal) {
                        obj.integral = modal;
                        modal.show();
                    });

                if (hideBtn) {
                    obj.hideBtn = true;
                    obj.hideText = hideText;
                }
                else {
                    obj.hideBtn = false;
                    obj.hideText = '';
                }
                if (showBtn) {
                    obj.showBtn = true;
                    obj.showText = showText;
                }
                else {
                    obj.showBtn = false;
                    obj.showText = '';
                }
                obj.cancel = function () {//取消
                    obj.integral.hide();
                };
                obj.makeSure = function () {//確定
                    obj.integral.hide();
                    state.go(target);
                };
                obj.cancelPop = function () {
                    obj.integral.hide();
                    state.go(target);
                };
            }
        };
    });
