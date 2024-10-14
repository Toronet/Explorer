(function ($) {
    "use strict";

    var mainApp = {

        main_fun: function () {

            $(function () {
                $('body').vegas({
                    slides: [
                        { src: './images/bg1.jpg' },
                        { src: './images/bg2.jpg' },
                        { src: './images/bg3.jpg' },
                        { src: './images/bg4.jpg' }
                    ],
                    overlay: './plugins/vegas/overlays/08.png'
                });

            });

        },

        initialization: function () {
            mainApp.main_fun();

        }

    }

    $(document).ready(function () {
        mainApp.main_fun();
    });
}(jQuery));
