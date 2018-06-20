/**
 * Created by admin on 2018/5/23.
 */
angular.module ('starter.slide', [])
    .factory ('$slide', function ($http, $q, $ionicLoading) {

        return {
            slideWinner: function (parent) {
                setTimeout (function () {
                    var className = $ ("." + parent.className);

                    var i = 0, sh;
                    var liLength = className.children ("li").length;
                    var liHeight = className.children ("li").height () + parseInt (className.children ("li").css ('border-bottom-width'));
                    className.html (className.html () + className.html ());

                    // 开启定时器
                    sh = setInterval (slide, 3000);
                    function slide () {
                        if (parseInt (className.css ("margin-top")) > (-liLength * liHeight)) {
                            i++;
                            className.animate ({
                                marginTop : -liHeight * i + "px"
                            }, "slow");
                        }
                        else {
                            i = 0;
                            className.css ("margin-top", "0px");
                        }
                    }

                    // 清除定时器
                    className.hover (function () {
                        clearInterval (sh);
                    }, function () {
                        clearInterval (sh);
                        sh = setInterval (slide, 3000);
                    });
                }, 0);
            }
        }



    });
