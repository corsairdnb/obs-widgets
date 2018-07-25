$(function () {

    var DELAY_1 = 100;
    var DELAY_2 = 200;
    var DELAY_3 = 1400;
    var DELAY_4 = 1500;
    var DELAY_5 = 1600;

    var DELAY_PAUSE = 8000;

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
        $('.donation__name').text(name);
        $('.donation__amount').text(amount);
        $('.donation__message').text(message);

        animateIn('layer-1', DELAY_1);
        animateIn('layer-2', DELAY_2);
        animateIn('donation__header', DELAY_3);
        animateIn('donation__name', DELAY_4);
        animateIn('donation__message', DELAY_5);

        animateOut('donation__message',  DELAY_PAUSE + DELAY_3);
        animateOut('donation__name',  DELAY_PAUSE + DELAY_4);
        animateOut('donation__header',  DELAY_PAUSE + DELAY_5);
        animateOut('layer-1',  DELAY_PAUSE + DELAY_5 + DELAY_1);
        animateOut('layer-2',  DELAY_PAUSE + DELAY_5 + DELAY_2);
    }

    run('name', 'text', 10000);

    var socket = io('socket.donationalerts.ru:3001', {
        reconnection: true,
        reconnectionDelayMax: 5000,
        reconnectionDelay: 1000
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
        var donation = $.parseJSON(msg);

        run(
            donation.username,
            donation.amount_formatted + ' ' + donation.currency,
            donation.message
        );
    });

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