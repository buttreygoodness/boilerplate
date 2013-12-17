var config = {
  taskName: 'jasmine.coverage',
  src: ['app/auto-man/**/*.js'],
  options: {
    specs: ['test/spec/**-test.js'],
    vendor: ['app/lib/closure-library/closure/goog/base.js', 'test/helpers/closure.js'],
    helpers: ['bin/fixture-deps.js', 'bin/automan-deps.js', 'app/lib/chai/chai.js', 'test/helpers/chai.js'],
    template: require('grunt-template-jasmine-istanbul'),
    keepFile: true,
    templateOptions: {
      coverage: 'test/coverage/coverage.json',
      report: 'test/coverage'
    }
  }
};

module.exports = config;