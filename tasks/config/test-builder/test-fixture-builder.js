var config = {
  configName: 'shell.test-fixture-builder',
  command:[
    'python app/lib/closure-library/closure/bin/build/depswriter.py --root_with_prefix="tests/fixtures ../../../../../tests/fixtures" > bin/fixture-deps.js' 
  ].join('&&'),
  options: {
	callback: function(err, stdout, stderr, cb) {
      console.log(stderr);

      cb();
    }
  }
};

module.exports = config;