var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var Mustache = require('mustache');

var options = {
  configName: 'test-builder',

  cwd: 'tests',

  match: ['**/**.js', '!fixtures/**'],

  template: [__dirname, 'test-builder-template.html'].join('/'),
  
  testRunnerMain: [process.cwd(), 'tests/test-runner.html'].join('/'),

  map: function(script) {
    return ['' , options.cwd, script].join('/');
  },

  onComplete: function(scripts, done) {
    var template = fs.readFileSync(options.template).toString();
    
    var view = {'scripts' : scripts};

    _.each(scripts, function(script) {
      var out = path.dirname('./' + script) + '/' + path.basename(script, path.extname(script)) + '.html';
      
      fs.writeFileSync(out, Mustache.render(template, {'scripts': [script]}));
    });

    fs.writeFileSync(options.testRunnerMain, Mustache.render(template, view));

    done();
  }
};

module.exports = options;