$(function () {

    var date = new Date();
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    $('.weekday').text(weekdays[date.getDay()])

    setTimeout(function () {
        $('.weekday').removeClass('hidden')
    }, 5000);

    var timetable = $('.timetable');
    var particles = $('.particles');
    var layer1 = $('.layer-1');
    var body = $('body');

    var gif = $('#layer-gif');

    $.get('../timetable.txt', function (text) {
        if (!text) return;

        text.split('\n').forEach(function (item) {
            item = item.split(/^(.*?)\s/)
            timetable.append('<div class="timetable__item"><b>' + item[1] + '</b> <span>' + item[2] + '</span></div>')
        });

        // setInterval(function(){
        //     $('.timetable__item').each(function (i, e) {
        //         setTimeout(function (el) {
        //             $(el).addClass('animated pulse');
        //         }, 1000 * (i + 1), e)
        //         setTimeout(function (el) {
        //             $(el).removeClass('animated pulse');
        //         }, 1000 * (i + 1) + 1000, e)
        //     });
        // }, 20000);
    });

    $.get('../time.txt', function (text) {
        setTimeout(function () {
            $('.timer').removeClass('hidden')
        }, 5000);

        initTimer(text); // other ways --> "0:15" "03:5" "5:2"

        function initTimer(t) {

            var self = this,
                timerEl = document.querySelector('.timer'),
                minutesGroupEl = timerEl.querySelector('.minutes-group'),
                secondsGroupEl = timerEl.querySelector('.seconds-group'),

                minutesGroup = {
                    firstNum: minutesGroupEl.querySelector('.first'),
                    secondNum: minutesGroupEl.querySelector('.second')
                },

                secondsGroup = {
                    firstNum: secondsGroupEl.querySelector('.first'),
                    secondNum: secondsGroupEl.querySelector('.second')
                };

            var time = {
                min: t.split(':')[0],
                sec: t.split(':')[1]
            };

            var timeNumbers;

            function updateTimer() {

                var timestr;
                var date = new Date();

                date.setHours(0);
                date.setMinutes(time.min);
                date.setSeconds(time.sec);

                var newDate = new Date(date.valueOf() - 1000);
                var temp = newDate.toTimeString().split(" ");
                var tempsplit = temp[0].split(':');

                time.min = tempsplit[1];
                time.sec = tempsplit[2];

                timestr = time.min + time.sec;
                timeNumbers = timestr.split('');
                updateTimerDisplay(timeNumbers);

                if (timestr === '0000')
                    countdownFinished();

                if (timestr != '0000')
                    setTimeout(updateTimer, 1000);

            }

            function updateTimerDisplay(arr) {

                animateNum(minutesGroup.firstNum, arr[0]);
                animateNum(minutesGroup.secondNum, arr[1]);
                animateNum(secondsGroup.firstNum, arr[2]);
                animateNum(secondsGroup.secondNum, arr[3]);

            }

            function animateNum(group, arrayValue) {

                // TweenMax.killTweensOf(group.querySelector('.number-grp-wrp'));
                // TweenMax.to(group.querySelector('.number-grp-wrp'), 1, {
                //     y: -group.querySelector('.num-' + arrayValue).offsetTop
                // });

                $(group).find('.number-grp-wrp').css('-webkit-transform', 'translate3d(0,' + -group.querySelector('.num-' + arrayValue).offsetTop + 'px,0)');

            }

            setTimeout(updateTimer, 1000);

        }

        function countdownFinished() {
            setTimeout(function(){
                $('.layer-1, .text-layer').addClass('animated fadeOut');
                $('.timetable__item').addClass('blurred');
                gif.hide();
            }, 1000);
            setTimeout(function(){
                particles.hide();
            }, 4000);
        }

        function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
        }

        setInterval(function () {
            gif.attr('class', 'layer-gif--' + randomInteger(1, 4));
            layer1.addClass('variation-' + randomInteger(1, 3));
            body.addClass('noise');
        }, 28000);

        setInterval(function () {
            gif.attr('class', '');
            layer1.removeClass('variation-1 variation-2 variation-3');
            body.removeClass('noise');
        }, 28280);
    });
});
