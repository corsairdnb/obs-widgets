$(function () {
    var timetable = $('.timetable');

    $.get('../timetable.txt', function (text) {
        if (!text) return;

        var lines = text.split('\n');

        for (var i = 0; i < lines.length; i++) {
            if (/^\d\d:\d\d\s/.test(lines[i])) {
                var ar = lines[i].split(/^(.*?)\s/);
                if (ar[1]) {
                    timetable.append('<div class="timetable__item program"><span class="wrapper"><span class="left">' + ar[1] + '</span> <span class="right title">' + ar[2] + '</span></span></div>')
                }
            } else {
                timetable.append('<div class="timetable__item"><span class="wrapper"><span class="left"></span><span class="right">' + lines[i] + '</span></span></div>')
            }
        }
    });

    $.get('../time.txt', function (text) {
        if (!text) {
            return;
        }

        $('.loader').css('visibility', 'visible');

        var time = {
            min: text.split(':')[0],
            sec: text.split(':')[1]
        };
        var dateStart = new Date();
        var dateEnd = new Date();

        dateStart.setHours(0);
        dateStart.setMinutes(0);
        dateStart.setSeconds(0);

        dateEnd.setHours(0);
        dateEnd.setMinutes(time.min);
        dateEnd.setSeconds(time.sec);

        var durationMs = dateEnd.valueOf() - dateStart.valueOf();

        $('head')
            .append('<style>.loader-progress { animation: grow ' + durationMs + 'ms linear forwards; }</style>')
            .append('<style>.loader-text { animation: translate ' + durationMs + 'ms linear forwards; }</style>')
            .append('<style>.loader-text:before { animation: counter ' + durationMs + 'ms linear forwards; }</style>');
    });
});
