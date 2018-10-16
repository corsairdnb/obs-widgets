$(function () {

    var header_text = '';
    var message_text = '';
    var CLASS_INFO = 'info';
    var CLASS_HEADER = 'info__header';
    var CLASS_MESSAGE = 'info__message';

    var INFO_DELAY = 100;
    var INFO_DELAY_PAUSE = 5000;

    initTemplate();

    window.showInfo = function() {
        window.isInfoRun = true;
        run();
    };

    function initTemplate() {
        $('body').prepend('' +
            '<div class="'+CLASS_INFO+' animated">' +
                '<div class="'+CLASS_HEADER+'"></div>' +
                '<div class="'+CLASS_MESSAGE+'"></div>' +
            '</div>');
    }

    function animateIn(name, delay) {
        setTimeout(function () {
            $('.' + name).addClass('bounceInLeft');
        }, delay);
    }

    function animateOut(name, delay) {
        setTimeout(function () {
            $('.' + name).removeClass('bounceInLeft');
        }, delay);
    }

    function run() {
        $.get('../info.txt')
            .done(function(data) {
                var parts = data.split('\n');
                header_text = $.trim(parts[0]);
                message_text = $.trim(parts[1]);
            })
            .always(function () {
                if (header_text !== '' && message_text !== '') {
                    $('.' + CLASS_MESSAGE).text(message_text);
                    $('.' + CLASS_HEADER).text(header_text);
                }
            });

        animateIn(CLASS_INFO, INFO_DELAY);
        animateOut(CLASS_INFO, INFO_DELAY_PAUSE + INFO_DELAY);

        setTimeout(function () {
            window.isInfoRun = false;
        }, INFO_DELAY_PAUSE + INFO_DELAY);
    }
});
