var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');

var options = {
  taskName: 'test-builder',

  cwd: 'test/spec',

  match: ['**/**.js'],

  template: [__dirname, 'test-runner.template'].join('/'),
  
  testRunnerMain: [process.cwd(), 'test/spec/index.html'].join('/'),

  map: function(script) {
    return ['' , options.cwd, script].join('/');
  },

  onComplete: function(scripts, done) {
    var template = fs.readFileSync(options.template).toString();
    
    var view = {'scripts' : scripts};

    fs.writeFileSync(options.testRunnerMain, Mustache.render(template, view));

    done();
  }
};

module.exports = options;