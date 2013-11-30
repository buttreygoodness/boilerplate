var config = {
  configName: 'jshint',
  all: ['app/auto-man/**/*.js', 'Gruntfile.js', 'tests/**/*.js', 'tasks'],
  options: {
    expr: true,
    indent: 2,
    curly: true,
    eqeqeq: true,
    newcap: true,
    quotmark: 'single',
    unused: true,
    trailing: true,
    sub: true
  }
};

module.exports = config;