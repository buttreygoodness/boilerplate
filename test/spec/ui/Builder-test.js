goog.require('AutoMan.ui.Builder');

goog.require('AutoMan.test.fixtures.ui.components');
goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.Builder', function () {
  var badContentFixture, Component, factory, builder;

  badContentFixture = {};

  Component = AutoMan.test.fixtures.ui.components.Component;

  factory = AutoMan.test.fixtures.ui.components.factory;

  beforeEach(function() {
    builder = new AutoMan.ui.Builder(new AutoMan.test.fixtures.collections.Content(), factory);
  });

  afterEach(function() {
    builder.dispose();
  });

  describe('#build', function() {
    it('Should dispatch a BuildStart event on start.', function(done) {
      builder.addEventListener(builder.Events.BuildStart, function() {
        done();
      });

      builder.build();
    });

    it('Should dispatch a BuildError event on error.', function(done) {
      var builder = new AutoMan.ui.Builder(badContentFixture, factory);

      builder.addEventListener(builder.Events.BuildError, function() {
        done();
      });

      builder.build();
    });

    it('Should dispatch a BuildComplete event on complete.', function(done) {
      builder.addEventListener(builder.Events.BuildComplete, function() {
        done();
      });

      builder.build();
    });
  });

  describe('#getComponents', function() {
    it('Should return no components before build but should be an array.', function() {
      builder.getComponents().should.be.an.array;

      builder.getComponents().should.be.empty;
    });

    it('Should return no components on failed build.', function(done) {
      var builder = new AutoMan.ui.Builder(badContentFixture, factory);

      builder.addEventListener(builder.Events.BuildError, function(e) {
        e.target.getComponents().should.be.empty;

        done();
      });

      builder.build();
    });

    it('Should return components on build complete.', function(done) {
      builder.addEventListener(builder.Events.BuildComplete, function(e) {
        e.target.getComponents().should.not.be.empty;

        done();
      });

      builder.build();
    });

    it('Should return a proper type.', function(done) {
      builder.addEventListener(builder.Events.BuildComplete, function(e) {
        e.target.getComponents().should.be.instanceOf(Component);

        done();
      });

      builder.build();
    });

    it('Should return components in proper hierarchy.', function(done) {
      builder.addEventListener(builder.Events.BuildComplete, function(e) {
        components = e.target.getComponents();

        components.getChildCount().should.equal(2);

        components.getChildAt(0).should.be.instanceOf(Component);
        components.getChildAt(0).getElement().id.should.equal('no-child');
        components.getChildAt(0).getChildCount().should.equal(0);

        components.getChildAt(1).should.be.instanceOf(Component);
        components.getChildAt(1).getElement().id.should.equal('has-children');
        components.getChildAt(1).getChildCount().should.equal(2);

        components.getChildAt(1).getChildAt(0).should.be.instanceOf(Component);
        components.getChildAt(1).getChildAt(0).getElement().id.should.equal('child-1');
        components.getChildAt(1).getChildAt(0).getChildCount().should.equal(0);

        components.getChildAt(1).getChildAt(1).should.be.instanceOf(Component);
        components.getChildAt(1).getChildAt(1).getElement().id.should.equal('child-2');
        components.getChildAt(1).getChildAt(1).getChildCount().should.equal(0);

        done();
      });

      builder.build();
    });
  });
});