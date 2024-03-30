$(function(){
    var CLASS_BANNER = 'banner';
    var CLASS_ARTIST = 'artist';
    var delay_1 = 1000;
    var delay_2 = 8000;
    var artistText = '';
    var programLogo = '';

    initTemplate();

    function initTemplate() {
        $('body').prepend('' +
            '<div class="'+CLASS_BANNER+'">' +
                '<div class="logo"><img src="" class="program" /></div>' +
                '<div class="'+CLASS_ARTIST+'"></div>' +
                '<div class="eleventh-logo"><img src="../logo/eleventh-radio-black.png" class="eleventh" /></div>' +
            '</div>');
    }
    function animateIn() {
        $('.banner').addClass('show');
    }
    function animateOut() {
        $('.banner').removeClass('show');
    }

    window.showDjBanner = function() {
        window.isDjBannerRun = true;

        $.get('../artist.txt')
            .done(function(data) {
                var parts = data.split('\n');
                // console.log(parts);
                artistText = $.trim(parts[0]);
                programLogo = $.trim(parts[1]);
                $('.'+CLASS_ARTIST).text(artistText);
                if (programLogo) {
                    $('.program').attr('src', '../logo/'+programLogo+'.png');
                    $('.logo').removeClass('empty');
                } else {
                    $('.program').attr('src', '');
                    $('.logo').addClass('empty');
                }
            });

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
