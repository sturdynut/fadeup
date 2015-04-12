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
    var settings = $.extend({}, $.fn.fadeUp.defaults, options);

    return this.each(function() {

      var $this = $(this),
          $data = $this.data('fadeUp') || {};

      if ($data.collapsed) {
        $.fn.fadeUp.animate.call($this, {
          borderTopWidth: $data.borderTopWidth,
          borderBottomWidth: $data.borderBottomWidth,
          opacity: 1,
          height: $data.height,
          minHeight: $data.minHeight,
          paddingTop: $data.paddingTop,
          paddingBottom: $data.paddingBottom,
          marginTop: $data.marginTop,
          marginBottom: $data.marginBottom,
          overflow: $data.overflow
        }, settings);

        $data.collapsed = false;
      }
      else {
        $this.data($.fn.fadeUp.dataRoot, {
          borderTopWidth: $this.css('borderTopWidth'),
          borderBottomWidth: $this.css('borderBottomWidth'),
          display: $this.css('display'),
          height: $this.outerHeight(),
          minHeight: $this.css('minHeight'),
          paddingTop: $this.css('paddingTop'),
          paddingBottom: $this.css('paddingBottom'),
          marginTop: $this.css('marginTop'),
          marginBottom: $this.css('marginBottom'),
          overflow: $this.css('overflow'),
          collapsed: true
        });

        $.fn.fadeUp.animate.call($this, {
          borderTopWidth: 0,
          borderBottomWidth: 0,
          opacity: 0,
          height: 0,
          minHeight: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0
        }, settings);
      }
    });
  };

  $.fn.fadeUp.animate = $.fn.velocity ? $.fn.velocity : $.fn.animate;
  $.fn.fadeUp.dataRoot = 'fadeUp';
  $.fn.fadeUp.defaults = { duration: 700 };

})(jQuery);
