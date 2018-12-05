$(function () {

    window.queue = [];

    window.isDjBannerRun = false;
    window.isDonationRun = false;
    window.isInfoRun = false;

    window.DONATE_DELAY = 100;
    window.DONATE_DELAY_PAUSE = 12000;

    var LOOP_GAP = 1000;

    var ANIMATION_LENGTH = DONATE_DELAY + DONATE_DELAY_PAUSE;
    var DONATE_LOOP_LENGTH = ANIMATION_LENGTH + LOOP_GAP;
    var DJ_BANNER_LOOP_LENGTH = 1000 * 60 * 3; // 3 minutes
    var INFO_BANNER_LOOP_LENGTH = 1000 * 60 * 6; // 6 minutes

    main();

    function main() {

        setTimeout(function () {
            window.showDjBanner();
        }, 1000);

        setTimeout(function () {
            window.showInfo();
        }, 20000);

        setInterval(function () {
            if (!window.isDjBannerRun && !window.isInfoRun && window.queue.length) {
                window.showDonation();
            }
        }, DONATE_LOOP_LENGTH);

        setInterval(function () {
            if (!window.isDonationRun && !window.isInfoRun) {
                window.showDjBanner();
            }
        }, DJ_BANNER_LOOP_LENGTH);

        setInterval(function () {
            if (!window.isDjBannerRun && !window.isDonationRun) {
                window.showInfo();
            }
        }, INFO_BANNER_LOOP_LENGTH);
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
