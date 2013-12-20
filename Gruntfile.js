var ConfigLoader = require('grunt-config-loader');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });
  
  var configLoader = new ConfigLoader(grunt, {
    match: ['**/*.js', '!helpers/**']
  });

  configLoader.loadAll();
    
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('bower', 'shell:bower');
  grunt.registerTask('setup', ['shell:resolve-build-deps', 'bower']);

  grunt.registerTask('deps', ['shell:deps']);
  grunt.registerTask('link', ['shell:link']);
  grunt.registerTask('build-css', ['less:development']);
  grunt.registerTask('compile', ['closure-compiler']);
  grunt.registerTask('build', ['test', 'jsdoc', 'deps', 'link', 'compile', 'less:production']);
  
  grunt.registerTask('dev', ['connect:keep-alive']);

  grunt.registerTask('build-test-fixtures', ['shell:fixture-builder']);
  grunt.registerTask('build-test-runner', require('./tasks/helpers/super-glob.js')(grunt, 'test-builder'));
  grunt.registerTask('build-coverage-runner', require('./tasks/helpers/super-glob.js')(grunt, 'coverage-builder'));
  grunt.registerTask('build-tests', ['build-test-fixtures', 'build-test-runner', 'build-coverage-runner']);
  grunt.registerTask('test', ['deps', 'build-tests', 'connect:test', 'mocha_phantomjs:test']);

  grunt.registerTask('default', ['watch']);
};