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
  $.fn.fadeUp = function (options, callback) {
    var callback = typeof options === 'function' ? options : callback;
    var options = typeof options === 'object' ? options : {};
    var settings = $.extend({}, $.fn.fadeUp.defaults, options);

    return this.each(function() {
      var $this = $(this),
          data = $this.data($.fn.fadeUp.dataRoot);

      if (typeof data !== 'object') {
        data = {
          borderBottomWidth: $this.css('borderBottomWidth'),
          borderTopWidth: $this.css('borderTopWidth'),
          collapsed: false,
          display: $this.css('display'),
          height: $this.outerHeight(),
          marginBottom: $this.css('marginBottom'),
          marginTop: $this.css('marginTop'),
          minHeight: $this.css('minHeight'),
          overflow: $this.css('overflow'),
          paddingBottom: $this.css('paddingBottom'),
          paddingTop: $this.css('paddingTop')
        };

        $this.data($.fn.fadeUp.dataRoot, data);
      }

      var properties = {
        borderBottomWidth: data.borderBottomWidth,
        borderTopWidth: data.borderTopWidth,
        height: data.height,
        marginTop: data.marginTop,
        marginBottom: data.marginBottom,
        minHeight: data.minHeight,
        opacity: 1,
        overflow: data.overflow,
        paddingBottom: data.paddingBottom,
        paddingTop: data.paddingTop
      }

      if (!data.collapsed) {
        properties = {
          borderBottomWidth: 0,
          borderTopWidth: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          minHeight: 0,
          opacity: 0,
          paddingBottom: 0,
          paddingTop: 0
        }
      }

      // $.fn.fadeUp.beforeAnimate.call($this);
      $.fn.fadeUp.animate.call($this,
        properties,
        settings.duration,
        settings.easing,
        function() {
          data = $this.data($.fn.fadeUp.dataRoot);
          var collapsed = !data.collapsed;
          $.extend(data, {
            collapsed: collapsed
          });

          // if (collapsed) $this.css('display', 'none')
          // else this.css('display', data.display);
          $.fn.fadeUp.complete.call($this, callback);
        }
      );
    });
  };

  $.fn.fadeUp.animate = $.fn.velocity ? $.fn.velocity : $.fn.animate;
  $.fn.fadeUp.dataRoot = 'fadeUp';
  $.fn.fadeUp.defaults = {
    duration: 600,
    easing: 'swing'
  };
  $.fn.fadeUp.complete = function (callback) {
    var data = this.data($.fn.fadeUp.dataRoot),
        collapsed = data.collapsed;

    // if (!collapsed) this.data($.fn.fadeUp.dataRoot, data);
    // if (collapsed) this.css('display', 'none')
    if (callback) callback.call(this, collapsed);
  };
  $.fn.fadeUp.beforeAnimate = function () {
    var data = this.data($.fn.fadeUp.dataRoot),
        collapsed = data.collapsed,
        display = data.display;

    data = $.extend(data, {
      borderBottomWidth: this.css('borderBottomWidth'),
      borderTopWidth: this.css('borderTopWidth'),
      display: this.css('display'),
      height: this.outerHeight(),
      marginBottom: this.css('marginBottom'),
      marginTop: this.css('marginTop'),
      minHeight: this.css('minHeight'),
      overflow: this.css('overflow'),
      paddingBottom: this.css('paddingBottom'),
      paddingTop: this.css('paddingTop')
    });

    if (collapsed){
      this.css('display', display);
    }
    else {
      this.data($.fn.fadeUp.dataRoot, data);
    }
  };
  $.fn.fadeUp.getData = function () {
    var $this = $(this),
        $data = $this.data($.fn.fadeUp.dataRoot) || {};

    var data =
      $data.collapsed ? {
        borderBottomWidth: $data.borderBottomWidth,
        borderTopWidth: $data.borderTopWidth,
        height: $data.height,
        marginTop: $data.marginTop,
        marginBottom: $data.marginBottom,
        minHeight: $data.minHeight,
        opacity: 1,
        overflow: $data.overflow,
        paddingBottom: $data.paddingBottom,
        paddingTop: $data.paddingTop
      } :
      {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        height: 0,
        marginTop: 0,
        marginBottom: 0,
        minHeight: 0,
        opacity: 0,
        paddingBottom: 0,
        paddingTop: 0
      };

    $data.collapsed = !$data.collapsed;

    return data;
  };
})(jQuery);
