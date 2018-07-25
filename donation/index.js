$(function () {

    var queue = [];
    var isBannerRun = false;

    var CLASS_NAME = 'donation__name';
    var CLASS_AMOUNT = 'donation__amount';
    var CLASS_MESSAGE = 'donation__message';
    var CLASS_HEADER = 'donation__header';
    var CLASS_LAYER_1 = 'layer-1';
    var CLASS_LAYER_2 = 'layer-2';

    var DELAY_1 = 100;
    var DELAY_2 = 200;
    var DELAY_3 = 1400;
    var DELAY_4 = 1500;
    var DELAY_5 = 1600;
    var DELAY_PAUSE = 8000;
    var LOOP_GAP = 1000;

    var ANIMATION_LENGTH = DELAY_1 + DELAY_2 + DELAY_3 + DELAY_4 + DELAY_5 + DELAY_PAUSE;
    var DONATE_LOOP_LENGTH = ANIMATION_LENGTH + LOOP_GAP;
    var BANNER_LOOP_LENGTH = 1000 * 60 * 3; // 3 minutes

    main();

    function main() {
        initSocket();

        setInterval(function () {
            if (!isBannerRun) {
                showDonation();
            }
        }, DONATE_LOOP_LENGTH);

        setInterval(function () {
            showBanner();
        }, BANNER_LOOP_LENGTH);
    }

    function showBanner() {
        isBannerRun = true;
    }

    function showDonation() {
        var text = queue.shift();
        var donation;
        if (typeof text !== 'undefined' && text) {
            donation = JSON.parse(text);
        }

        if (typeof donation !== 'undefined' && donation) {
            run(
                donation['username'],
                donation['amount_formatted'] + ' ' + donation['currency'],
                donation['message']
            );
        }
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

        animateIn(CLASS_LAYER_1, DELAY_1);
        animateIn(CLASS_LAYER_2, DELAY_2);
        animateIn(CLASS_HEADER, DELAY_3);
        animateIn(CLASS_NAME, DELAY_4);
        animateIn(CLASS_MESSAGE, DELAY_5);

        animateOut(CLASS_MESSAGE, DELAY_PAUSE + DELAY_3);
        animateOut(CLASS_NAME, DELAY_PAUSE + DELAY_4);
        animateOut(CLASS_HEADER, DELAY_PAUSE + DELAY_5);
        animateOut(CLASS_LAYER_1, DELAY_PAUSE + DELAY_5 + DELAY_1);
        animateOut(CLASS_LAYER_2, DELAY_PAUSE + DELAY_5 + DELAY_2);
    }

    function initSocket() {
        var socket = io('socket.donationalerts.ru:3001', {
            reconnection: true,
            reconnectionDelayMax: 5000,
            reconnectionDelay: 1000,
            transports: [
                'websocket',
                'flashsocket',
                'htmlfile',
                'xhr-polling',
                'jsonp-polling',
                'polling'
            ]
        });
        var token = 'e4UuFIW6uHFm115XZEcf';

        socket.on('connect', function (msg) {
            console.info('%c WS: connected', 'color: green');
            socket.emit('add-user', {token: token, type: 'alert_widget'});
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
            enqueue(msg);
        });
    }

    function enqueue(element) {
        var found = queue.some(function (value) {
            return value.toString() === element.toString();
        });
        if (!found) {
            queue.push(element);
        }
    }

});


// socket.on('update-alert_widget', function (msg) {
//     var alert_data = $.parseJSON(msg);
//     console.log(alert_data);
//
//     if(typeof alert_data['_additional'] !== 'undefined'){
//       if(typeof alert_data['_additional'].reload !== 'undefined'){
//         if (alert_data['_additional'].reload == 1) {
//           location.reload();
//         }
//       }
//     }
//     initWidget(alert_data);
//     updateData();
// });

// socket.on('update-user_general_widget_settings', function(msg){
//   handleGeneralWidgetSettings(msg);
// });
//
// socket.on('alert-show', function(msg){
//   var msg = $.parseJSON(msg);
//   if (msg.action == 'skip') {
//     skipCurrentAlert(msg.alert_id, msg.alert_type);
//   }
// })
//
// socket.on('alert-show', function(msg){
//   console.log(msg)
// })

// window.addEventListener('load', function () {

// var socket = io("socket.donationalerts.ru:3001");
//
// socket.emit('add-user', {token: "e4UuFIW6uHFm115XZEcf", type: "minor"});
//
// socket.on('donation', function(msg){
//   console.log(msg);
// });

// });