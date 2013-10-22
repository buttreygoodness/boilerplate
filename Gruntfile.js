module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['{app,test}/**/*.js'],
        tasks: ['jshint', 'simplemocha'],
        options: {
          spawn: true,
        },
      },
    },

    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: ['test/**/*-test.js'] }
    },

    'closure-compiler': {
      frontend: {
       closurePath: 'closurePath',
       js: 'app/auto-man.js',
       jsOutputFile: 'bin/auto-man.min.js',
       options: {
         language_in: 'ECMASCRIPT5_STRICT'
       }
      }
    },

    jshint: {
      files: ['app/*.js'],
      options: {}
    }
    
  });
    
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-compiler');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('build', ['closure-compiler']);
};