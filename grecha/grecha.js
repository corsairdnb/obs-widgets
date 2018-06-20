$(function () {

    // $.get('timetable.txt', function (text) {
    //     if (!text) return;
    //
    //     text.split('\n').forEach(function (item) {
    //         item = item.split(/^(.*?)\s/)
    //         timetable.append('<div class="timetable__item"><b>' + item[1] + '</b> ' + item[2] + '</div>')
    //     });
    //
    //     setInterval(function(){
    //         $('.timetable__item').each(function (i, e) {
    //             setTimeout(function (el) {
    //                 $(el).addClass('animated pulse');
    //             }, 1000 * (i + 1), e)
    //             setTimeout(function (el) {
    //                 $(el).removeClass('animated pulse');
    //             }, 1000 * (i + 1) + 1000, e)
    //         });
    //     }, 20000);
    // });

    setTimeout(function () {
        $('.diaface').appendTo('.fly-2');
    }, 2 * 60 * 1000);

    setTimeout(function () {
        $('.diaface').insertAfter('.fly');
    }, 2 * 60 * 1000 + 10000);

    setTimeout(function () {
        $('.diaface').appendTo('.fly-2');
    }, 5 * 60 * 1000);

    setTimeout(function () {
        $('.diaface').insertAfter('.fly');
    }, 5 * 60 * 1000 + 10000);

});