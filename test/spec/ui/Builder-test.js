goog.require('AutoMan.ui.Builder');

goog.require('AutoMan.test.fixtures.ui.components');
goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.Builder', function () {
  var badContentFixture, Component, factory, builder, content;

  badContentFixture = {};

  Component = AutoMan.test.fixtures.ui.components.Component;

  factory = AutoMan.test.fixtures.ui.components.factory;

  beforeEach(function() {
    content = new AutoMan.test.fixtures.collections.Content();
    builder = new AutoMan.ui.Builder(content, factory);
  });

  afterEach(function() {
    builder.dispose();
  });

  describe('#build', function() {
    it('Should dispatch a BuildError event on error.', function(done) {
      var builder = new AutoMan.ui.Builder(badContentFixture, factory);

      builder.addEventListener(builder.Events.BuildError, function() {
        done();
      });

      builder.build().thenCatch(function() {});
    });

    it('Should return any errors that happen in build.', function(done) {
      var builder = new AutoMan.ui.Builder(badContentFixture, factory);
      
      builder.build().thenCatch(function(error) {
        should.exist(error);

        done();
      });
    });

    it('Should return components on successful build.', function(done) {
      builder.build().then(function(components) {
        should.exist(components);

        components.should.be.instanceOf(Component);

        done();
      });
    });

    it('Should return components in proper hierarchy.', function(done) {
      builder.build().then(function(components) {
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
    });

    it('Should detect when components are removed.', function(done) {
      builder.build().then(function(components) {
        content.removeChildAt(0);

        components.getChildCount().should.equal(1);

        components.getChildAt(0).getElement().id.should.equal('has-children');

        done();
      });
    });

    it('Should detect when components are added.', function(done) {
      builder.build().then(function(components) {
        content.addChild(new AutoMan.collections.Content({
          id: 'new-child',
          type: 'div'
        }));

        components.getChildCount().should.equal(3);

        components.should.be.instanceOf(Component);
        components.getChildAt(2).getElement().id.should.equal('new-child');

        done();
      });
    });

    it('Should detect when components are moved.', function(done) {
      builder.build().then(function(components) {
      });
    });
  });
});