var _ = require('underscore');
var fs = require('fs');
var Mustache = require('mustache');

var options = {
  taskName: 'coverage-builder',

  match: ['app/auto-man/**/*.js', 'test/spec/**/*.js'],

  template: [__dirname, 'coverage-runner.template'].join('/'),
  
  coverageRunner: [process.cwd(), 'test/coverage/index.html'].join('/'),

  map: function(script) {
    return {
      path : ['', script].join('/'),
      spec : script.indexOf('test/spec') === 0
    };
  },

  onComplete: function(scripts, done) {

    var template = fs.readFileSync(options.template).toString();
    
    var view = {
      spec: [],
      app: []
    };

    _.forEach(scripts, function(script) {
      if(script.spec) {
        view.spec.push(script.path);
      } else {
        view.app.push(script.path);
      }
    });

    fs.writeFileSync(options.coverageRunner, Mustache.render(template, view));

    done();
  }
};

module.exports = options;