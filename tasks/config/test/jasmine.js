var config = {
  taskName: 'jasmine.test',
  options: {
    specs: ['test/spec/**/*-test.js'],
    vendor: ['app/lib/closure-library/closure/goog/base.js', 'app/lib/chai/chai.js'],
    helpers: ['bin/fixture-deps.js', 'bin/automan-deps.js', 'test/helpers/chai.js', 'test/helpers/boot-strap.js'],
    outfile: 'test/spec/index.html',
    keepRunner: true
  }
};

module.exports = config;