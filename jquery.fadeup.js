/*
 * jQuery FadeUp Plugin 0.0.1
 * https://github.com/sturdynut/fadeup
 *
 * Copyright 2015, Matti Salokangas
 * https://github.com/sturdynut
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function($) {
  $.fn.fadeUp = function (options) {

    var settings = $.extend({},
      $.fn.fadeUp.defaults,
      options);

    return this.each(function() {
      var $el = $(this);

      if ($el.height() === 0) {
        $el.animate({
          opacity: 1,
          height: $el.data('fadeUp-height'),
          minHeight: $el.data('fadeUp-min-height'),
          paddingTop: $el.data('fadeUp-padding-top'),
          paddingBottom: $el.data('fadeUp-padding-bottom'),
          marginTop: $el.data('fadeUp-margin-top'),
          marginBottom: $el.data('fadeUp-margin-bottom'),
          borderSize: $el.data('fadeUp-border-size'),
          lineHeight: $el.data('fadeUp-line-height'),
          overflow: $el.data('fadeUp-overflow')
        }, settings.duration);
      }
      else {
        $el.data({
          'fadeUp-height': $el.outerHeight(),
          'fadeUp-min-height': $el.css('min-height'),
          'fadeUp-padding-top': $el.css('paddingTop'),
          'fadeUp-padding-bottom': $el.css('paddingBottom'),
          'fadeUp-margin-top': $el.css('marginTop'),
          'fadeUp-margin-bottom': $el.css('marginBottom'),
          'fadeUp-overflow': $el.css('overflow')
        });
        $el
        .css('overflow', 'hidden')
        .animate({
          opacity: 0,
          height: 0,
          minHeight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0
        }, settings.duration);
      }
    });

  }

  $.fn.fadeUp.defaults = {
    duration: 700
  };

})(jQuery);
