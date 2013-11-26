var config = {
  configName: 'shell.resolve-build-deps',
  command: [
    'git clone https://code.google.com/p/closure-compiler/ bin/closure-compiler',
    'cd bin/closure-compiler',
    'ant'
  ].join('&&'),
  options: {
    callback: function(err, stdout, stderr, cb) {
      console.log(stdout, stdout, stderr);

      cb();
    }
  }
};

module.exports = config;