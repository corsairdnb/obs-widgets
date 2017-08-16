$(function(){

    var LOOP_TIME = 300000;
    var ARTIST_CLASS = 'artist';
    var OVERLAY_CLASS = 'overlay';

    var artist = $('.' + ARTIST_CLASS);
    var overlay = $('.' + OVERLAY_CLASS);

    main();

    setInterval(function(){
        main();
    }, LOOP_TIME);

    function main() {
        $('.artist-name').load('artist.txt');
        overlay.addClass('animated bounceInLeft');

        setTimeout(function(){
            artist.addClass('animated fadeIn');
        }, 1000);

        setTimeout(function(){
            artist.addClass('fadeOut');
        }, 5000);

        setTimeout(function(){
            overlay.addClass('bounceOutLeft');
        }, 5500);

        setTimeout(function(){
            artist.removeAttr('class').addClass(ARTIST_CLASS);
            overlay.removeAttr('class').addClass(OVERLAY_CLASS);
        }, 6500);
    }


});