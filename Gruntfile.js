var _ = require('underscore');

var ConfigLoader = require('./tasks/helpers/config-loader');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['{app,tests}/**/*.js', 'tasks/**/*.js', '!app/auto-man/deps.js'],
        tasks: ['jshint', 'deps'],
        options: {
          spawn: true
        },
      },
    }
  });
  
  var configLoader = new ConfigLoader({}, grunt);

  configLoader.loadAll();
    
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodestatic');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('bower', 'shell:bower');

  grunt.registerTask('setup', ['shell:resolve-build-deps', 'bower']);
  grunt.registerTask('deps', ['shell:deps']);
  grunt.registerTask('link', ['shell:link']);
  grunt.registerTask('build', ['deps', 'link', 'closure-compiler']);
  grunt.registerTask('dev', ['nodestatic']);
  grunt.registerTask('test', ['mocha_phantomjs']);

  grunt.registerTask('test-builder', require('./tasks/helpers/super-glob.js')(grunt, 'test-builder'));

  grunt.registerTask('default', ['watch']);
};