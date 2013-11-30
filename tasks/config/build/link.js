var config = {
  configName: 'shell.link',
  command: [
    'python app/lib/closure-library/closure/bin/build/closurebuilder.py --root=app --namespace=AutoMan.start --output_mode=script --output_file=bin/auto-man.js'
  ].join('&&'),
  options: {
    callback: function(err, stdout, stderr, cb) {
      console.log(stdout);

      cb();
    }
  }
};

module.exports = config;