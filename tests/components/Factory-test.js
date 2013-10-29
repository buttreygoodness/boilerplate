goog.require('AutoMan.components.Factory');
goog.require('AutoMan.components.AbstractComponent');

var TestComponent = function(options) {
	goog.base(this);
};

goog.inherits(TestComponent, AutoMan.components.AbstractComponent);

goog.object.extend(TestComponent, AutoMan.components.AbstractComponent);

TestComponent.supportedContent = function() {
	return 'text';
}

describe('AutoMan.components.Factory', function() {

	var factory;

	beforeEach(function() {
		factory = new AutoMan.components.Factory();
	});

	describe('#register', function() {
		it('should register a component if its not registered already.', function() {
			factory.register(TestComponent).should.true;
			factory.register(TestComponent).should.false;
		});
	});

	describe('#unregister', function() {
		it('should unregister a component if its registered.', function() {
			factory.unregister(TestComponent).should.false;

			factory.register(TestComponent);
			factory.unregister(TestComponent).should.true;
		});
	});

	describe('#unregisterType', function() {
		it('should unregister a component by its type if its been registered.', function() {
			factory.unregisterType('doesnt-exist').should.be.false;

			factory.register(TestComponent);
			factory.unregisterType(TestComponent.supportedContent()).should.be.true;
		});
	});

	describe('#isRegistered', function() {
		it('should detect if a component is registered.', function() {
			factory.isRegistered(TestComponent).should.be.false;

			factory.register(TestComponent);
			factory.isRegistered(TestComponent).should.be.true;
		});
	});

	describe('#isTypeSupported', function() {
		it('should detect if a there is any components registered that can handle a given type.', function() {
			factory.register(TestComponent);

			factory.isTypeSupported(TestComponent.supportedContent()).should.be.true;
			factory.isTypeSupported('doesnt-exist').should.be.false;
		});
	});

	describe('#create', function() {
		it('should create a component by type, if supported.', function() {
			factory.register(TestComponent);

			var testComponent = factory.create(TestComponent.supportedContent());

			should.not.exist(factory.create('doesnt-exist'));
			should.exist(testComponent);
			testComponent.should.be.an.instanceof(TestComponent);
		});
	});
});