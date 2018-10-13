$(function () {

    var socket;
    var token;

    var CLASS_DONATION = 'donation';
    var CLASS_NAME = 'donation__name';
    var CLASS_AMOUNT = 'donation__amount';
    var CLASS_MESSAGE = 'donation__message';
    var CLASS_HEADER = 'donation__header';

    initTemplate();
    connect();

    window.showDonation = function() {
        window.isDonationRun = true;
        var text = window.queue.shift();
        var donation;
        if (typeof text !== 'undefined' && text) {
            donation = JSON.parse(text);
        }

        if (typeof donation !== 'undefined' && donation) {
            if (parseFloat(donation['amount_main']) > 0) {
                run(
                    donation['username'],
                    donation['amount'] + ' ' + donation['currency'],
                    donation['message']
                );
            }
        }
    };

    function initTemplate() {
        $('body').prepend('' +
            '<div class="donation animated">' +
                '<div class="donation__header">Donate <span class="donation__amount"></span></div>' +
                '<div class="donation__text">' +
                    '<div class="donation__name"></div>' +
                    '<div class="donation__message"></div>' +
                '</div>' +
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

    function run(name, amount, message) {
        $('.' + CLASS_NAME).text(name);
        $('.' + CLASS_AMOUNT).text(amount);
        $('.' + CLASS_MESSAGE).text(message);

        animateIn(CLASS_DONATION, window.DONATE_DELAY);
        animateOut(CLASS_DONATION, window.DONATE_DELAY_PAUSE + window.DONATE_DELAY);

        setTimeout(function () {
            window.isDonationRun = false;
        }, window.DONATE_DELAY_PAUSE + window.DONATE_DELAY);
    }

    function connect() {
        $.get('../token.txt')
            .done(function(data) {
                token = data;
            })
            .always(function(data) {
                initSocket();
            });
    }

    function initSocket() {
        socket = io('socket.donationalerts.ru:3001', {
            reconnection: true,
            reconnectionDelayMax: 5000,
            reconnectionDelay: 1000
        });

        socket.on('connect', function (msg) {
            console.info('%c WS: connected', 'color: green');
            socket.emit('add-user', {token: token, type: 'minor'});
        });

        socket.on('connect_error', function (msg) {
            console.error('WS: connection_error');
        });

        socket.on('connect_timeout', function (msg) {
            console.info('WS: connection_timeout');
        });

        socket.on('reconnect', function (msg) {
            console.info('WS: reconnected');
        });

        socket.on('donation', function (msg) {
            console.log(msg);
            console.log(JSON.parse(msg));
            window.enqueue(msg);
        });
    }

});
