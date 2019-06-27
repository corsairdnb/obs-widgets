$(function () {

    var queue = [];
    var token;
    var lastId;
    var isInitialized = false;

    var CLASS_DONATION = 'donation';
    var CLASS_NAME = 'donation__name';
    var CLASS_AMOUNT = 'donation__amount';
    var CLASS_MESSAGE = 'donation__message';

    initTemplate();
    initToken();

    window.showDonation = function() {
        $.when(makeRequest()).then(function () {
            if (queue.length === 0) {
                return;
            }
            window.isDonationRun = true;
            var text = queue.shift();
            var donation;
            if (typeof text !== 'undefined' && text) {
                donation = JSON.parse(text);
            }

            if (typeof donation !== 'undefined' && donation) {
                if (parseFloat(donation['sum']) > 0) {
                    run(
                        donation['what'],
                        donation['sum'] + ' RUB',
                        donation['comment']
                    );
                }

                setTimeout(function () {
                    window.isDonationRun = false;
                }, window.DONATE_DELAY_PAUSE + window.DONATE_DELAY);
            }
        })
    };

    function initTemplate() {
        $('body').prepend('' +
            '<div class="donation animated">' +
                '<div class="donation__header">Donate <span class="donation__amount"></span></div>' +
                '<div class="donation__text">' +
                    '<div class="donation__name"></div>' +
                    '<div class="donation__message"></div>' +
                '</div>' +
            '</div>');
    }

    function animateIn(name, delay) {
        setTimeout(function () {
            $('.' + name).addClass('bounceInLeft');
        }, delay);
    }

    function animateOut(name, delay) {
        setTimeout(function () {
            $('.' + name).removeClass('bounceInLeft');
        }, delay);
    }

    function run(name, amount, message) {
        $('.' + CLASS_NAME).text(name);
        $('.' + CLASS_AMOUNT).text(amount);
        $('.' + CLASS_MESSAGE).text(message);

        animateIn(CLASS_DONATION, window.DONATE_DELAY);
        animateOut(CLASS_DONATION, window.DONATE_DELAY_PAUSE + window.DONATE_DELAY);
    }

    function initToken() {
        $.get('../token.txt')
            .done(function(data) {
                token = data;
            });
    }

    function enqueue (element) {
        var found = queue.some(function (value) {
            return value.toString() === element.toString();
        });
        if (!found) {
            queue.push(element);
        }
    }

    function makeRequest() {
        var url;
        if (lastId) {
            url = 'https://donatepay.ru/api/v1/transactions?limit=5&access_token=' + token + '&after=' + lastId;
        } else {
            url = 'https://donatepay.ru/api/v1/transactions?limit=1&access_token=' + token;
        }

        var promise = $.Deferred();

        $.get(url)
            .done(function (response) {
                var data = response.data;
                if (!data || data.length === 0) {
                    promise.resolve();
                    return;
                }

                lastId = data[0].id;

                if (!isInitialized) {
                    isInitialized = true;
                } else {
                    data.forEach(function (value) {
                        enqueue(JSON.stringify(value));
                    });
                }
                promise.resolve();
            })
            .fail(function () {
                console.error('api request failed');
                promise.reject();
            });

        return promise;
    }
});
