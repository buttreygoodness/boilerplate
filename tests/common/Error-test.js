goog.require('AutoMan.common.Error');

describe('AutoMan.common.Error', function() {
  describe('#constructor', function() {
    it('Should take an object argument and set parameters.', function() {
      var error = new AutoMan.common.Error({
        message: 'message',
        code: 'code'
      });

      error.getMessage().should.be.equal('message');
      error.getCode().should.equal('code');
    });

    it('Should take a single argument and treat it as the error code.', function() {
      var error = new AutoMan.common.Error('code');

      error.getCode().should.be.equal('code');
    });

    it('Should provide default values.', function() {
      var error = new AutoMan.common.Error();

      error.getCode().should.exist;
      error.getMessage().should.exist;
    });
  });

  describe('#getCode', function() {
    it('Should return error code.', function() {
      var error = new AutoMan.common.Error({
        code: 'code'
      });

      error.getCode().should.exist;
      error.getCode().should.equal('code');
    });
  });

  describe('#getMessage', function() {
    it('Should return a message.', function() {
      var error = new AutoMan.common.Error({
        message: 'message'
      });

      error.getMessage().should.exist;
      error.getMessage().should.equal('message');
    });
  });
});