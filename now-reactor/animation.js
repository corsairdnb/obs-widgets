$(function(){

    var ARTIST_CLASS = 'artist';
    var OVERLAY_CLASS = 'overlay';

    var artist = $('.' + ARTIST_CLASS);
    var overlay = $('.' + OVERLAY_CLASS);

    main();

    function main() {
        $('.artist-name').load('artist.txt');
        overlay.addClass('animated slideInLeft');
        artist.addClass('animated slideInLeft');

        setTimeout(function(){
            artist.addClass('slideOutLeft');
            overlay.addClass('slideOutLeft');
        }, 7000);

        setTimeout(function(){
            artist.removeAttr('class').addClass(ARTIST_CLASS);
            overlay.removeAttr('class').addClass(OVERLAY_CLASS);
        }, 8000);
    }


});