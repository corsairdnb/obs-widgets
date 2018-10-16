$(function(){
    var CLASS_BANNER = 'banner';
    var CLASS_LINE_2 = 'banner__bg';
    var container;
    var line_2;
    var artist;
    var logo;
    var dj;
    var delay_1 = 1000;
    var delay_2 = 6000;
    var artistText = '';
    var programLogo = '';
    var firstLoad = true;

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
                // console.log(parts);
                artistText = $.trim(parts[0]);
                programLogo = $.trim(parts[1]);
                artist.text(artistText);
                if (programLogo) {
                    logo = $('<div class="logo"><img src="../logo/'+programLogo+'.png" /></div>');
                } else {
                    logo = $('<div class="logo"><img src="../logo/logo.png" /></div>');
                }
            })
            .always(function() {
                line_2.append([logo, dj, artist]);
                container.append([line_2]);
                $('body').prepend(container);
            });
    }
    function animateIn() {
        $('.banner__bg').addClass('show');
    }
    function animateOut() {
        $('.banner__bg').removeClass('show');
    }

    window.showDjBanner = function() {
        if (firstLoad) {
            init();
            firstLoad = false;
        }
        window.isDjBannerRun = true;

        setTimeout(function(){
            animateIn();
        }, delay_1);

        setTimeout(function(){
            animateOut();
        }, delay_2);

        setTimeout(function(){
            window.isDjBannerRun = false;
        }, delay_2 + 1000);
    };
});
