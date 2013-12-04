var config = {
  taskName: 'shell.bower',
  command: [
    'bower install'
  ].join('&&'),
  options: {
    callback: function(err, stdout, stderr, cb) {
      console.log(stdout);

      cb();
    }
  }
};

module.exports = config;