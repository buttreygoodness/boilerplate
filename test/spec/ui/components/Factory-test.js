goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.test.fixtures.ui.components.Component');
goog.require('AutoMan.test.fixtures.collections.Content');

describe('AutoMan.ui.components.Factory', function() {
  var Component = AutoMan.test.fixtures.ui.components.Component;

  var factory;

  beforeEach(function() {
    factory = new AutoMan.ui.components.Factory();
  });

  describe('#register', function() {
    it('Should register a component if its not registered already.', function() {
      factory.register(Component).should.true;
      factory.register(Component).should.false;
    });
  });

  describe('#unregister', function() {
    it('Should unregister a component if its registered.', function() {
      factory.unregister(Component).should.false;

      factory.register(Component);
      factory.unregister(Component).should.true;
    });
  });

  describe('#unregisterType', function() {
    it('Should unregister a component by its type if its been registered.', function() {
      factory.unregisterType('doesnt-exist').should.be.false;

      factory.register(Component);
      factory.unregisterType(Component.supportedContent()).should.be.true;
    });
  });

  describe('#isRegistered', function() {
    it('Should detect if a component is registered.', function() {
      factory.isRegistered(Component).should.be.false;

      factory.register(Component);
      factory.isRegistered(Component).should.be.true;
    });
  });

  describe('#isTypeSupported', function() {
    it('Should detect if a there is any components registered that can handle a given type.', function() {
      factory.register(Component);

      factory.isTypeSupported(Component.supportedContent()).should.be.true;
      factory.isTypeSupported('doesnt-exist').should.be.false;
    });
  });

  xdescribe('#create', function() {
    it('Should create a component by type, if supported.', function() {
      factory.register(Component);

      var component = factory.create(Component.supportedContent(), new AutoMan.test.fixtures.collections.Content());

      should.not.exist(factory.create('doesnt-exist'));
      should.exist(component);
      component.should.be.an.instanceof(Component);
    });
  });
});