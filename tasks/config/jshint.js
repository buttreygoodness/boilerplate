var config = {
  configName: 'jshint',
  all: ['app/auto-man/**/*.js', 'Gruntfile.js', 'tests/**/*.js', 'tasks'],
  options: {
    expr: true
  }
};

module.exports = config;