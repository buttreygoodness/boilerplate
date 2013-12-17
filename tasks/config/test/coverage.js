var config = {
  taskName: 'jasmine.coverage',
  src: ['app/auto-man/**/*.js'],
  options: {
    version: '1.3.1',
    specs: ['test/spec/**/*-test.js'],
    vendor: ['app/lib/chai/chai.js', 'app/lib/closure-library/closure/goog/base.js'],
    helpers: ['test/helpers/monkey-patch.js', 'test/helpers/chai.js', 'bin/fixture-deps.js', 'bin/automan-deps.js', 'test/helpers/boot-strap.js'],
    template: require('grunt-template-jasmine-istanbul'),
    templateOptions: {
      coverage: 'test/coverage/coverage.json',
      report: 'test/coverage',
    }
  }
};

module.exports = config;