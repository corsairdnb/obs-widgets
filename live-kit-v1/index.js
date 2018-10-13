$(function () {

    window.queue = [];

    window.isDjBannerRun = false;
    window.isDonationRun = false;

    window.DONATE_DELAY_1 = 100;
    window.DONATE_DELAY_2 = 200;
    window.DONATE_DELAY_3 = 1400;
    window.DONATE_DELAY_4 = 1500;
    window.DONATE_DELAY_5 = 1600;
    window.DONATE_DELAY_PAUSE = 10000;
    var LOOP_GAP = 1000;

    var ANIMATION_LENGTH = DONATE_DELAY_1 + DONATE_DELAY_2 + DONATE_DELAY_3 + DONATE_DELAY_4 + DONATE_DELAY_5 + DONATE_DELAY_PAUSE;
    var DONATE_LOOP_LENGTH = ANIMATION_LENGTH + LOOP_GAP;
    var DJ_BANNER_LOOP_LENGTH = 1000 * 60 * 4; // 4 minutes
    var INFO_BANNER_LOOP_LENGTH = 1000 * 60 * 8; // 4 minutes

    main();

    function main() {

        // setTimeout(function () {
        //     window.showDjBanner();
        // }, 1000);

        setInterval(function () {
            if (!window.isDjBannerRun && window.queue.length) {
                window.showDonation();
            }
        }, DONATE_LOOP_LENGTH);

        // setInterval(function () {
        //     if (!window.isDonationRun) {
        //         window.showDjBanner();
        //     }
        // }, DJ_BANNER_LOOP_LENGTH);
    }

    window.enqueue = function (element) {
        var found = window.queue.some(function (value) {
            return value.toString() === element.toString();
        });
        if (!found) {
            window.queue.push(element);
        }
    }

});
