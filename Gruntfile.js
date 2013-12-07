module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    filename: 'angular-drag-drop',
    
    commons: {
      banner: '/*\n' +
              ' * <%= pkg.name %> v<%= pkg.version %> (https://github.com/redaemn/angular-drag-drop)\n' +
              ' * <%= grunt.template.today("yyyy-mm-dd") %>\n' +
              ' * Author: <%= pkg.author %>\n' +
              ' *\n' +
              ' * This software is licensed under The MIT License (MIT)\n' +
              ' * https://github.com/redaemn/angular-drag-drop/LICENSE\n' +
              ' */\n\n'
    },
    
    jshint: {
      dist: ['Gruntfile.js','src/**/*.js', 'test/**/*.js']
    },
    
    uglify: {
      options: {
        report: 'min'
      },
      dist: {
        options: {
          banner: '<%= commons.banner %>'
        },
        files: {
          'dist/<%= filename %>-<%= pkg.version %>.min.js': ['src/**/*.js']
        }
      }
    },
    
    karma: {
      singleRun: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      coverage: {
        configFile: 'karma.conf.js',
        singleRun: true,
        preprocessors: {
          'src/**/*.js': 'coverage'
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        }
      },
      watch: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    },
    
    clean: {
      dist: ['dist/*.js']
    }
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-clean');

  /****************************************
   * Default task
   ****************************************/

  grunt.registerTask('default',
    'Lint JS files, run tests and then build',
    ['jshint:dist', 'karma:singleRun', 'uglify:dist']
  );
  
  /****************************************
   * Build Task
   ****************************************/
   
   grunt.registerTask('build',
    'Lint JS files and then minify',
    ['clean:dist', 'jshint:dist', 'uglify:dist']
   );
};