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
   *   - getProperties: gets properties for an element.
   * * * * * * * * * * * * * * * * * * * * */
  window.FadeUp = function(options, callback) {
    callback  = typeof options === 'function' ? options : callback;
    options  = $.extend({}, FadeUp.prototype.defaultSettings, options);
    var duration  = options.duration,
        easing    = options.easing,
        $this     = $(this);

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
                       data = FadeUp.prototype.getProperties.call(this);
                       data.collapsed = !data.collapsed;
                       $this.data($.fn.fadeUp.dataNamespace, data);

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
    var data      = FadeUp.prototype.getProperties.call(this),
        collapsed = data.collapsed;

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
    var data      = this.data($.fn.fadeUp.dataNamespace),
        collapsed = data.collapsed,
        display   = data.display;

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
        data  = $this.data($.fn.fadeUp.dataNamespace);

    if (typeof data !== 'object') {
      data = FadeUp.prototype._setProperties.call(this, $this);
      $this.data($.fn.fadeUp.dataNamespace, data);
    }

    return data;
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
        data = FadeUp.prototype.getProperties.call(this);

    return data.collapsed ?
      FadeUp.prototype._setProperties(data) :
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

})(jQuery);
