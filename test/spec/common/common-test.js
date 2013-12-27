goog.require('AutoMan.common');

describe('AutoMan.common', function() {
  var template = AutoMan.common.generateUUID.template;

  afterEach(function() {
    AutoMan.common.generateUUID.template = template;
  });

  describe('#generateUUID', function() {
    it('Should generate a string', function() {
      AutoMan.common.generateUUID().should.be.a.string;
    });

    it('Should be unique.', function() {
      var uuidMap, iteration;

      uuidMap = {};

      for(iteration = 0; iteration < 250; iteration++) {
        var uuid = AutoMan.common.generateUUID();

        uuidMap.should.not.contain.key(uuid);

        uuidMap[uuid] = uuid;
      }
    });

    it('Should use static template.', function() {
      AutoMan.common.generateUUID.template = 'xxy4';

      AutoMan.common.generateUUID().should.have.length(4);
      AutoMan.common.generateUUID().slice(-1).should.equal('4');
    });
  });

  describe('#implementsInterface', function() {
    var AnimalInterface = function() {};

    AnimalInterface.prototype.say =  AutoMan.common.interfaceMethod;

    AnimalInterface.animal = AutoMan.common.interfaceMethod;

    AnimalInterface.concrete = function() {};

    var Cat = function() {};

    AutoMan.common.implementsInterface(Cat, AnimalInterface);

    it('Should add interface prototype methods to constructor.', function() {
      Cat.prototype.should.contain.key('say');
      Cat.prototype.say.should.equal(AutoMan.common.interfaceMethod);
    });

    it('Should add static methods from interface to constructor.', function() {
      Cat.should.contain.key('animal');
      Cat.animal.should.equal(AutoMan.common.interfaceMethod);
    });

    it('Should not add any non AutoMan.common.interfaceMethod to constructor.', function() {
      Cat.should.not.contain.key('concrete');
    });
  });

  describe('#interfaceMethod', function() {
    it('Should throw.', function() {
      AutoMan.common.interfaceMethod.should.throw();
    });
  });

  describe('#assert', function() {
    it('Should throw on falsey statments.' , function() {
      var throwMe = function() {
        AutoMan.common.assert(false);
      };

      throwMe.should.throw();
    });

    it('Should not throw on truthy statments.', function() {
      var dontThrowMe = function() {
        AutoMan.common.assert(true);
      };

      dontThrowMe.should.not.throw();
    });

    it('Should wrap and throw error provided as AutoMan.common.Error.', function() {
      var exception;

      try {
        AutoMan.common.assert(false, 'ERROR');
      } catch(e) {
        exception = e;
      }

      should.exist(exception);

      exception.should.be.instanceOf(AutoMan.common.Error);
      exception.getCode().should.equal('ERROR');
    });

    it('Should wrap and throw generic error as AutoMan.common.Error.', function() {
      var exception;

      try {
        AutoMan.common.assert(false);
      } catch(e) {
        exception = e;
      }

      should.exist(exception);

      exception.should.be.instanceOf(AutoMan.common.Error);
      exception.getCode().should.equal(AutoMan.common.Errors.AssertionError);
    });
  });
});