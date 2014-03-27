// Generated on 2013-12-06 using generator-angular-fullstack 1.0.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-ngmin');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'public',
      views: 'views'
    },

    concat: {
        options: {
            // Replace all 'use strict' statements in the code with a single one at the top
            //from: https://github.com/gruntjs/grunt-contrib-concat
            banner: "'use strict';\n",
            process: function(src, filepath) {
                return '// Source: ' + filepath + '\n' +
                    src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            }
        },
        dist: {
              src: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
              dest: 'dist/app.js'
        }
      },


    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: '*.js',
          dest:'dist'
        }]
      }
    },


     cssmin: {
       dist: {
         files: {
           'dist/main.min.css': [
             '<%= yeoman.app %>/styles/{,*/}*.css'
           ]
         }
       }
    },

     uglify: {
          dist: {
               files: {
               'dist/app.min.js': ['dist/app.js']
               }
          }
     }
  });

  grunt.registerTask('build', [
    'concat',
    'ngmin',
    'cssmin',
    'uglify'
  ]);


};
