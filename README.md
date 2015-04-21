# FadeUp
A simple, jQuery plugin for fancy hiding.

# [Demo](http://fadeup.herokuapp.com/)

# Install
Install via bower, npm or copy from the `dist` directory.

### Bower:

    bower install fadeup

### NPM:

    npm install fadeup --save-dev

### Copy / Pasta:

* [jquery.fadeup.js](https://github.com/sturdynut/fadeUp/raw/master/dist/jquery.fadeup.js)
* [jquery.fadeup.min.js](https://github.com/sturdynut/fadeUp/raw/master/dist/jquery.fadeup.min.js)
* [jquery.fadeup.min.js.map](https://github.com/sturdynut/fadeUp/raw/master/dist/jquery.fadeup.min.js.map)

# Usage

    $(...).fadeUp();

    // or

    $(...).fadeUp(function(collapsed) {
      // Do things
    });

    // or

    $(...).fadeUp({
      duration: 5000,
      easing:   'swing'
    }, function(collapsed) {
      // Do things
    });

# Issues?
Please submit any issues [here](https://github.com/sturdynut/fadeUp/issues).

# Questions?
Hit me up on twitter [@sturdynut](https://twitter.com/sturdynut)
