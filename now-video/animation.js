$(function(){

    var LOOP_TIME = 300000;
    var ARTIST_CLASS = 'artist';
    var OVERLAY_CLASS = 'overlay';
    var VIDEO_CLASS = 'video';

    var artist = $('.' + ARTIST_CLASS);
    var video = $('.' + VIDEO_CLASS);
    var overlay = $('.' + OVERLAY_CLASS);

    main();
    //
    // setInterval(function(){
    //     main();
    // }, LOOP_TIME);

    function main() {
        $('.artist').load('artist.txt');
        overlay.addClass('animated fadeIn');

        setTimeout(function(){
            artist.addClass('animated slideInLeft');
            video
              .attr('autoplay', true)
              .addClass('animated fadeIn');
            video[0].play()
        }, 1200);
        //
        // setTimeout(function(){
        //     artist.addClass('fadeOut');
        // }, 5000);
        //
        // setTimeout(function(){
        //     overlay.addClass('bounceOutLeft');
        // }, 5500);
        //
        // setTimeout(function(){
        //     artist.removeAttr('class').addClass(ARTIST_CLASS);
        //     overlay.removeAttr('class').addClass(OVERLAY_CLASS);
        // }, 6500);
    }


});