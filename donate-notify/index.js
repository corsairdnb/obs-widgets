// window.addEventListener('load', function () {

  // var socket = io("socket.donationalerts.ru:3001");
  //
  // socket.emit('add-user', {token: "e4UuFIW6uHFm115XZEcf", type: "minor"});
  //
  // socket.on('donation', function(msg){
  //   console.log(msg);
  // });

// });

window.addEventListener('load', function () {

  var socket = io('socket.donationalerts.ru:3001', {
    reconnection: true,
    reconnectionDelayMax: 5000,
    reconnectionDelay: 1000
  });
  var token = 'e4UuFIW6uHFm115XZEcf';

  socket.on('connect', function(msg){
    console.log('WS: connected');
    socket.emit('add-user', { token: token, type: 'alert_widget' });
  });

  socket.on('connect_error', function(msg){
    console.log('WS: connection_error');
  });

  socket.on('connect_timeout', function(msg){
    console.log('WS: connection_timeout');
  });

  socket.on('reconnect', function(msg){
    console.log('WS: reconnected');
  });

  socket.on('donation', function(msg){
    // var new_donation = $.parseJSON(msg);
    console.log(msg);

    // if (alerts_id_to_show[new_donation.alert_type].indexOf(new_donation.id) == -1) {
    //   alerts_array[new_donation.alert_type].push(new_donation);
    // };
    // if (dPoll.poll_is_available == true && dPoll.is_displaying == true) {
    //   dPoll.getData(false, true);
    // }
  });

  socket.on('update-alert_widget', function(msg){
    var alert_data = $.parseJSON(msg);
    console.log(alert_data);

    // if(typeof alert_data['_additional'] !== 'undefined'){
    //   if(typeof alert_data['_additional'].reload !== 'undefined'){
    //     if (alert_data['_additional'].reload == 1) {
    //       location.reload();
    //     }
    //   }
    // }
    // initWidget(alert_data);
    // updateData();
  });

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

});