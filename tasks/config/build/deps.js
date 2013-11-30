var config = {
  configName: 'shell.deps',
  command:[
    'python app/lib/closure-library/closure/bin/build/depswriter.py --root_with_prefix="app/auto-man ../../../../../app/auto-man" > bin/automan-deps.js'
  ].join('&&'),
  options: {
    callback: function(err, stdout, stderr, cb) {
      console.log(stdout);

      cb();
    }
  }
};

module.exports = config;