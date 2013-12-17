var config = {
  taskName: 'jasmine.coverage',
  src: ['app/auto-man/**/*.js'],
  options: {
    specs: ['test/spec/**/*-test.js'],
    vendor: ['app/lib/closure-library/closure/goog/base.js', 'app/lib/jquery/jquery.min.js', 'test/helpers/monkey-patch.js'],
    helpers: ['bin/fixture-deps.js', 'bin/automan-deps.js', 'app/lib/chai/chai.js', 'test/helpers/chai.js'],
    template: require('grunt-template-jasmine-istanbul'),
    templateOptions: {
      coverage: 'test/coverage/coverage.json',
      report: 'test/coverage',
      thresholds: {
        lines: 90,
        statements: 90,
        branches: 90,
        functions: 90
      }
    }
  }
};

module.exports = config;