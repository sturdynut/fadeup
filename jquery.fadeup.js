/* * * * * * * * * * * * * * * * * * * * * *
 * jQuery FadeUp Plugin 0.0.1
 * https://github.com/sturdynut/fadeup
 *
 * Copyright 2015, Matti Salokangas
 * https://github.com/sturdynut
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 * * * * * * * * * * * * * * * * * * * * * */

(function($) {
   /* * * * * * * * * * * * * * * * * * * * *
   *  FadeUp Prototype
   *   - defaultSettings: gets default settings.
   *   - complete: called after animate is done.
   *   - beforeAnimate: called before animate.
   *   - getData: gets properties for an element.
   * * * * * * * * * * * * * * * * * * * * */
  var FadeUp = function() {
    var callback = typeof options === 'function' ? options : callback;
    var options = typeof options === 'object' ? options : {};
    var settings = $.extend({}, FadeUp.prototype.defaultSettings, options);
    var $this = $(this);


    var animateProperties =
      FadeUp.prototype._getAnimationPropertyCollection.call(this);

    FadeUp.prototype.beforeAnimate.call($this);
    console.log('Calling animate...data:', JSON.stringify(animateProperties));

    var animateComplete = function() {
      data = FadeUp.prototype.getData.call(this);
      data.collapsed = !data.collapsed;
      $this.data($.fn.fadeUp.dataRoot, data);

      FadeUp.prototype.complete.call($this, callback);
    };

    $.fn.fadeUp.animate.call($this,
      animateProperties,
      settings.duration,
      settings.easing,
      animateComplete
    );
  };
  FadeUp.prototype.defaultSettings = {
    duration: 650,
    easing: 'easeOutCubic'
  };
  FadeUp.prototype.complete = function (callback) {
    var data = FadeUp.prototype.getData.call(this),
        collapsed = data.collapsed;

    if (collapsed)
      this.css('display', 'none');
    if (callback)
      callback.call(this, collapsed);
  };
  FadeUp.prototype.beforeAnimate = function () {
    var data = this.data($.fn.fadeUp.dataRoot),
        collapsed = data.collapsed,
        display = data.display;

    if (collapsed)
      this.css('display', display);
  };
  FadeUp.prototype.getData = function () {
    var $this = $(this),
        data = $this.data($.fn.fadeUp.dataRoot);

    if (typeof data !== 'object') {
      data = FadeUp.prototype._getPropertiesCollection.call(this, $this);
      $this.data($.fn.fadeUp.dataRoot, data);
    }

    return data;
  };
  FadeUp.prototype._defaultProperties = {
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
  FadeUp.prototype._getPropertiesCollection = function (updatedProperties) {
    var isjQueryObject = typeof updatedProperties.jquery === 'string';

    if (!isjQueryObject) {
      return {
        borderBottomWidth: updatedProperties.borderBottomWidth,
        borderTopWidth: updatedProperties.borderTopWidth,
        collapsed: false,
        display: updatedProperties.display,
        height: updatedProperties.height,
        marginTop: updatedProperties.marginTop,
        marginBottom: updatedProperties.marginBottom,
        minHeight: updatedProperties.minHeight,
        opacity: 1,
        paddingBottom: updatedProperties.paddingBottom,
        paddingTop: updatedProperties.paddingTop
      };
    }
    else {
      return {
        borderBottomWidth: updatedProperties.css('borderBottomWidth'),
        borderTopWidth: updatedProperties.css('borderTopWidth'),
        collapsed: false,
        display: updatedProperties.css('display'),
        height: updatedProperties.outerHeight(),
        marginTop: updatedProperties.css('marginTop'),
        marginBottom: updatedProperties.css('marginBottom'),
        minHeight: updatedProperties.css('minHeight'),
        opacity: 1,
        paddingBottom: updatedProperties.css('paddingBottom'),
        paddingTop: updatedProperties.css('paddingTop')
      };
    }
  }
  FadeUp.prototype._getAnimationPropertyCollection = function() {
    var $this = $(this),
        data = FadeUp.prototype.getData.call(this);

    return data.collapsed ?
      FadeUp.prototype._getPropertiesCollection(data) :
      FadeUp.prototype._defaultProperties;
  };

  /* * * * * * * * * * * * * * * * * * * * * *
   *  FadeUp jQuery Plugin
   *  Usage:  $('.item').fadeUp();
   *     or:  $('.item').fadeUp(function(collapsed) { ... });
   *     or:  $('.item').fadeUp({ ... }, function(collapsed) { ... });
   * * * * * * * * * * * * * * * * * * * * * */
  $.fn.fadeUp = function (options, callback) {
    return this.each(FadeUp);
  };
  // Overridables
  $.fn.fadeUp.animate = $.fn.velocity ? $.fn.velocity : $.fn.animate;
  $.fn.fadeUp.dataRoot = 'fadeUp';

})(jQuery);
