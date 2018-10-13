$(function(){
    var CLASS_BANNER = 'banner';
    var CLASS_LINE_1 = 'banner__line-1';
    var CLASS_LINE_2 = 'banner__line-2';
    var container;
    var line_1;
    var line_2;
    var artist;
    var typewriterNow;
    var typewriterArtist;
    var delay_1 = 1000;
    var delay_2 = delay_1 + 1000;
    var delay_3 = delay_2 + 6000;
    var delay_4 = delay_3 + 500;
    var delay_5 = delay_4 + 800;
    var nowText = 'now playing';
    var artistText = '';
    var firstLoad = true;
    window.isBannerRun = false;

    function init() {
        container = $('<div />', {
            'class': CLASS_BANNER
        });
        line_1 = $('<div />', {
            'class': CLASS_LINE_1,
            'html': '<span class="now">'+ nowText +'</span>'
        });
        line_2 = $('<div />', {
            'class': CLASS_LINE_2
        });
        artist = $('<span class="artist"></span>')
        // artist.load('../artist.txt');
        line_2.append(artist);
        container.append([line_1, line_2]);
        $('body').prepend(container);
    }
    function typewrite() {
        typewriterNow = $('.now').typewrite({
            'delay': 65,
            'extra_char': '',
            'trim': true,
            'callback': function() {
                $('.now').hide().text(nowText);
            }
        });
        
        setTimeout(function(){
            $.get('../artist.txt')
                .done(function(data) {
                    artist.text(artistText = data);
                })
                .always(function() {
                    typewriterArtist = artist.typewrite({
                        'delay': 50,
                        'extra_char': '',
                        'trim': true,
                        'callback': function() {
                            artist.hide().text(artistText);
                        }
                    });
                });
        }, 900);
    }
    function animateIn() {
        $('.banner__line-1, .banner__bg').addClass('show');
    }
    function animateOut() {
        $('.banner__line-1, .banner__bg').removeClass('show');
    }

    window.NowBanner = function() {
        if (firstLoad) {
            init();
            firstLoad = false;
        }

        setTimeout(function(){
            animateIn();
        }, delay_1);

        setTimeout(function(){
            typewrite();
        }, delay_2);

        setTimeout(function(){
            typewriterArtist.remove(0);
        }, delay_3);

        setTimeout(function(){
            typewriterNow.remove(0);
        }, delay_4);

        setTimeout(function(){
            animateOut();
        }, delay_5);

        setTimeout(function(){
            window.isBannerRun = false;
        }, delay_5 + 1000);
    }

    // window.NowBanner();
});