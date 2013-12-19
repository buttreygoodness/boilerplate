var config = {
  taskName: 'less',
  development: {
    options: {
      report: 'min'
    },
    files: {
      'app/sandbox/css/index.css': ['app/sandbox/less/**/*.less']
    }
  }
};

module.exports = config;