  module.exports = function(grunt) {

  grunt.initConfig({

    // Import package manifest
    pkg: grunt.file.readJSON('package.json'),

    // Banner definitions
    meta: {
      banner: '/*\n' +
        ' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author.name %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n'
    },

    // Lint definitions
    jshint: {
      files: ['src/jquery.fadeup.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Copy definitions
    copy: {
      dist: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/jquery.fadeup.js'],
            dest: 'dist'
          }
        ]
      },
      demo: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['src/jquery.fadeup.js'],
            dest: 'demo/js'
          }
        ]
      }
    },

    // Minify definitions
    uglify: {
      dist: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: ['src/jquery.fadeup.js'],
        dest: 'dist/jquery.fadeup.min.js'
      },
      options: {
        mangle: false,
        sourceMap: true
      }
    },

    // watch for changes to source
    // Better than calling grunt a million times
    // (call 'grunt watch')
    watch: {
      files: ['src/*'],
      tasks: ['default']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'copy']);
};
