$(function(){
    var preferUseServer = false;

    var CLASS_BANNER = 'banner';
    var CLASS_ARTIST = 'artist';
    var delay_1 = 1000;
    var delay_2 = 8000;
    var artistText = '';
    var programLogo = '';

    initTemplate();

    function update() {
        $('.'+CLASS_ARTIST).text(artistText);
        if (programLogo) {
            var imgSrc = '../logo/'+programLogo+'.png';
            $.get(imgSrc)
                .done(function() {
                    $('.program').attr('src', imgSrc);
                    $('.logo').removeClass('empty');
                })
                .fail(function () {
                    $('.program').attr('src', '');
                    $('.logo').addClass('empty');
                });
        } else {
            $('.program').attr('src', '');
            $('.logo').addClass('empty');
        }

        var donateSrc = '../donate.png';
        $.get(donateSrc)
          .done(function() {
            $('.donate').attr('src', donateSrc);
            $('.donation').removeClass('empty');
          })
          .fail(function () {
            $('.donate').attr('src', '');
            $('.donation').addClass('empty');
          });
    }

    function getFromLocalFile() {
        $.get('../artist.txt')
            .done(function(data) {
                var parts = data.split('\n');
                artistText = $.trim(parts[0]);
                programLogo = $.trim(parts[1]);
                update();
            });
    }

    function getFromApi(data) {
        artistText = data[0].artist;
        $.get('http://docker.studio.eleventhradio.ru:9100/studio-program/'+ data[0].program +'/')
            .done(function(prog) {
                programLogo = prog.unique_name;
                update();
            });
    }

    function initTemplate() {
        $('body').prepend('' +
            '<div class="'+CLASS_BANNER+'">' +
                '<div class="donation"><img src="" class="donate" /></div>' +
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

        if (preferUseServer) {
          $.get('http://docker.studio.eleventhradio.ru:9100/studio-live/')
            .done(function(data) {
              $('#log').html(data);
              getFromApi(data);
            })
            .fail(function(x) {
              $('#log').html(x);
              getFromLocalFile();
            });
        } else {
          $.get('http://docker.studio.eleventhradio.ru:9100/preferences/')
            .done(function(data) {
              if (preferUseServer || (data && data.useServerSettings)) {
                $.get('http://docker.studio.eleventhradio.ru:9100/studio-live/')
                  .done(function(data) {
                    $('#log').html(data);
                    getFromApi(data);
                  })
                  .fail(function(x) {
                    $('#log').html(x);
                    getFromLocalFile();
                  });
              } else {
                getFromLocalFile();
              }
            })
            .fail(function(x) {
              getFromLocalFile();
            });
        }


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
