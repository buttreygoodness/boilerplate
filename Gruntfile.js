var ConfigLoader = require('grunt-config-loader');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jscoverage: {
      options: {
        inputDirectory: 'app/auto-man',
        outputDirectory: 'test/coverage'
      }
    }
  });
  
  var configLoader = new ConfigLoader(grunt, {
    match: ['**/*.js', '!helpers/**']
  });

  configLoader.loadAll();

  grunt.loadNpmTasks("grunt-jscoverage");

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('bower', 'shell:bower');
  grunt.registerTask('setup', ['shell:resolve-build-deps', 'bower']);

  grunt.registerTask('deps', ['shell:deps']);
  grunt.registerTask('link', ['shell:link']);
  grunt.registerTask('compile', ['closure-compiler']);
  grunt.registerTask('build', ['test', 'jsdoc', 'deps', 'link', 'compile']);
  
  grunt.registerTask('dev', ['connect:keep-alive']);

  grunt.registerTask('test', ['deps', 'shell:test-fixture-builder', 'connect:test', 'jasmine:test']);

  grunt.registerTask('coverage', ['jscoverage', 'shell:build-coverage-deps']);

  grunt.registerTask('default', ['watch']);
};