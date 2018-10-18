$(function(){
    var CLASS_BANNER = 'banner';
    var CLASS_LOGO = 'logo';
    var CLASS_DJ = 'dj';
    var CLASS_ARTIST = 'artist';
    var delay_1 = 1000;
    var delay_2 = 6000;
    var artistText = '';
    var programLogo = '';

    initTemplate();

    function initTemplate() {
        $('body').prepend('' +
            '<div class="'+CLASS_BANNER+'">' +
                '<div class="'+CLASS_LOGO+'"><img src="../logo/logo.png" /></div>' +
                '<div class="'+CLASS_DJ+'"></div>' +
                '<span class="'+CLASS_ARTIST+'"></span>' +
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
                    $('.'+CLASS_LOGO).find('img').attr('src', '../logo/'+programLogo+'.png');
                } else {
                    $('.'+CLASS_LOGO).find('img').attr('src', '');
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
