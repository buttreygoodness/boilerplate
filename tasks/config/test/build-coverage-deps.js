var config = {
  taskName: 'shell.build-coverage-deps',
  command:[
    'python app/lib/closure-library/closure/bin/build/depswriter.py --root_with_prefix="test/coverage ../../../../../test/coverage" > bin/coverage-deps.js'
  ].join('&&'),
  options: {
    callback: function(err, stdout, stderr, cb) {
      console.log(stdout);

      cb();
    }
  }
};

module.exports = config;