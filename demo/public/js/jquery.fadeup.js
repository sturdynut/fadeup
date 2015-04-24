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
(function (factory) {
  if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory(jQuery);
  }
}(function ($) {
  "use strict";
   /* * * * * * * * * * * * * * * * * * * * *
   *  FadeUp Prototype
   *   - defaultSettings: gets default settings.
   *   - complete: called after animate is done.
   *   - beforeAnimate: called before animate.
   *   - getProperties: gets properties for an element.
   * * * * * * * * * * * * * * * * * * * * */
  var FadeUp = function(options, callback) {
    callback = typeof options === 'function' ? options : callback;
    options = $.extend({}, FadeUp.prototype.defaultSettings, options);
    var duration = options.duration,
        easing = options.easing,
        $this = $(this);

    /* Throttle requests to prevent many queued messages.
    * * * * * * * * * * * * * * * * * * * * */
    if (FadeUp.prototype._locked.call(this) === true) {
      return;
    }
    /* Lock this element to prevent subsequent calls
     * until animation is complete.
    * * * * * * * * * * * * * * * * * * * * */
    FadeUp.prototype._lock.call(this);

    /* animate() properties and onComplete.
    * * * * * * * * * * * * * * * * * * * * */
    var properties = FadeUp.prototype._properties.call(this)
      , onComplete = function() {
                       var elementProperties = FadeUp.prototype.getProperties.call(this);
                       elementProperties.collapsed = !elementProperties.collapsed;
                       $this.data($.fn.fadeUp.dataNamespace, elementProperties);

                       FadeUp.prototype.complete.call($this, callback);
                     };

    /* Before animate()
    * * * * * * * * * * * * * * * * * * * * */
    FadeUp.prototype.beforeAnimate.call($this);

    /* Calling animate()
    * * * * * * * * * * * * * * * * * * * * */
    $.fn.fadeUp.animate.call($this,
      properties,
      duration,
      easing,
      onComplete
    );
  };

  /* defaultSettings
    * * * * * * * * * * * * * * * * * * * * */
  FadeUp.prototype.defaultSettings = {
    duration: 650,
    easing: 'easeOutCubic'
  };

  /* complete
   *  - Sets element to display 'none' if collapsed.
   *  - Calls callback if provided.
   * * * * * * * * * * * * * * * * * * * * */
  FadeUp.prototype.complete = function(callback) {
    var elementProperties = FadeUp.prototype.getProperties.call(this),
        collapsed = elementProperties.collapsed;

    if (collapsed) {
      this.css('display', 'none');
    }
    if (callback) {
      callback.call(this, collapsed);
    }

    /* Unlock element to allow subsequent calls.
    * * * * * * * * * * * * * * * * * * * * */
    FadeUp.prototype._unlock.call(this);
  };

  /* beforeAnimate
   *  - Called before animate.
   *  - Resets the elements display from 'none'.
   * * * * * * * * * * * * * * * * * * * * */
  FadeUp.prototype.beforeAnimate = function() {
    var elementProperties = this.data($.fn.fadeUp.dataNamespace),
        collapsed = elementProperties.collapsed,
        display = elementProperties.display;

    if (collapsed){
      this.css('display', display);
    }
  };

  /* getProperties
   *  - Gets properties
   *  - Sets initial properties (height, border, etc)
   * * * * * * * * * * * * * * * * * * * * */
  FadeUp.prototype.getProperties = function() {
    var $this = $(this),
        elementProperties  = $this.data($.fn.fadeUp.dataNamespace);

    if (typeof elementProperties !== 'object') {
      elementProperties = FadeUp.prototype._setProperties.call(this, $this);
      $this.data($.fn.fadeUp.dataNamespace, elementProperties);
    }

    return elementProperties;
  };

  /* Private
   * * * * * * * * * * * * * * * * * * * * */
  FadeUp.prototype._locked = function() {
    return $(this).data('locked') === true;
  };
  FadeUp.prototype._lock = function() {
    $(this).data('locked', true);
  };
  FadeUp.prototype._unlock = function() {
    $(this).data('locked', false);
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
  FadeUp.prototype._setProperties = function(updates) {
    var isjQueryObject = typeof updates.jquery === 'string';

    if (isjQueryObject) {
      return {
        borderBottomWidth: updates.css('borderBottomWidth'),
        borderTopWidth: updates.css('borderTopWidth'),
        collapsed: false,
        display: updates.css('display'),
        height: updates.outerHeight(),
        marginTop: updates.css('marginTop'),
        marginBottom: updates.css('marginBottom'),
        minHeight: updates.css('minHeight'),
        opacity: 1,
        paddingBottom: updates.css('paddingBottom'),
        paddingTop: updates.css('paddingTop')
      };
    }
    else {
      return {
        borderBottomWidth: updates.borderBottomWidth,
        borderTopWidth: updates.borderTopWidth,
        collapsed: false,
        display: updates.display,
        height: updates.height,
        marginTop: updates.marginTop,
        marginBottom: updates.marginBottom,
        minHeight: updates.minHeight,
        opacity: 1,
        paddingBottom: updates.paddingBottom,
        paddingTop: updates.paddingTop
      };
    }
  };
  FadeUp.prototype._properties = function() {
    var $this = $(this),
        elementProperties = FadeUp.prototype.getProperties.call(this);

    return elementProperties.collapsed ?
      FadeUp.prototype._setProperties(elementProperties) :
      FadeUp.prototype._defaultProperties;
  };

  /* * * * * * * * * * * * * * * * * * * * * *
   *  FadeUp jQuery Plugin
   *  Usage:  $('.item').fadeUp();
              // Provide callback for complete.
   *     or:  $('.item').fadeUp(function(collapsed) { ... });
   *     or:  $('.item').fadeUp({ ... }, function(collapsed) { ... });
   * * * * * * * * * * * * * * * * * * * * * */
  $.fn.fadeUp = function(options, callback) {
    return this.each(function(index, item) {
      FadeUp.call(item, options, callback);
    });
  };
  // Overridables
  $.fn.fadeUp.animate = $.fn.velocity ? $.fn.velocity : $.fn.animate;
  $.fn.fadeUp.dataNamespace = 'fadeUp';

}));
