$(function(){
    var CLASS_BANNER = 'banner';
    var CLASS_LINE_2 = 'banner__line-2';
    var container;
    var line_2;
    var artist;
    var logo;
    var dj;
    var typewriterNow;
    var typewriterArtist;
    var delay_1 = 1000;
    var delay_2 = delay_1 + 1000;
    var delay_3 = delay_2 + 6000;
    var delay_4 = delay_3 + 500;
    var delay_5 = delay_4 + 800;
    var nowText = 'now playing';
    var artistText = '';
    var programLogo = '';
    var firstLoad = true;
    window.isBannerRun = false;

    function init() {
        container = $('<div />', {
            'class': CLASS_BANNER
        });
        line_2 = $('<div />', {
            'class': CLASS_LINE_2
        });
        dj = $('<div class="dj"></div>');
        artist = $('<span class="artist"></span>');

        $.get('../artist.txt')
            .done(function(data) {
                var parts = data.split('\n');
                console.log(parts);
                artistText = $.trim(parts[0]);
                programLogo = $.trim(parts[1]);
                artist.text(artistText);
                logo = $('<div class="logo"><img src="../logo/'+programLogo+'.png" /></div>');
            })
            .always(function() {
                line_2.append([logo, dj, artist]);
                container.append([line_2]);
                $('body').prepend(container);
            });

        // artist.load('../artist.txt');
    }
    function animateIn() {
        $('.banner__line-2').addClass('show');
    }
    function animateOut() {
        $('.banner__line-2').removeClass('show');
    }

    window.NowBanner = function() {
        if (firstLoad) {
            init();
            firstLoad = false;
        }

        setTimeout(function(){
            animateIn();
        }, delay_1);

        // setTimeout(function(){
        //     typewrite();
        // }, delay_2);

        // setTimeout(function(){
        //     typewriterArtist.remove(0);
        // }, delay_3);

        // setTimeout(function(){
        //     typewriterNow.remove(0);
        // }, delay_4);

        // setTimeout(function(){
        //     animateOut();
        // }, delay_5);

        // setTimeout(function(){
        //     window.isBannerRun = false;
        // }, delay_5 + 1000);
    }

    window.NowBanner();
});