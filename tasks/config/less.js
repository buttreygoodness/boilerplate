var config = {
  taskName: 'less',
  development: {
    options: {
      paths: ['app/lib/bootstrap/less'],
      report: false,
      cleancss: false
    },
    files: {
      'app/sandbox/css/index.css': ['app/sandbox/less/index.less']
    }
  },
  production: {
    options: {
      paths: ['app/lib/bootstrap/less'],
      report: 'gzip',
      cleancss: true
    },
    files: {
      'app/sandbox/css/index.css': ['app/sandbox/less/index.less']
    }
  }
};

module.exports = config;