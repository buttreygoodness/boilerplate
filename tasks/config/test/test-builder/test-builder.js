var fs = require('fs');
var Mustache = require('mustache');

var options = {
  taskName: 'test-builder',

  cwd: 'test/spec',

  match: ['**/**.js'],

  template: [__dirname, 'test-runner.template'].join('/'),
  
  specRunner: [process.cwd(), 'test/spec/index.html'].join('/'),

  map: function(script) {
    return ['' , this.cwd, script].join('/');
  },

  onComplete: function(scripts, done) {
    var template = fs.readFileSync(this.template).toString();
    
    var view = {'scripts' : scripts};

    fs.writeFileSync(this.specRunner, Mustache.render(template, view));

    done();
  }
};

module.exports = options;