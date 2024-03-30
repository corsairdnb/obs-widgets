$(function () {

    window.isDjBannerRun = false;

    var DJ_BANNER_LOOP_LENGTH = 1000 * 60 * 3; // 3 minutes

    main();

    function main() {
        setTimeout(function () {
            window.showDjBanner();
        }, 1000);

        setInterval(function () {
            window.showDjBanner();
        }, DJ_BANNER_LOOP_LENGTH);
    }

});
