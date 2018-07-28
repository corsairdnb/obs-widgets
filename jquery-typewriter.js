;(function ( $ ) {
    $.fn.typewrite = function ( options ) {
        var settings = {
            'selector': this,
            'extra_char': '',
            'delay':    100,
            'trim':     false,
            'callback': null
        };
        if (options) $.extend(settings, options);
        var final_text;

        /* This extra closure makes it so each element
         * matched by the selector runs sequentially, instead
         * of all at the same time. */
        function type_next_element(index) {
            var current_element = $(settings.selector[index]);
            final_text = current_element.text();
            if (settings.trim) final_text = $.trim(final_text);
            current_element.html("").show();

            function type_next_character(element, i) {
                element.html( final_text.substr(0, i)+settings.extra_char );
                if (final_text.length >= i) {
                    setTimeout(function() {
                        type_next_character(element, i+1);
                    }, settings.delay);
                }
                else {
                    if (++index < settings.selector.length) {
                        type_next_element(index);
                    }
                    // else if (settings.callback) settings.callback();
                }
            }
            type_next_character(current_element, 0);
        }
        type_next_element(0);

        var that = this;
        this.remove = function(index) {
            var current_element = $(settings.selector[index]);

            function remove2(element, i) {
                element.html( final_text.substr(0, i) );
                if (i > 0) {
                    setTimeout(function() {
                        remove2(element, i-1);
                    }, settings.delay);
                }
                else {
                    if (++index < settings.selector.length) {
                        that.remove(index);
                    }
                    else if (settings.callback) settings.callback();
                }
            }
            remove2(current_element, final_text.length);
        }

        return this;
    };
})(jQuery);