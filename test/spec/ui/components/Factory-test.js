goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.test.fixtures.ui.components.Component');
goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.components.Factory', function() {
  var Component = AutoMan.test.fixtures.ui.components.Component;

  var factory;

  beforeEach(function() {
    factory = new AutoMan.ui.components.Factory();
  });

  describe('#create', function() {
    it('Should create a component by type, if supported.', function() {
      factory.register(Component);

      var component = factory.create(Component.supportedContent(), new AutoMan.test.fixtures.collections.Content());

      component.should.exist;
      component.should.be.an.instanceof(Component);
    });
  });
});