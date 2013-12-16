var config = {
  taskName: 'jasmine.test',
  options: {
    specs: ['test/spec/**/*-test.js'],
    vendor: ['app/lib/closure-library/closure/goog/base.js'],
    helpers: ['bin/fixture-deps.js', 'bin/automan-deps.js', 'app/lib/chai/chai.js', 'test/helpers/chai.js'],
    keepRunner: true
  }
};

module.exports = config;