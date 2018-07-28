$(function(){
    var CLASS_BANNER = 'banner';
    var CLASS_LINE_1 = 'banner__line-1';
    var CLASS_LINE_2 = 'banner__line-2';
    var container;
    var line_1;
    var line_2;
    var artist;

    window.NowBanner = function() {
        function init() {
            container = $('<div />', {
                'class': CLASS_BANNER
            });
            line_1 = $('<div />', {
                'class': CLASS_LINE_1,
                'html': '<span class="now">now playing</span>'
            });
            line_2 = $('<div />', {
                'class': CLASS_LINE_2
            });
            artist = $('<span class="artist"></span>')
            artist.load('artist.txt');
            line_2.append(artist);
            container.append([line_1, line_2]);
            $('body').prepend(container);
        }
        function typewrite() {
            $('.now').typewrite({
                'delay': 50,
                'extra_char': '',
                'trim': true,
                'callback': null
            });
            
            setTimeout(function(){
                $.get('artist.txt')
                .done(function(data) {
                    artist.text(data);
                })
                .always(function() {
                    artist.typewrite({
                        'delay': 50,
                        'extra_char': '',
                        'trim': true,
                        'callback': null
                    });
                });
            }, 900);
        }
        function animateIn() {
            
        }
        function animateOut() {
            
        }

        init();

        setTimeout(function(){
            animateIn();
        }, 100);

        setTimeout(function(){
            // typewrite();
        }, 2000);
    }

    window.NowBanner();
});