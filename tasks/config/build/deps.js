var config = {
  configName: 'shell.deps',
  command:[
    'python app/lib/closure-library/closure/bin/build/depswriter.py --root=./app/ > app/auto-man/deps.js' 
  ].join('&&'),
  options: {
	callback: function(err, stdout, stderr, cb) {
      console.log(stdout);

      cb();
    }
  }
};

module.exports = config;