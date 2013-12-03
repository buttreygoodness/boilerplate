goog.require('AutoMan.ui.components.Factory');

goog.require('AutoMan.tests.fixtures.ui.components.TestComponent');

describe('AutoMan.ui.components.Factory', function() {
  var TestComponent = AutoMan.tests.fixtures.ui.components.TestComponent;

  var factory;

  beforeEach(function() {
    factory = new AutoMan.ui.components.Factory();
  });

  describe('#register', function() {
    it('Should register a component if its not registered already.', function() {
      factory.register(TestComponent).should.true;
      factory.register(TestComponent).should.false;
    });
  });

  describe('#unregister', function() {
    it('Should unregister a component if its registered.', function() {
      factory.unregister(TestComponent).should.false;

      factory.register(TestComponent);
      factory.unregister(TestComponent).should.true;
    });
  });

  describe('#unregisterType', function() {
    it('Should unregister a component by its type if its been registered.', function() {
      factory.unregisterType('doesnt-exist').should.be.false;

      factory.register(TestComponent);
      factory.unregisterType(TestComponent.supportedContent()).should.be.true;
    });
  });

  describe('#isRegistered', function() {
    it('Should detect if a component is registered.', function() {
      factory.isRegistered(TestComponent).should.be.false;

      factory.register(TestComponent);
      factory.isRegistered(TestComponent).should.be.true;
    });
  });

  describe('#isTypeSupported', function() {
    it('Should detect if a there is any components registered that can handle a given type.', function() {
      factory.register(TestComponent);

      factory.isTypeSupported(TestComponent.supportedContent()).should.be.true;
      factory.isTypeSupported('doesnt-exist').should.be.false;
    });
  });

  describe('#create', function() {
    it('Should create a component by type, if supported.', function() {
      factory.register(TestComponent);

      var testComponent = factory.create(TestComponent.supportedContent());

      should.not.exist(factory.create('doesnt-exist'));
      should.exist(testComponent);
      testComponent.should.be.an.instanceof(TestComponent);
    });
  });
});