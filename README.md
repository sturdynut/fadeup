# FadeUp
A simple, jQuery plugin for fancy hiding.

# Demo
[Live demo here](http://fadeup.herokuapp.com/)

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

# Example
    <button type='button' class='btn'>Go</button>
    <div class='content'>
      ...
    </div>

    <script>
      $(function() {
        $('.btn').on('click', function() {
          $('.content').fadeUp();
        });
      });
    </script>

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

## Browser Support
Chrome, Safari, Firefox, IE 9+

## Velocity Integration
[Velocity](http://julian.com/research/velocity/) will be used if available.  You don't have to do anything, if it is there, it uses it.  #winning.

## Issues?
Please submit any issues [here](https://github.com/sturdynut/fadeUp/issues).

## Questions?
Hit me up on twitter [@sturdynut](https://twitter.com/sturdynut)
