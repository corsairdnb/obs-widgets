$(function () {

  $.get('program.txt', function(text) {
    if (text) {
      $('.program-name').text(text);
      $('.program-name').show();
      $('.logo-1').show();
      $('.logo-2').hide();
    } else {
      $('.program-name').hide();
      $('.program-name').text('');
      $('.logo-2').show();
      $('.logo-1').hide();
    }
  });

});