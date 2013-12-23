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

  describe('#implementInterface', function() {
    var AnimalInterface = function() {};

    AnimalInterface.prototype.say = function() { throw Error(); }

    AnimalInterface.animal = function() { throw Error(); }

    var Cat = function() {};

    AutoMan.common.implementInterface(Cat, AnimalInterface);

    it('Should add interface prototype methods to constructor.', function() {
      Cat.prototype.should.contain.key('say');
      Cat.prototype.say.should.be.a.function;
      Cat.prototype.say.should.throw;
    });

    it('Should add static methods from interface to constructor.', function() {
      Cat.should.contain.key('animal');
      Cat.animal.should.be.a.function;
      Cat.animal.should.throw;
    });
  });

  describe('#interfaceMethod', function() {
    it('Should throw.', function() {
      AutoMan.common.interfaceMethod.should.throw();
    });
  });
});