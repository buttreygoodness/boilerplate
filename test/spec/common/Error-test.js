goog.require('AutoMan.common.Error');

describe('AutoMan.common.Error', function() {
  describe('#getCode', function() {
    it('Should provide a default value if one is not supplied.', function() {
      var error = new AutoMan.common.Error();

      should.exist(error.getCode());
    });

    it('Should return a code if one is supplied in constructor as string.', function() {
      var error = new AutoMan.common.Error('the-error');

      error.getCode().should.equal('the-error');
    });

    it('Should return a code if one is supplied in constructor as object.', function() {
      var error = new AutoMan.common.Error({code: 'the-error'});

      error.getCode().should.equal('the-error');
    });
  });

  describe('#getMessage', function() {
    it('Should provide a default value if one is not supplied.', function() {
      var error = new AutoMan.common.Error();

      should.exist(error.getMessage());
    });

    it('Should return a message if one is supplied in constructor as object.', function() {
      var error = new AutoMan.common.Error({message: 'the-message'});

      error.getMessage().should.equal('the-message');
    });
  });

  describe('#toString', function() {
    it('Should return a string.', function() {
      var error = new AutoMan.common.Error();

      error.toString().should.be.a.string;
    });

    it('Should be dynamic depending on message and code.', function() {
      var codeString, messageString, codeMessageString;

      codeString = (new AutoMan.common.Error({code: 'the-code'})).toString();

      messageString = (new AutoMan.common.Error({message: 'the-message'})).toString();

      codeMessageString = (new AutoMan.common.Error({code: 'the-code', message: 'the-message'})).toString();

      codeString.should.not.equal(messageString);
      messageString.should.not.equal(codeMessageString);
      codeMessageString.should.not.equal(codeString);
    });
  });
});